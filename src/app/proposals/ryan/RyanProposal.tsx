"use client";

import { useEffect } from "react";
import { STUDIO_NAME, CALENDLY_URL } from "@/config";

const SLUG = "ryan";
const RECIPIENT = "Ryan";
const PREPARED_DATE = "May 15, 2026";

// A custom WhatsApp message for this proposal specifically.
const RYAN_WA_URL =
  "https://wa.me/12243688111?text=" +
  encodeURIComponent(
    "Ryan here. I'm in. Let's kick off Phase 1."
  );

export default function RyanProposal() {
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
    <div className="proposal proposal-ryan">
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
          <div className="eyebrow">Response to our conversation, May 15</div>
          <h1>
            The Daily Grind,
            <br />
            <span className="italic">Gone</span>.
            <br />
            The <span className="amber">Coach</span>, Built In.
          </h1>
          <div className="proposal-byline">Zach Weiss</div>
        </div>

        <section className="p-section preamble">
          <div className="preamble-label">Funny thing</div>
          <p>
            We already built and shipped together once, so this part is easy.
            You already know how I work, and I already know your operation.
            This time it is something bigger, so let me just show you the
            system.
          </p>
        </section>

        <section className="p-section">
          <div className="p-num">§ 01</div>
          <h2>
            The problem, <span className="italic">in your words</span>.
          </h2>
          <div className="p-two-col">
            <div>
              <h3>The lift today</h3>
              <p>
                You open Tableau. You run the report. You export to Excel. You
                copy and paste one technician&apos;s numbers, post them in
                Telegram, and do it again. Thirty minutes for one metric on a
                team of twenty. A couple of hours if you run all of them. And
                it still does not reach every tech every day.
              </p>
            </div>
            <div>
              <h3>The real cost</h3>
              <p>
                The techs who are slipping think they are crushing it. You
                spend thirty minutes on the phone with each bottom performer,
                one at a time, hearing the excuses. Chris keeps recruiting to
                replace the ones who never move. The data already exists. It
                just never lands in front of the person who has to change.
              </p>
            </div>
          </div>
        </section>

        <section className="p-section">
          <div className="p-num">§ 02</div>
          <h2>
            What it&apos;s <span className="amber">worth</span>.
          </h2>
          <p className="lead">Start with the math, before we talk price.</p>
          <div className="p-stats">
            <div className="p-stat">
              <span className="v">~2 hrs/day</span>
              <span className="l">Manual reporting, erased</span>
            </div>
            <div className="p-stat">
              <span className="v">15 to 20</span>
              <span className="l">Techs coached every day, on autopilot</span>
            </div>
            <div className="p-stat">
              <span className="v">Weeks</span>
              <span className="l">Before it has paid for itself</span>
            </div>
          </div>
          <p className="mt">
            This pays for itself on the reclaimed time alone. That is before a
            single point of completion-rate lift. Before one tech climbs a
            bonus tier. Before you stop paying to recruit around the people who
            could have improved if they had ever seen their own numbers. The
            upside is not the time you save. The upside is the performance you
            unlock.
          </p>
        </section>

        <section className="p-section">
          <div className="p-num">§ 03</div>
          <h2>
            What we&apos;re <span className="italic">building</span>.
          </h2>
          <p>
            Every morning, each technician gets one message in Telegram. Their
            number. Where they rank. The one thing they did well. The one
            thing to fix. And how close they are to the next bonus tier. For
            the ones who are driving, the same thing as a voice note they can
            listen to without looking down.
          </p>
          <p>
            The coaching reads between the lines. Your own example: a customer
            writes &ldquo;we loved him, we invited him to dinner,&rdquo; then
            scores him low because they misread the survey. A human knows that
            tech did great. So the system tells him &ldquo;walk the customer
            through the survey next time,&rdquo; not &ldquo;you failed.&rdquo;
            That is the difference between a report and a coach.
          </p>
          <div className="p-callout">
            <p>
              <span className="amber-bold">Dead simple for the tech.</span> One
              message, in the app they already open every day. No new app. No
              login. No friction. That is the only way it actually gets read,
              and you said so yourself.
            </p>
          </div>
        </section>

        <section className="p-section">
          <div className="p-num">§ 04</div>
          <h2>
            How we <span className="italic">build</span> it.
          </h2>
          <p>
            Small first. Proven before it scales. Exactly the way you
            described it on the call.
          </p>
          <div className="p-timeline">
            <div className="p-phase">
              <div className="p-phase-when">Phase 1</div>
              <p>
                One metric, Daily Completion Rate. One pipeline, Tableau to
                Telegram. Tested on you, a dummy tech, and two real techs
                before anyone else sees it.
              </p>
            </div>
            <div className="p-phase">
              <div className="p-phase-when">Phase 2</div>
              <p>
                The other two core metrics. Day, month, quarter, and year to
                date. A one-tap Reviewed button so you know exactly who
                looked. Then we roll it out to the whole team.
              </p>
            </div>
            <div className="p-phase">
              <div className="p-phase-when">Phase 3</div>
              <p>
                Coaching that reads across every metric and the notes.
                Bonus-tier nudges that tell a tech he is two points from the
                next payout. A voice option for the windshield time.
              </p>
            </div>
            <div className="p-phase highlight">
              <div className="p-phase-when">Phase 4</div>
              <p>
                Your dashboard. The bird&apos;s-eye view. Leaderboard, every
                tech, who is engaging, who is sliding, across the whole
                program.
              </p>
            </div>
          </div>
          <p className="mt">
            Each phase ships, gets used, and gets proven before the next one
            starts. The feedback loop is built into the plan, not bolted on
            after.
          </p>
        </section>

        <section className="p-section">
          <div className="p-num">§ 05</div>
          <h2>
            The <span className="amber">investment</span>.
          </h2>
          <div className="p-tiers">
            <div className="p-tier">
              <div className="p-tier-head">
                <span className="p-tier-label">Phase 1</span>
                <span className="p-tier-name">Foundation &amp; DCR</span>
                <span className="p-tier-size">$2,000</span>
              </div>
              <p>
                Tableau to Telegram. Completion rate, rank, company average.
                The whole spine of the system, working.
              </p>
            </div>
            <div className="p-tier">
              <div className="p-tier-head">
                <span className="p-tier-label">Phase 2</span>
                <span className="p-tier-name">Full Metrics &amp; Rollout</span>
                <span className="p-tier-size">$2,500</span>
              </div>
              <p>
                Survey score and dollars per work order. Trends across every
                time window. Read receipts. Live for the entire team.
              </p>
            </div>
            <div className="p-tier">
              <div className="p-tier-head">
                <span className="p-tier-label">Phase 3</span>
                <span className="p-tier-name">AI Coaching &amp; Voice</span>
                <span className="p-tier-size">$3,000</span>
              </div>
              <p>
                The coach. Reads the metrics and the notes, nudges toward the
                next bonus tier, talks back as a voice note.
              </p>
            </div>
            <div className="p-tier">
              <div className="p-tier-head">
                <span className="p-tier-label">Phase 4</span>
                <span className="p-tier-name">Manager Dashboard</span>
                <span className="p-tier-size">$2,500</span>
              </div>
              <p>
                Your command center. Every tech, every trend, every
                engagement, on one screen.
              </p>
            </div>
          </div>
          <div className="ry-price">
            <div className="ry-price-head">
              <span className="ry-price-label">Full build, every phase</span>
              <span className="ry-price-was">$10,000</span>
            </div>
            <div className="ry-price-now">
              <span className="ry-price-big">$5,000</span>
              <span className="ry-price-note">
                Because of our history together.{" "}
                <span className="italic">Half.</span>
              </span>
            </div>
            <p className="ry-price-ask">
              $10,000 is the honest number, less than three months of the time
              this hands back to you. You pay half. The only thing I ask in
              return: introduce me to one or two operators who would put a
              system like this to work. That is the entire deal.
            </p>
          </div>
          <ul className="mt">
            <li>
              <b>Payment, dead simple.</b> $2,500 to start, $2,500 at the
              finish. The finish is the whole system done and running: core
              functionality live and the manager dashboard up. That is the
              entire $5,000. No phase-by-phase invoicing to chase.
            </li>
            <li>
              <b>Retainer:</b> $500 a month once the build is live. Hosting,
              monitoring, new metrics, new techs, prompt tuning, next-day
              support. The first month is on me.
            </li>
            <li>
              <b>Usage at cost.</b> AI, voice, and hosting billed at what they
              cost. No markup, no surprises.
            </li>
          </ul>
        </section>

        <section className="p-section">
          <div className="p-num">§ 06</div>
          <h2>
            What I need <span className="italic">from you</span>.
          </h2>
          <p>
            Four things unlock Phase 1. None of them are heavy. Let&apos;s
            lock them down right here on the call.
          </p>
          <ul>
            <li>
              <b>Tableau access.</b> Can we pull the export with an API key or
              token, or are you the one who triggers the daily export? Either
              way works. I just need to know which so I build the right thing.
            </li>
            <li>
              <b>Telegram.</b> I set up the bot. Each tech sends it one message
              so it knows where to reach them. Who runs that one-time step
              with the crew?
            </li>
            <li>
              <b>The bonus tiers, and one real message you send today.</b> You
              mentioned both last time. Those two are what make the coaching
              sound like you.
            </li>
            <li>
              <b>The current roster, and which program is in scope.</b> So the
              names line up clean from day one and we do not chase the wrong
              fifteen people.
            </li>
          </ul>
        </section>

        <section className="p-section ask">
          <div className="p-num">§ 07</div>
          <h2 className="ask-h">
            What happens <span className="italic">next</span>.
          </h2>
          <p className="ask-body">
            <b>Green light it on this call. The $2,500 deposit starts
            everything.</b>
          </p>
          <ul className="ask-list">
            <li>Right here, on this call: lock how I get the Tableau data.</li>
            <li>The one or two intros, this week.</li>
            <li>Phase 1 live within about a week of access.</li>
          </ul>
          <p className="ask-body">
            You build the reward. I build the coach. Together that is a machine
            that makes your techs better whether you are on the phone with
            them or not.
          </p>
          <p className="ask-close">Let&apos;s run it.</p>
        </section>

        <div className="proposal-cta">
          <a
            href={RYAN_WA_URL}
            target="_blank"
            rel="noreferrer"
            className="btn primary"
          >
            I&apos;m in <span className="btn-arrow">→</span>
          </a>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noreferrer"
            className="btn ghost"
          >
            Or book the kickoff session
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
