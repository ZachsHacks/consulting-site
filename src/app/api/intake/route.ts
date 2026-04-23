import { NextRequest, NextResponse } from "next/server";

/**
 * Env vars:
 *   RESEND_API_KEY     (required for email send)
 *   INTAKE_EMAIL       (required - where intake digests go)
 *   INTAKE_FROM_EMAIL  (optional - defaults to onboarding@resend.dev which
 *                       works without domain verification. Set to
 *                       intake@zachweiss.ai once the domain is verified in
 *                       Resend.)
 *   ANTHROPIC_API_KEY  (optional - for Claude-generated summary)
 *   INTAKE_WEBHOOK_URL (optional - n8n/Zapier forward)
 */

const ALLOWED_KEYS = [
  "name",
  "company",
  "role",
  "phone",
  "email",
  "industry",
  "referral",
  "description",
] as const;
type Key = (typeof ALLOWED_KEYS)[number];
type Payload = Partial<Record<Key, string>>;

const LABELS: Record<Key, string> = {
  name: "Name",
  company: "Company",
  role: "Role",
  phone: "Phone",
  email: "Email",
  industry: "Industry",
  referral: "Referral",
  description: "Description",
};

const STUDIO_NAME = "Weiss & Co.";
const REPLY_EMAIL = "zachweissbusiness@gmail.com";
const WHATSAPP_URL =
  "https://wa.me/12243688111?text=Hi%20Zach%2C%20I%27d%20like%20to%20talk%20about%20a%20custom%20app%20for%20my%20business.";

function sanitize(input: unknown): Payload {
  if (!input || typeof input !== "object") return {};
  const out: Payload = {};
  const rec = input as Record<string, unknown>;
  for (const key of ALLOWED_KEYS) {
    const val = rec[key];
    if (typeof val === "string") out[key] = val.trim().slice(0, 5000);
  }
  return out;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function contextLines(data: Payload): string {
  return (
    ["name", "company", "role", "industry", "phone", "email", "referral"] as Key[]
  )
    .filter((k) => data[k])
    .map((k) => `${LABELS[k]}: ${data[k]}`)
    .join("\n");
}

async function summarize(data: Payload): Promise<string | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey || !data.description) return null;

  const systemPrompt = `You are summarizing intake submissions for Zach Weiss, a solo custom-software consultant who builds AI-powered internal apps for owner-operated small businesses ($1M–$10M revenue) in 21 days for $25K flat.

Your job: write a tight 2-4 sentence summary that tells Zach (1) what business this person runs, (2) what specific operational problem they want solved, (3) whether it sounds like a fit for a 21-day, $25K custom app build. Use the prospect's own words where possible. Be direct and concrete. No preamble, no "this person is seeking..." filler, no markdown headers. Just the summary.`;

  const userPrompt = `Contact info:\n${contextLines(data)}\n\nTheir description of what they need (possibly transcribed from voice):\n${data.description}`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 400,
        system: systemPrompt,
        messages: [{ role: "user", content: userPrompt }],
      }),
    });
    if (!res.ok) {
      console.error(
        "[intake] Claude error",
        res.status,
        (await res.text()).slice(0, 500)
      );
      return null;
    }
    const json = (await res.json()) as { content?: { text?: string }[] };
    return json.content?.[0]?.text?.trim() || null;
  } catch (err) {
    console.error("[intake] Claude fetch failed:", err);
    return null;
  }
}

/**
 * Send via Resend, with automatic fallback: if a custom INTAKE_FROM_EMAIL is
 * set and Resend rejects it (e.g. because the domain isn't verified),
 * retry with the universal onboarding@resend.dev sender so the email
 * still lands.
 */
