import IntakeForm from "@/components/IntakeForm";
import { STUDIO_NAME } from "@/config";

export const metadata = {
  title: "Submit an inquiry · Weiss & Co.",
  description:
    "Tell me about your business. Talk or type. I'll have a proposal ready before our call.",
};

export default function IntakePage() {
  return (
    <main className="intake-wrap">
      <header className="intake-header">
        <a href="/" className="intake-back" aria-label="Back to site">
          ← {STUDIO_NAME}
        </a>
        <div className="intake-eyebrow">Submit an inquiry</div>
        <h1 className="intake-h">
          Tell me about your <span className="italic">business</span>.
          <br />
          <span className="amber">Talk or type.</span>
        </h1>
        <p className="intake-sub">
          A few quick details, then describe what you need in your own words.
          Easier to speak than to write? Tap the mic and I&apos;ll transcribe
          it. I&apos;ll have a proposal drafted before our call.
        </p>
      </header>

      <IntakeForm />
    </main>
  );
}
