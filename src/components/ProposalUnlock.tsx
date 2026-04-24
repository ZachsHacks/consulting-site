"use client";

import { useState, useRef, useEffect } from "react";
import { STUDIO_NAME } from "@/config";

export default function ProposalUnlock({
  slug,
  recipient,
}: {
  slug: string;
  recipient: string;
}) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!password || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/proposal-unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, password }),
      });
      if (res.ok) {
        window.location.reload();
      } else if (res.status === 401) {
        setError("That password isn't right. Try again, or ask Zach.");
        setPassword("");
        inputRef.current?.focus();
      } else {
        setError("Something went wrong. Try again in a moment.");
      }
    } catch {
      setError("Something went wrong. Try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="proposal-unlock">
      <div className="unlock-card">
        <div className="unlock-mark" aria-hidden>
          W&amp;
        </div>
        <div className="unlock-eyebrow">{STUDIO_NAME}</div>
        <h1 className="unlock-h">
          Prepared for <span className="italic">{recipient}</span>.
        </h1>
        <p className="unlock-sub">
          This proposal is private. Enter the password Zach sent you.
        </p>
        <form onSubmit={handleSubmit} className="unlock-form">
          <input
            ref={inputRef}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
          />
          <button
            type="submit"
            disabled={submitting || !password}
            className="unlock-btn"
          >
            {submitting ? "Checking…" : "Unlock →"}
          </button>
        </form>
        {error && <div className="unlock-error">{error}</div>}
        <div className="unlock-hint">
          Lost the password? Message Zach on WhatsApp.
        </div>
      </div>
    </div>
  );
}