async function resendEmail(args: {
  from: string;
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}): Promise<{ ok: boolean; status: number; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[intake] RESEND_API_KEY not set, skipping email");
    return { ok: false, status: 0, error: "No API key" };
  }

  const send = async (fromAddress: string) => {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [args.to],
        subject: args.subject,
        html: args.html,
        text: args.text,
        reply_to: args.replyTo,
      }),
    });
    return res;
  };

  try {
    let res = await send(args.from);
    if (!res.ok) {
      const body = (await res.text()).slice(0, 800);
      console.error(
        `[intake] Resend rejected sender "${args.from}" (${res.status}): ${body}`
      );
      // If the issue is likely the sender (4xx) and we're not already using
      // the safe fallback, retry with onboarding@resend.dev.
      if (res.status >= 400 && res.status < 500) {
        const fallback = `${STUDIO_NAME} <onboarding@resend.dev>`;
        if (args.from !== fallback) {
          console.warn(
            `[intake] Retrying with Resend default sender: ${fallback}`
          );
          res = await send(fallback);
          if (!res.ok) {
            const body2 = (await res.text()).slice(0, 800);
            console.error(
              `[intake] Resend fallback also failed (${res.status}): ${body2}`
            );
            return { ok: false, status: res.status, error: body2 };
          }
        } else {
          return { ok: false, status: res.status, error: body };
        }
      } else {
        return { ok: false, status: res.status, error: body };
      }
    }
    return { ok: true, status: res.status };
  } catch (err) {
    console.error("[intake] Resend fetch failed:", err);
    return { ok: false, status: 0, error: String(err) };
  }
}

function renderDigestEmail({
  data,
  summary,
}: {
  data: Payload;
  summary: string | null;
}) {
  const subjectName = data.name || "Someone";
  const subjectCompany = data.company
    ? ` at ${data.company}`
    : data.industry
      ? ` (${data.industry})`
      : "";
  const subject = `New inquiry: ${subjectName}${subjectCompany}`;

  const textBody = [
    summary ? `SUMMARY\n${summary}\n` : "",
    `CONTACT\n${contextLines(data)}\n`,
    data.description ? `DESCRIPTION\n${data.description}\n` : "",
    `---\nSubmitted ${new Date().toISOString()} from zachweiss.ai/intake`,
  ]
    .filter(Boolean)
    .join("\n");

  const contactRows = (
    ["name", "company", "role", "industry", "phone", "email", "referral"] as Key[]
  )
    .filter((k) => data[k])
    .map(
      (k) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#6b6860;font-family:ui-monospace,SFMono-Regular,monospace;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;white-space:nowrap;vertical-align:top">${LABELS[k]}</td><td style="padding:6px 0;color:#17171a;font-size:15px">${escapeHtml(data[k]!)}</td></tr>`
    )
    .join("");

  const htmlBody = `<!doctype html>
<html>
<body style="margin:0;padding:0;background:#f5f2ec;font-family:-apple-system,BlinkMacSystemFont,Inter,sans-serif;color:#17171a">
  <div style="max-width:620px;margin:0 auto;padding:32px 24px">
    <div style="display:inline-block;padding:4px 12px;border-radius:999px;background:#17171a;color:#ff8a3d;font-family:ui-monospace,SFMono-Regular,monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase">New inquiry</div>
    <h1 style="margin:20px 0 8px 0;font-size:32px;font-weight:800;letter-spacing:-0.02em;line-height:1.1">${escapeHtml(subjectName)}${escapeHtml(subjectCompany)}</h1>
    <div style="color:#6b6860;font-size:14px">Submitted ${new Date().toLocaleString("en-US", { timeZone: "America/New_York", dateStyle: "medium", timeStyle: "short" })} ET</div>
    ${
      summary
        ? `<div style="margin-top:28px;padding:20px 22px;border-radius:14px;background:#fff6ef;border:1px solid #ffd9bc">
      <div style="color:#c8571e;font-family:ui-monospace,SFMono-Regular,monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;margin-bottom:10px">Summary · generated by Claude</div>
      <div style="font-size:16px;line-height:1.55">${escapeHtml(summary)}</div>
    </div>`
        : ""
    }
    <div style="margin-top:28px">
      <div style="color:#6b6860;font-family:ui-monospace,SFMono-Regular,monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;margin-bottom:12px">Contact</div>
      <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse">${contactRows}</table>
    </div>
    ${
      data.description
        ? `<div style="margin-top:28px">
      <div style="color:#6b6860;font-family:ui-monospace,SFMono-Regular,monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;margin-bottom:12px">Description</div>
      <div style="padding:20px 22px;border-radius:14px;background:#fff;border:1px solid #e4dfd3;font-size:15px;line-height:1.6;white-space:pre-wrap">${escapeHtml(data.description)}</div>
    </div>`
        : ""
    }
    <div style="margin-top:36px;padding-top:20px;border-top:1px solid #e4dfd3;color:#6b6860;font-size:13px">
      Reply directly to respond. Or WhatsApp: ${escapeHtml(data.phone || "(no phone provided)")}.
    </div>
  </div>
</body>
</html>`;

  return { subject, textBody, htmlBody };
}

