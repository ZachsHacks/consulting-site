"use client";

import { useState, useRef, useEffect } from "react";
import { STUDIO_NAME } from "@/config";
import RyanProposal from "./RyanProposal";

// Simple client-side gate. Not meant to be unhackable, just a clean
// professional step before the proposal. No env var, no API, no cookie.
const PASSWORD = "haloprime2026";
const RECIPIENT = "Ryan";
const SESSION_KEY = "proposal-unlocked:ryan";

export default function RyanPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === "1") {
      setUnlocked(true);
    } else {
      inputRef.current?.focus();
    }
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password.trim() === PASSWORD) {
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        // sessionStorage can be blocked — gate still opens for this view
      }
      setUnlocked(true);
    } else {
      setError("That password isn't right. Try again, or ask Zach.");
      setPassword("");
      inputRef.current?.focus();
    }
  }

  if (unlocked) {
    return <RyanProposal />;
  }

  return (
    <div className="proposal-unlock">
      <div className="unlock-card">
        <div className="unlock-mark" aria-hidden>
          W&amp;
        </div>
        <div className="unlock-eyebrow">{STUDIO_NAME}</div>
        <h1 className="unlock-h">
          Prepared for <span className="italic">{RECIPIENT}</span>.
        </h1>
        <p className="unlock-sub">
          This proposal is private. Enter the password Zach sent you.
        </p>
        <form onSubmit={handleSubmit} className="unlock-form">
          <input
            ref={inputRef}
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError(null);
            }}
            placeholder="Password"
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
          />
          <button
            type="submit"
            disabled={!password}
            className="unlock-btn"
          >
            Unlock →
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
