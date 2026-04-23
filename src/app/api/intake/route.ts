import { NextRequest, NextResponse } from "next/server";

/**
 * Environment variables (all optional — if unset, that step is skipped and we fall back to logs):
 *
 *   RESEND_API_KEY      - Resend API key (https://resend.com)
 *   INTAKE_EMAIL        - Where intake emails are delivered (e.g. zachweissbusiness@gmail.com)
 *   INTAKE_FROM_EMAIL   - From address. Defaults to onboarding@resend.dev (Resend test sender that
 *                         works without domain verification). Set to intake@zachweiss.ai once
 *                         zachweiss.ai is verified in Resend.
 *   ANTHROPIC_API_KEY   - Claude API key for generating a 2-4 sentence summary
 *   INTAKE_WEBHOOK_URL  - Optional: a webhook URL (e.g. n8n) that receives the full payload +
 *                         summary for downstream automation
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

function sanitize(input: unknown): Payload {
  if (!input || typeof input !== "object") return {};
  const out: Payload = {};
  const rec = input as Record<string, unknown>;
  for (const key of ALLOWED_KEYS) {
    const val = rec[key];
    if (typeof val === "string") {
      out[key] = val.trim().slice(0, 5000);
    }
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
  if (!apiKey) return null;
  const description = data.description ?? "";
  if (!description) return null;

  const systemPrompt = `You are summarizing intake submissions for Zach Weiss, a solo custom-software consultant who builds AI-powered internal apps for owner-operated small businesses ($1M–$10M revenue) in 21 days for $25K flat.

Your job: write a tight 2-4 sentence summary that tells Zach (1) what business this person runs, (2) what specific operational problem they want solved, (3) whether it sounds like a fit for a 21-day, $25K custom app build. Use the prospect's own words where possible. Be direct and concrete. No preamble, no "this person is seeking..." filler, no markdown headers. Just the summary.`;

  const userPrompt = `Contact info:\n${contextLines(data)}\n\nTheir description of what they need (possibly transcribed from voice):\n${description}`;

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
      console.error("[intake] Claude returned", res.status, await res.text());
      return null;
    }
    const json = (await res.json()) as {
      content?: { text?: string }[];
    };
    const text = json.content?.[0]?.text;
    return text?.trim() || null;
  } catch (err) {
    console.error("[intake] Claude summary failed:", err);
    return null;
  }
}

function renderEmail({
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
      <div style="color:#6b6860;font-family:ui-monospace,SFMono-Regular,monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;margin-bottom:12px">Description${data.description.length > 280 ? " · raw transcript" : ""}</div>
      <div style="padding:20px 22px;border-radius:14px;background:#fff;border:1px solid #e4dfd3;font-size:15px;line-height:1.6;white-space:pre-wrap">${escapeHtml(data.description)}</div>
    </div>`
        : ""
    }

    <div style="margin-top:36px;padding-top:20px;border-top:1px solid #e4dfd3;color:#6b6860;font-size:13px">
      Reply directly to respond. Or message on WhatsApp: ${escapeHtml(data.phone || "(no phone provided)")}.
    </div>
  </div>
</body>
</html>`;

  return { subject, textBody, htmlBody };
}

async function sendEmail({
  subject,
  textBody,
  htmlBody,
  replyTo,
}: {
  subject: string;
  textBody: string;
  htmlBody: string;
  replyTo?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.INTAKE_EMAIL;
  const from = process.env.INTAKE_FROM_EMAIL || "onboarding@resend.dev";

  if (!apiKey || !to) {
    console.warn(
      "[intake] Skipping email: RESEND_API_KEY or INTAKE_EMAIL not set"
    );
    return;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Weiss & Co. Intake <${from}>`,
        to: [to],
        subject,
        html: htmlBody,
        text: textBody,
        reply_to: replyTo,
      }),
    });
    if (!res.ok) {
      console.error("[intake] Resend returned", res.status, await res.text());
    }
  } catch (err) {
    console.error("[intake] Email send failed:", err);
  }
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

  // 1) Ask Claude for a summary (may be null if ANTHROPIC_API_KEY is unset)
  const summary = await summarize(data);

  // 2) Send the email to Zach with all info + summary
  const { subject, textBody, htmlBody } = renderEmail({ data, summary });
  await sendEmail({
    subject,
    textBody,
    htmlBody,
    replyTo: data.email,
  });

  // 3) Optionally forward to a webhook (n8n, Zapier, etc.)
  const submission = {
    ...data,
    summary,
    submittedAt: new Date().toISOString(),
    source: "zachweiss.ai/intake",
    userAgent: req.headers.get("user-agent") ?? "",
  };
  await forwardWebhook(submission);

  // 4) Always log to server as a final backup
  console.log("[intake] submission:", JSON.stringify(submission));

  return NextResponse.json({ ok: true });
}
