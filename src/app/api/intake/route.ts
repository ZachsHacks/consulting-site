import { NextRequest, NextResponse } from "next/server";

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

type Payload = Partial<Record<(typeof ALLOWED_KEYS)[number], string>>;

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

  const submission = {
    ...data,
    submittedAt: new Date().toISOString(),
    source: "zachweiss.ai/intake",
    userAgent: req.headers.get("user-agent") ?? "",
  };

  // Forward to webhook if configured (n8n, Zapier, etc.)
  const webhookUrl = process.env.INTAKE_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submission),
      });
    } catch (err) {
      console.error("[intake] Webhook forward failed:", err);
    }
  }

  // Always log to server for manual review as a backup
  console.log("[intake] submission:", JSON.stringify(submission));

  return NextResponse.json({ ok: true });
}
