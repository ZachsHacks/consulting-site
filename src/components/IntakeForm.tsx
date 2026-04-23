"use client";

import { useEffect, useRef, useState } from "react";
import { WHATSAPP_URL } from "@/config";

type IntakeForm = {
  name: string;
  company: string;
  role: string;
  phone: string;
  email: string;
  industry: string;
  referral: string;
  description: string;
};

function formatPhone(raw: string): string {
  // Keep only digits, cap at 11 (longest US format with country code)
  const digits = raw.replace(/\D/g, "").slice(0, 11);
  if (!digits) return "";

  // 11 digits leading with 1 → +1 (XXX) XXX-XXXX
  if (digits.length === 11 && digits[0] === "1") {
    return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }

  // 10 or fewer digits → progressive US format
  const area = digits.slice(0, 3);
  const prefix = digits.slice(3, 6);
  const line = digits.slice(6, 10);
  if (digits.length <= 3) return `(${area}`;
  if (digits.length <= 6) return `(${area}) ${prefix}`;
  return `(${area}) ${prefix}-${line}`;
}

const INITIAL: IntakeForm = {
  name: "",
  company: "",
  role: "",
  phone: "",
  email: "",
  industry: "",
  referral: "",
  description: "",
};

export default function IntakeFormComponent({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const [form, setForm] = useState<IntakeForm>(INITIAL);
  const [isRecording, setIsRecording] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState("");
  const [speechSupported, setSpeechSupported] = useState(true);
  const [mode, setMode] = useState<"voice" | "type">("voice");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const recognitionRef = useRef<unknown>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);
  const doneRef = useRef<HTMLDivElement | null>(null);
  const [amplitude, setAmplitude] = useState(0);

  useEffect(() => {
    if (submitted && doneRef.current) {
      doneRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [submitted]);

  useEffect(() => {
    const SR =
      (window as unknown as { SpeechRecognition?: unknown })
        .SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: unknown })
        .webkitSpeechRecognition;
    if (!SR) {
      setSpeechSupported(false);
      setMode("type");
      return;
    }
    const RecognitionCtor = SR as new () => {
      continuous: boolean;
      interimResults: boolean;
      lang: string;
      onresult: (event: {
        resultIndex: number;
        results: { isFinal: boolean; 0: { transcript: string } }[];
      }) => void;
      onerror: (event: { error: string }) => void;
      onend: () => void;
      start: () => void;
      stop: () => void;
    };
    const rec = new RecognitionCtor();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = "en-US";

    rec.onresult = (event) => {
      // Only process results new to this event. `event.results` is the full
      // session history — iterating from 0 each event double/triple-counts
      // finalized chunks and explodes the transcript.
      let finalText = "";
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalText += result[0].transcript;
        } else {
          interim += result[0].transcript;
        }
      }
      if (finalText) {
        setForm((prev) => ({
          ...prev,
          description: (prev.description + " " + finalText).trim(),
        }));
      }
      setInterimTranscript(interim);
    };

    rec.onerror = () => {
      setIsRecording(false);
    };

    rec.onend = () => {
      setIsRecording(false);
      setInterimTranscript("");
      stopAudioMonitor();
    };

    recognitionRef.current = rec;

    return () => {
      stopAudioMonitor();
      try {
        (rec as { stop: () => void }).stop();
      } catch {}
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startAudioMonitor = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      streamRef.current = stream;
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;
      const source = ctx.createMediaStreamSource(stream);
      const analyzer = ctx.createAnalyser();
      analyzer.fftSize = 256;
      source.connect(analyzer);
      analyzerRef.current = analyzer;

      const bufferLength = analyzer.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      const tick = () => {
        analyzer.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) sum += dataArray[i];
        const avg = sum / bufferLength;
        setAmplitude(avg);
        rafRef.current = requestAnimationFrame(tick);
      };
      tick();
    } catch {
      // no-op; recording still works without visualizer
    }
  };

  const stopAudioMonitor = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (audioCtxRef.current) {
      try {
        audioCtxRef.current.close();
      } catch {}
      audioCtxRef.current = null;
    }
    analyzerRef.current = null;
    setAmplitude(0);
  };

  const toggleRecording = async () => {
    const rec = recognitionRef.current as
      | { start: () => void; stop: () => void }
      | null;
    if (!rec) return;
    if (isRecording) {
      rec.stop();
    } else {
      setInterimTranscript("");
      setError(null);
      await startAudioMonitor();
      try {
        rec.start();
        setIsRecording(true);
      } catch {
        setError("Couldn't start microphone. Check browser permissions.");
        stopAudioMonitor();
      }
    }
  };

  const handleChange = (key: keyof IntakeForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.description) {
      setError("Name, email, and a description of your situation are required.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
      onSuccess?.();
    } catch {
      setError(
        "Something went wrong on our end. Please message me on WhatsApp instead."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="intake-done" ref={doneRef}>
        <div className="intake-eyebrow">Received</div>
        <h3 className="intake-done-h">
          Thanks, {form.name.split(" ")[0] || "friend"}.
        </h3>
        <p>
          I&apos;ll read your intake today and get back to you within 24
          hours. If it&apos;s urgent, message me directly on WhatsApp and
          I&apos;ll bump you to the top.
        </p>
        <div className="intake-done-cta">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="btn primary"
          >
            Message on WhatsApp <span className="btn-arrow">→</span>
          </a>
          <button
            type="button"
            onClick={() => {
              setForm(INITIAL);
              setSubmitted(false);
            }}
            className="btn ghost"
          >
            Submit another
          </button>
        </div>
      </div>
    );
  }

  const idleAmp = Math.min(1, amplitude / 70);

  return (
    <form className="intake-form" onSubmit={handleSubmit}>
      <div className="intake-grid">
        <label className="intake-field">
          <span>Your name</span>
          <input
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="David Cohen"
            autoComplete="name"
            required
          />
        </label>

        <label className="intake-field">
          <span>Company</span>
          <input
            value={form.company}
            onChange={(e) => handleChange("company", e.target.value)}
            placeholder="Cohen & Sons"
            autoComplete="organization"
          />
        </label>

        <label className="intake-field">
          <span>Your role</span>
          <input
            value={form.role}
            onChange={(e) => handleChange("role", e.target.value)}
            placeholder="Owner, operations manager, etc."
          />
        </label>

        <label className="intake-field">
          <span>Industry</span>
          <input
            value={form.industry}
            onChange={(e) => handleChange("industry", e.target.value)}
            placeholder="Food distribution, HVAC, youth sports, etc."
          />
        </label>

        <label className="intake-field">
          <span>Phone / WhatsApp</span>
          <input
            value={form.phone}
            onChange={(e) =>
              handleChange("phone", formatPhone(e.target.value))
            }
            placeholder="+1 (555) 555-5555"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={20}
          />
        </label>

        <label className="intake-field">
          <span>Email</span>
          <input
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="you@yourbusiness.com"
            type="email"
            autoComplete="email"
            required
          />
        </label>

        <label className="intake-field intake-field-wide">
          <span>How did you hear about Weiss & Co.?</span>
          <input
            value={form.referral}
            onChange={(e) => handleChange("referral", e.target.value)}
            placeholder="Someone in the community, Google, LinkedIn, etc."
          />
        </label>
      </div>

      <div className="intake-voice">
        <div className="intake-voice-head">
          <div>
            <div className="intake-voice-label">
              What are you trying to fix?
            </div>
            <p className="intake-voice-sub">
              Be specific. The manual work eating your team&apos;s day.
              The group chats pretending to be a CRM. The workflow
              everyone in the office hates. The more honest and
              detailed, the better the proposal I can write you.
            </p>
          </div>
          <div className="intake-mode-toggle" role="tablist">
            <button
              type="button"
              className={`intake-mode ${mode === "voice" ? "active" : ""}`}
              onClick={() => setMode("voice")}
              disabled={!speechSupported}
              aria-pressed={mode === "voice"}
            >
              Talk
            </button>
            <button
              type="button"
              className={`intake-mode ${mode === "type" ? "active" : ""}`}
              onClick={() => setMode("type")}
              aria-pressed={mode === "type"}
            >
              Type
            </button>
          </div>
        </div>

        {mode === "voice" && speechSupported && (
          <div className="mic-block">
            <button
              type="button"
              className={`mic-btn ${isRecording ? "recording" : ""}`}
              onClick={toggleRecording}
              aria-label={isRecording ? "Stop recording" : "Start recording"}
              style={
                {
                  "--amp": `${0.9 + idleAmp * 0.4}`,
                } as React.CSSProperties
              }
            >
              <span className="mic-ring r1" aria-hidden />
              <span className="mic-ring r2" aria-hidden />
              <span className="mic-ring r3" aria-hidden />
              <span className="mic-body">
                {isRecording ? (
                  <svg
                    viewBox="0 0 24 24"
                    width="44"
                    height="44"
                    fill="currentColor"
                    aria-hidden
                  >
                    <rect x="7" y="7" width="10" height="10" rx="2" />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    width="44"
                    height="44"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <rect x="9" y="3" width="6" height="12" rx="3" />
                    <path d="M5 11v1a7 7 0 0 0 14 0v-1" />
                    <line x1="12" y1="19" x2="12" y2="22" />
                    <line x1="8" y1="22" x2="16" y2="22" />
                  </svg>
                )}
              </span>
            </button>
            <div className="mic-caption">
              {isRecording ? (
                <span className="mic-live">
                  <span className="mic-dot" /> Listening, tap to stop
                </span>
              ) : form.description ? (
                "Tap to keep going"
              ) : (
                "Tap and start talking"
              )}
            </div>

            <div
              className={`transcript ${form.description || interimTranscript ? "filled" : ""}`}
            >
              <textarea
                value={
                  form.description +
                  (interimTranscript ? " " + interimTranscript : "")
                }
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Your words will appear here as you talk. You can edit anything after."
                rows={8}
              />
              {form.description && (
                <button
                  type="button"
                  className="transcript-clear"
                  onClick={() => handleChange("description", "")}
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        )}

        {(mode === "type" || !speechSupported) && (
          <div className="transcript filled">
            <textarea
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="What does a normal day look like right now? Where's the pain? What have you tried? What would good look like?"
              rows={10}
            />
          </div>
        )}

        {!speechSupported && (
          <p className="intake-note">
            Voice input isn&apos;t supported in this browser. You can still
            type above.
          </p>
        )}
      </div>

      {error && <div className="intake-error">{error}</div>}

      <div className="intake-submit">
        <button
          type="submit"
          className="btn primary big"
          disabled={submitting}
        >
          {submitting ? (
            "Sending…"
          ) : (
            <>
              Send my inquiry <span className="btn-arrow">→</span>
            </>
          )}
        </button>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="btn ghost"
        >
          Or message on WhatsApp
        </a>
      </div>
    </form>
  );
}
