import { NextRequest, NextResponse } from "next/server";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: NextRequest) {
  const data = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const slug = typeof data.slug === "string" ? data.slug : "unknown";
  const recipient =
    typeof data.recipient === "string" ? data.recipient : "someone";
  const viewedAt =
    typeof data.viewedAt === "string"
      ? data.viewedAt
      : new Date().toISOString();
  const referrer =
    typeof data.referrer === "string" && data.referrer
      ? data.referrer
      : "direct";
  const userAgent = req.headers.get("user-agent") || "unknown";
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  console.log(
    `[proposal-view] ${slug} · ${recipient} · ${viewedAt} · ref=${referrer} · ip=${ip}`
  );

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.INTAKE_EMAIL;
  const fromAddress = process.env.INTAKE_FROM_EMAIL
    ? `Weiss & Co. <${process.env.INTAKE_FROM_EMAIL}>`
    : `Weiss & Co. <onboarding@resend.dev>`;

  if (apiKey && to) {
    const friendlyTime = new Date(viewedAt).toLocaleString("en-US", {
      timeZone: "America/New_York",
      dateStyle: "medium",
      timeStyle: "short",
    });

    const html = `<!doctype html>
<html>
<body style="margin:0;padding:0;background:#f5f2ec;font-family:-apple-system,BlinkMacSystemFont,Inter,sans-serif;color:#17171a">
  <div style="max-width:560px;margin:0 auto;padding:32px 24px">
    <div style="display:inline-block;padding:4px 12px;border-radius:999px;background:#17171a;color:#ff8a3d;font-family:ui-monospace,SFMono-Regular,monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase">Proposal viewed</div>
    <h1 style="margin:20px 0 8px 0;font-size:30px;font-weight:800;letter-spacing:-0.02em;line-height:1.1">${escapeHtml(recipient)} just opened the proposal</h1>
    <p style="color:#6b6860;font-size:14px;margin:0 0 24px 0">${friendlyTime} ET</p>
    <div style="padding:18px 22px;background:#fff;border:1px solid #e4dfd3;border-radius:12px;font-size:14.5px;line-height:1.65">
      <div style="display:flex;gap:10px;padding:6px 0"><span style="font-family:ui-monospace,SFMono-Regular,monospace;font-size:10.5px;letter-spacing:0.12em;text-transform:uppercase;color:#6b6860;width:80px">Proposal</span><span>${escapeHtml(slug)}</span></div>
      <div style="display:flex;gap:10px;padding:6px 0"><span style="font-family:ui-monospace,SFMono-Regular,monospace;font-size:10.5px;letter-spacing:0.12em;text-transform:uppercase;color:#6b6860;width:80px">Referrer</span><span>${escapeHtml(referrer)}</span></div>
      <div style="display:flex;gap:10px;padding:6px 0"><span style="font-family:ui-monospace,SFMono-Regular,monospace;font-size:10.5px;letter-spacing:0.12em;text-transform:uppercase;color:#6b6860;width:80px">URL</span><a href="https://zachweiss.ai/proposals/${escapeHtml(slug)}" style="color:#ff8a3d;text-decoration:none">zachweiss.ai/proposals/${escapeHtml(slug)}</a></div>
    </div>
    <p style="margin-top:24px;color:#6b6860;font-size:13px;line-height:1.5">Tracking only fires once per 30 minutes per viewer, so you'll get a ping on first open and again if they come back later after the cooldown.</p>
  </div>
</body>
</html>`;

    const text = `${recipient} just opened the proposal "${slug}" at ${friendlyTime} ET.

Referrer: ${referrer}
URL: https://zachweiss.ai/proposals/${slug}`;

    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromAddress,
          to: [to],
          subject: `👀 ${recipient} just opened the proposal`,
          html,
          text,
        }),
      });
      if (!res.ok) {
        const body = (await res.text()).slice(0, 500);
        console.error(
          `[proposal-view] Resend rejected (${res.status}): ${body}`
        );
      }
    } catch (err) {
      console.error("[proposal-view] Resend fetch failed:", err);
    }
  }

  return NextResponse.json({ ok: true });
}
