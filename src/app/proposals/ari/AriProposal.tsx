"use client";

import { useEffect } from "react";
import { STUDIO_NAME, CALENDLY_URL } from "@/config";

const SLUG = "ari";
const RECIPIENT = "Ari";
const PREPARED_DATE = "May 18, 2026";

// A custom WhatsApp message for this proposal specifically.
const ARI_WA_URL =
  "https://wa.me/12243688111?text=" +
  encodeURIComponent(
    "Zach, looked it over. Let's talk it through."
  );

export default function AriProposal() {
  // View tracking: fire at most once per 30 minutes per device.
  useEffect(() => {
    try {
      const key = `proposal-viewed:${SLUG}`;
      const last = localStorage.getItem(key);
      const now = Date.now();
      const cooldown = 30 * 60 * 1000;
      if (!last || now - parseInt(last, 10) > cooldown) {
        localStorage.setItem(key, String(now));
        fetch("/api/proposal-view", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            slug: SLUG,
            recipient: RECIPIENT,
            viewedAt: new Date().toISOString(),
            referrer: document.referrer || null,
          }),
        }).catch(() => {});
      }
    } catch {
      // localStorage can be blocked in private mode etc — silently ignore
    }
  }, []);

  return (
    <div className="proposal proposal-ari">
      <header className="proposal-header">
        <a href="/" className="proposal-mark" aria-label="Back to Weiss & Co.">
          <span className="logo-sq">W&amp;</span>
          <span className="proposal-mark-name">{STUDIO_NAME}</span>
        </a>
        <div className="proposal-meta">
          <span className="eyebrow">Proposal · For {RECIPIENT}</span>
          <span className="eyebrow-muted">{PREPARED_DATE}</span>
        </div>
      </header>

      <article className="proposal-body">
        <div className="proposal-hero">
          <div className="eyebrow">Response to our conversation, May 18</div>
          <h1>
            The Monday Morning Pile,
            <br />
            <span className="italic">Gone</span>.
            <br />
            <span className="amber">One Login</span> Instead.
          </h1>
          <div className="proposal-byline">Zach Weiss</div>
        </div>

        <div className="preamble">
          <div className="preamble-label">Before anything else</div>
          <p>
            This is not a take-it-or-leave-it. You said it yourself: you have
            to be able to see it before you can tell me where to start. So
            that is what this is. A picture of the thing, broken into pieces
            you can pick from, with honest numbers next to each one. Read it,
            poke holes in it, tell me what is wrong. Then we start a
            conversation, not a contract.
          </p>
        </div>

        <section className="p-section">
          <div className="p-num">§ 01</div>
          <h2>
            The problem, <span className="italic">in your words</span>.
          </h2>
          <div className="p-two-col">
            <div>
              <h3>Right now</h3>
              <p>
                A lead comes in by email or the website. The secretary calls,
                runs intake. You email the Adobe fill-and-sign. They send back
                the insurance card, the diagnosis, the doctor&apos;s report.
                Someone saves it all to a file by hand. Then someone retypes
                that same information into the EMR to build the profile.
                Email, to file, to manual setup, to manual setup again. In
                your words: &ldquo;It&apos;s so tedious. It&apos;s stupid.&rdquo;
              </p>
            </div>
            <div>
              <h3>The real cost</h3>
              <p>
                Monday morning is five Teams chats, seventeen emails, and
                Smartsheet alerts going off. The EMR has not had a real update
                in three years and you have outgrown it. An integration
                company wanted real money to bolt you onto ClickUp, plus a
                forever subscription that changes under you. You almost did it,
                then realized it was a band-aid. Square one.
              </p>
            </div>
          </div>
          <p className="mt">
            One more thing, and I am saying it up front so it is not weird
            later. You pushed back on the phone the second the friend angle
            came up, and you were right to. This is not a favor. It is a real
            project I want to do well. The relationship is why I picked up the
            phone fast, not the reason the work would be any less serious.
            More on the money below, handled the way you would want it handled.
          </p>
        </section>

        <section className="p-section">
          <div className="p-num">§ 02</div>
          <h2>
            What it&apos;s <span className="amber">worth</span>.
          </h2>
          <p className="lead">Start with what you actually get, before price.</p>
          <div className="p-stats">
            <div className="p-stat">
              <span className="v">1 login</span>
              <span className="l">
                Replaces the inbox pile, Smartsheet, and the EMR you outgrew
              </span>
            </div>
            <div className="p-stat">
              <span className="v">0 lock-in</span>
              <span className="l">
                You own it. No SaaS subscription that changes under you
              </span>
            </div>
            <div className="p-stat">
              <span className="v">~30 to 35</span>
              <span className="l">
                Clients, every file in one place, intake through clinical
              </span>
            </div>
          </div>
          <p className="mt">
            The integration company wanted real money for a band-aid you would
            rent forever. This is the opposite. You pay once to build it, a
            small amount monthly to run it, and you own the whole thing. When
            you want a change, you do not file a ticket and wait for a roadmap.
            It works the way it works with your father at Dagim: he sends me a
            WhatsApp voice memo and the feature shows up. That is the model
            here. Your system bends to you, not the other way around.
          </p>
        </section>

        <section className="p-section">
          <div className="p-num">§ 03</div>
          <h2>
            What we&apos;re <span className="italic">building</span>.
          </h2>
          <p>
            Your words: you walk into the office, and besides email, you have
            one login that gives you everything. One operating system. Built
            for how you think, not how a software company thinks. A lead lands
            and the intake runs itself. The moment a client is accepted, their
            profile is already built in your EMR. No retyping. No re-saving.
          </p>
          <p>
            Underneath that one login: the full client journey from first
            contact to active care. Your own EMR, simple and thorough and
            yours, not a three-year-old product you have outgrown. Role-based
            access, so admins see everything and staff see what they need. A
            staff chat built in for the good vibe you talked about. UKG and
            SharePoint feeding in so reports and HR records live where the work
            lives, not in a separate tab.
          </p>
          <div className="p-callout">
            <p>
              <span className="amber-bold">Everything in one place.</span> No
              more &ldquo;leave me alone&rdquo; on a Monday. One screen, your
              whole company on it, built to be very simple, very clear, very
              systematic. That is the entire point, and it is the line you
              repeated the most.
            </p>
          </div>
        </section>

        <section className="p-section">
          <div className="p-num">§ 04</div>
          <h2>
            How we <span className="italic">build</span> it.
          </h2>
          <p>
            Small first. Proven before it grows. The way you would only trust
            it if you saw it working before you bet the company on it.
          </p>
          <div className="p-timeline">
            <div className="p-phase">
              <div className="p-phase-when">Phase 1 · Intake, automated</div>
              <p>
                The thing that hurts most, killed first. Lead comes in, intake
                runs, documents go out and come back, the file builds itself.
                A working prototype. Not pretty yet. It does the job.
              </p>
            </div>
            <div className="p-phase">
              <div className="p-phase-when">Phase 2 · One login, the portal</div>
              <p>
                The single operating system. Client journey, role-based
                access, staff chat. You start actually using it day to day and
                telling me what is wrong.
              </p>
            </div>
            <div className="p-phase">
              <div className="p-phase-when">Phase 3 · Your own EMR</div>
              <p>
                The custom EMR. Profiles, clinical records, assessments,
                scheduling, client and staff assignment. Simple and thorough
                and yours. We migrate the 30 to 35 off the old system.
              </p>
            </div>
            <div className="p-phase highlight">
              <div className="p-phase-when">Phase 4 · Connected and locked down</div>
              <p>
                UKG, SharePoint, and website leads wired in. Manager
                bird&apos;s-eye dashboard. Then we make it fully HIPAA
                compliant, take it off the open internet, and secure it down.
              </p>
            </div>
          </div>
          <p className="mt">
            Each phase ships, you use it, it gets proven, then the next one
            starts. Any phase can be the last one if you want it to be. You are
            never locked in, which is the entire reason you walked away from
            the ClickUp pitch.
          </p>
        </section>

        <section className="p-section">
          <div className="p-num">§ 05</div>
          <h2>
            The <span className="amber">investment</span>.
          </h2>
          <p className="lead">
            Honest numbers per piece. Pick the ones you want, in the order you
            want them.
          </p>
          <div className="p-tiers">
            <div className="p-tier">
              <div className="p-tier-head">
                <span className="p-tier-label">Phase 1</span>
                <span className="p-tier-name">Intake, Automated</span>
                <span className="p-tier-size">$6,000</span>
              </div>
              <p>
                Lead capture, intake flow, document send and return, the file
                that builds itself. The tedious part, gone.
              </p>
            </div>
            <div className="p-tier">
              <div className="p-tier-head">
                <span className="p-tier-label">Phase 2</span>
                <span className="p-tier-name">One Login, The Portal</span>
                <span className="p-tier-size">$7,000</span>
              </div>
              <p>
                The single operating system. Full client journey, role-based
                access for admins and staff, the built-in staff chat.
              </p>
            </div>
            <div className="p-tier">
              <div className="p-tier-head">
                <span className="p-tier-label">Phase 3</span>
                <span className="p-tier-name">Your Own EMR</span>
                <span className="p-tier-size">$8,000</span>
              </div>
              <p>
                The custom EMR, built your way. Profiles, clinical records,
                assessments, scheduling, and the migration off the old one.
              </p>
            </div>
            <div className="p-tier">
              <div className="p-tier-head">
                <span className="p-tier-label">Phase 4</span>
                <span className="p-tier-name">Connected &amp; Locked Down</span>
                <span className="p-tier-size">$4,000</span>
              </div>
              <p>
                UKG, SharePoint, website leads. Manager dashboard. Full HIPAA
                compliance and security lockdown.
              </p>
            </div>
          </div>
          <div className="p-callout">
            <p>
              <span className="amber-bold">
                The whole system is $25,000. For you, half. $12,500.
              </span>{" "}
              Not because you are getting a discount on the work. Because of
              where I am in my business right now. I am building relationships
              and case studies, not chasing margin, and I would rather knock
              this out of the park with you than bill you full freight. The one
              thing I ask back: when it is working, introduce me to one or two
              operators who would put a system like this to use. That is the
              whole trade.
            </p>
          </div>
          <ul className="mt">
            <li>
              <b>Payment, dead simple.</b> Half to start, half when it is
              done and running. Done means the system is live and the manager
              dashboard is up. No phase-by-phase invoicing to chase.
            </li>
            <li>
              <b>Retainer:</b> $500 a month once it is live. Hosting,
              monitoring, changes, new features, next-day support. The first
              month is on me.
            </li>
            <li>
              <b>Usage at cost.</b> Server, database, any AI or services billed
              at exactly what they cost. No markup, no surprises.
            </li>
          </ul>
        </section>

        <section className="p-section">
          <div className="p-num">§ 06</div>
          <h2>
            What I need <span className="italic">from you</span>.
          </h2>
          <p>
            None of this is heavy. It is what lets me build the right thing
            instead of guessing.
          </p>
          <ul>
            <li>
              <b>The intake itself.</b> The list of intake questions and the
              actual Adobe fill-and-sign documents you send today. That is
              Phase 1 in a folder.
            </li>
            <li>
              <b>The current EMR.</b> Which system it is, and whether it has an
              API or export so we can move the 30 to 35 cleanly when we get to
              Phase 3.
            </li>
            <li>
              <b>UKG and SharePoint.</b> Confirmation you can get me API access
              when we reach Phase 4. Not now. Just a yes that it is possible.
            </li>
            <li>
              <b>The website.</b> Where leads land today, so I can wire that
              into intake instead of you re-keying it.
            </li>
          </ul>
        </section>

        <section className="p-section ask">
          <div className="p-num">§ 07</div>
          <h2 className="ask-h">
            What happens <span className="italic">next</span>.
          </h2>
          <p className="ask-body">
            <b>
              We do not decide the whole thing today. We pick the first slice
              and talk it through.
            </b>
          </p>
          <ul className="ask-list">
            <li>You tell me what felt wrong or missing in here. I want that.</li>
            <li>
              We point at Phase 1, intake, and lock what it actually needs to
              do.
            </li>
            <li>
              I build a working prototype you can see and touch before you
              commit a dollar to the rest.
            </li>
          </ul>
          <p className="ask-body">
            You wanted to be able to visualize it. The fastest way to do that
            is to hold the first piece in your hands. Everything after that is
            a conversation, on your timeline, your budget.
          </p>
          <p className="ask-close">Let&apos;s talk it through.</p>
        </section>

        <div className="proposal-cta">
          <a
            href={ARI_WA_URL}
            target="_blank"
            rel="noreferrer"
            className="btn primary"
          >
            Let&apos;s start with intake <span className="btn-arrow">→</span>
          </a>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noreferrer"
            className="btn ghost"
          >
            Or grab a time to walk through it
          </a>
        </div>
      </article>

      <footer className="proposal-footer">
        <div>
          Zach Weiss · {STUDIO_NAME} · Brooklyn, NY
        </div>
        <div>
          Prepared for {RECIPIENT} · {PREPARED_DATE}
        </div>
      </footer>
    </div>
  );
}