function renderAckEmail(data: Payload) {
  const first = (data.name || "").split(" ")[0] || "there";

  const subject = `Got your inquiry — Zach Weiss`;
  const textBody = `Hi ${first},

Thanks for reaching out. Your inquiry landed in my inbox and I read every one personally — you'll hear back from me within 24 hours.

If it's urgent, or you just want to say hi faster, WhatsApp me directly:
${WHATSAPP_URL}

Talk soon,
Zach Weiss
${STUDIO_NAME}
${REPLY_EMAIL}`;

  const htmlBody = `<!doctype html>
<html>
<body style="margin:0;padding:0;background:#f5f2ec;font-family:-apple-system,BlinkMacSystemFont,Inter,sans-serif;color:#17171a">
  <div style="max-width:560px;margin:0 auto;padding:40px 24px">
    <div style="display:inline-block;padding:4px 12px;border-radius:999px;background:#17171a;color:#ff8a3d;font-family:ui-monospace,SFMono-Regular,monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase">Received</div>
    <h1 style="margin:20px 0 16px 0;font-size:30px;font-weight:800;letter-spacing:-0.02em;line-height:1.1">Thanks, ${escapeHtml(first)}.</h1>
    <div style="font-size:16px;line-height:1.6;color:#17171a">
      <p style="margin:0 0 14px 0">Your inquiry landed in my inbox. I read every one personally, and you&apos;ll hear back from me within 24 hours.</p>
      <p style="margin:0 0 14px 0">If it&apos;s urgent, or you just want to say hi faster, message me directly on WhatsApp:</p>
    </div>
    <a href="${WHATSAPP_URL}" style="display:inline-block;margin-top:8px;padding:14px 24px;background:#ff8a3d;color:#1a0b04;font-weight:700;font-size:15px;text-decoration:none;border-radius:999px">Message Zach on WhatsApp →</a>
    <div style="margin-top:40px;padding-top:24px;border-top:1px solid #e4dfd3;color:#6b6860;font-size:14px;line-height:1.5">
      <div style="font-weight:600;color:#17171a">Zach Weiss</div>
      <div>${STUDIO_NAME} · Brooklyn, NY</div>
      <div style="margin-top:4px"><a href="mailto:${REPLY_EMAIL}" style="color:#6b6860;text-decoration:none">${REPLY_EMAIL}</a></div>
    </div>
  </div>
</body>
</html>`;

  return { subject, textBody, htmlBody };
}

async function forwardWebhook(submission: Record<string, unknown>) {
  const url = process.env.INTAKE_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submission),
    });
  } catch (err) {
    console.error("[intake] Webhook forward failed:", err);
  }
}

export async function POST(req: NextRequest) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const data = sanitize(raw);
  if (!data.name || !data.email || !data.description) {
    return NextResponse.json(
      { error: "Missing required fields: name, email, description" },
      { status: 400 }
    );
  }

  const summary = await summarize(data);
  const inbox = process.env.INTAKE_EMAIL;
  const fromAddress =
    process.env.INTAKE_FROM_EMAIL
      ? `${STUDIO_NAME} <${process.env.INTAKE_FROM_EMAIL}>`
      : `${STUDIO_NAME} <onboarding@resend.dev>`;

  // 1) Digest email to Zach
  if (inbox) {
    const digest = renderDigestEmail({ data, summary });
    await resendEmail({
      from: fromAddress,
      to: inbox,
      subject: digest.subject,
      html: digest.htmlBody,
      text: digest.textBody,
      replyTo: data.email,
    });
  } else {
    console.warn("[intake] INTAKE_EMAIL not set, skipping digest to Zach");
  }

  // 2) Acknowledgment email to the inquirer
  if (data.email) {
    const ack = renderAckEmail(data);
    await resendEmail({
      from: fromAddress,
      to: data.email,
      subject: ack.subject,
      html: ack.htmlBody,
      text: ack.textBody,
      replyTo: REPLY_EMAIL,
    });
  }

  // 3) Optional webhook forward
  const submission = {
    ...data,
    summary,
    submittedAt: new Date().toISOString(),
    source: "zachweiss.ai/intake",
    userAgent: req.headers.get("user-agent") ?? "",
  };
  await forwardWebhook(submission);

  // 4) Always log as a final backup
  console.log("[intake] submission:", JSON.stringify(submission));

  return NextResponse.json({ ok: true });
}
