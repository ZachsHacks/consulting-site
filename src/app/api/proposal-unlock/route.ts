import { NextRequest, NextResponse } from "next/server";

function envKey(slug: string): string {
  // PROPOSAL_PASSWORD_CLARK, PROPOSAL_PASSWORD_JUSTIN_ILOULIAN, etc.
  return `PROPOSAL_PASSWORD_${slug.toUpperCase().replace(/[^A-Z0-9]/g, "_")}`;
}

function allowedSlug(slug: unknown): slug is string {
  return typeof slug === "string" && /^[a-z0-9-]{1,64}$/.test(slug);
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as {
    slug?: unknown;
    password?: unknown;
  };
  const slug = body.slug;
  const password = typeof body.password === "string" ? body.password : "";

  if (!allowedSlug(slug)) {
    return NextResponse.json({ error: "Invalid proposal" }, { status: 400 });
  }

  const expected = process.env[envKey(slug)];
  if (!expected) {
    // Don't reveal which proposals exist — same response as wrong password.
    return NextResponse.json(
      { error: "Incorrect password" },
      { status: 401 }
    );
  }

  if (password !== expected) {
    return NextResponse.json(
      { error: "Incorrect password" },
      { status: 401 }
    );
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set({
    name: `proposal-${slug}`,
    value: password,
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: `/proposals/${slug}`,
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  return res;
}
