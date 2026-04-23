"use client";

import { useEffect } from "react";
import { STUDIO_NAME, CALENDLY_URL } from "@/config";

const SLUG = "clark";
const RECIPIENT = "Clark";
const PREPARED_DATE = "April 24, 2026";

// A custom WhatsApp message for this proposal specifically.
const CLARK_WA_URL =
  "https://wa.me/12243688111?text=" +
  encodeURIComponent(
    "Hey Zach, I read the proposal. I'm in. Let's talk."
  );

export default function ClarkProposal() {
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
    <div className="proposal">
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
          <div className="eyebrow">Response to our conversation</div>
          <h1>
            FlatRate:
            <br />
            <span className="italic">90 Days In</span>,
            <br />
            <span className="amber">24 Months Out</span>.
          </h1>
          <div className="proposal-byline">— Zach Weiss</div>
        </div>

        <section className="p-section preamble">
          <div className="preamble-label">A note on what you noticed</div>
          <p>
            You opened my site and saw your business. That&apos;s not a
            coincidence, and it&apos;s not lifted. We&apos;ve independently
            landed on the same thesis — custom internal tools, flat $25K,
            shipped in 21 days on the AI stack — from different sides of the
            table. That&apos;s the argument for this proposal, not against
            it. What follows is how we combine.
          </p>
        </section>

        <section className="p-section">
          <div className="p-num">§ 01</div>
          <h2>
            Why <span className="italic">now</span>, why{" "}
            <span className="amber">us</span>.
          </h2>
          <div className="p-two-col">
            <div>
              <h3>Why now</h3>
              <p>
                AI tooling crossed a threshold in the last six months. A
                two-person shop can now ship in 21 days what a 20-person
                agency shipped in 2023. That window closes in 12 to 18 months
                as Superblocks, Retool, and Vercel go full self-serve. We own
                the delivery layer before they do.
              </p>
            </div>
            <div>
              <h3>Why us</h3>
              <p style={{ marginBottom: 10 }}>
                Three things no competitor has at once:
              </p>
              <ul>
                <li>
                  Tiferes&apos; LP network as a warm distribution channel
                </li>
                <li>
                  A sales-operator-builder hybrid running the front end — I
                  close the calls and ship the code
                </li>
                <li>
                  The frum trust network as a referral accelerant that
                  doesn&apos;t exist outside our world
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="p-section">
          <div className="p-num">§ 02</div>
          <h2>
            The 200 LPs, <span className="italic">reframed</span>.
          </h2>
          <p className="lead">
            They&apos;re not 200 leads. They&apos;re 200 compounding assets.
          </p>
          <p>
            Each one is simultaneously a potential client, a referral node
            into 5 to 10 portfolio or board companies, a future case study,
            and a long-term advocate who associates Tiferes with AI-native
            operational excellence.
          </p>
          <div className="p-stats">
            <div className="p-stat">
              <span className="v">200</span>
              <span className="l">LPs in the network</span>
            </div>
            <div className="p-stat">
              <span className="v">4×</span>
              <span className="l">Asset types per LP</span>
            </div>
            <div className="p-stat">
              <span className="v">5–10</span>
              <span className="l">Portcos per connector</span>
            </div>
          </div>
          <p className="mt">
            Working segmentation to tag with you over 90 minutes:
          </p>
          <div className="p-tiers">
            <div className="p-tier">
              <div className="p-tier-head">
                <span className="p-tier-label">Tier A</span>
                <span className="p-tier-name">Active operators</span>
                <span className="p-tier-size">~30 – 50</span>
              </div>
              <p>
                CEOs and founders of running companies. Direct client
                potential. 5 to 10 have a real FlatRate-shaped problem right
                now.
              </p>
            </div>
            <div className="p-tier">
              <div className="p-tier-head">
                <span className="p-tier-label">Tier B</span>
                <span className="p-tier-name">Connectors</span>
                <span className="p-tier-size">~80 – 100</span>
              </div>
              <p>
                Board members, GPs, syndicate leads. Each sits on top of 3 to
                10 portfolio companies. Highest referral volume.
              </p>
            </div>
            <div className="p-tier">
              <div className="p-tier-head">
                <span className="p-tier-label">Tier C</span>
                <span className="p-tier-name">
                  Passive HNW &amp; family offices
                </span>
                <span className="p-tier-size">~60 – 80</span>
              </div>
              <p>
                Lightest outreach, later batches. They still matter as brand
                carriers.
              </p>
            </div>
          </div>
        </section>

        <section className="p-section">
          <div className="p-num">§ 03</div>
          <h2>
            The message, from <span className="italic">you</span> to the LP.
          </h2>
          <p>
            Batches of 25 to 30 per week. Personal, short, two paths to yes,
            one path to no.
          </p>
          <div className="p-quote">
            <div className="p-quote-label">
              My reply · within 2 hours of any response
            </div>
            <p>
              &ldquo;[First name], thanks for writing back. Based on what you
              said, it sounds like [the specific thing they mentioned] is the
              thing eating time. I build one custom tool at a time for
              owner-operators in 21 days.&rdquo;
            </p>
            <p>
              &ldquo;One option: 15-minute call this week to see if a 21-day
              build makes sense here. If it does, we scope on the call. If it
              doesn&apos;t, I&apos;ll point you somewhere useful. Either way
              the call costs nothing.&rdquo;
            </p>
          </div>
        </section>

        <section className="p-section">
          <div className="p-num">§ 04</div>
          <h2>
            The Pilot: 90 days, <span className="italic">3 closes</span>, 3
            case studies.
          </h2>
          <div className="p-timeline">
            <div className="p-phase">
              <div className="p-phase-when">Days 1 – 14</div>
              <p>
                Segment the list together. First batch of 25 sent.
                I&apos;m staffed on inbound from day one.
              </p>
            </div>
            <div className="p-phase">
              <div className="p-phase-when">Days 15 – 45</div>
              <p>
                Three scoping calls, three closes. Tier A and early Tier B
                responders.
              </p>
            </div>
            <div className="p-phase">
              <div className="p-phase-when">Days 30 – 75</div>
              <p>
                Tools ship in 21-day cycles. I build solo on the AI stack
                (Superblocks or Retool, Claude Code, Cursor, Supabase,
                Next.js). Same stack I&apos;ve already shipped on:
                GluckSports, TruCore, HaloPrime.
              </p>
            </div>
            <div className="p-phase">
              <div className="p-phase-when">Days 60 – 90</div>
              <p>
                Case studies recorded. Video testimonials in hand. Pilot
                partners named in marketing.
              </p>
            </div>
            <div className="p-phase highlight">
              <div className="p-phase-when">Day 90</div>
              <p>
                Debrief. Three proof points. Shape of the business is clear.
                We talk about Phase 2 with real data.
              </p>
            </div>
          </div>
        </section>

        <section className="p-section">
          <div className="p-num">§ 05</div>
          <h2>
            The <span className="italic">compounding</span> moat.
          </h2>
          <p>Every build generates five assets beyond the revenue:</p>
          <ul>
            <li>A reusable template</li>
            <li>A named case study</li>
            <li>A referral loop</li>
            <li>A potential retainer</li>
            <li>
              Proprietary data on what internal tools actually get used
            </li>
          </ul>
          <div className="p-callout">
            <p>
              <span className="amber-bold">Build 11</span> is twice as fast
              as Build 1. <span className="amber-bold">Build 31</span> is a
              product. This isn&apos;t a services business with a ceiling.
              It&apos;s a flywheel with a platform at the end of it.
            </p>
          </div>
        </section>

        <section className="p-section">
          <div className="p-num">§ 06</div>
          <h2>
            The <span className="italic">24-month</span> picture.
          </h2>
          <div className="p-timeline">
            <div className="p-phase">
              <div className="p-phase-when">Month 12</div>
              <p>
                Eight to twelve named case studies from the LP-network
                builds. Proprietary data on which internal tools actually get
                used. A recognized brand in the AI-native internal-tools
                category inside the frum operator world, before Retool and
                Vercel go full self-serve.
              </p>
            </div>
            <div className="p-phase">
              <div className="p-phase-when">Month 18</div>
              <p>
                Transition from pure services to semi-productized. Template
                library for the five most-recurring tool types. Fee per
                engagement holds flat. Margin increases because build time
                drops.
              </p>
            </div>
            <div className="p-phase highlight">
              <div className="p-phase-when">Month 24</div>
              <p>
                Productized platform on top of the template library. The
                moat we&apos;ve been compounding becomes a real asset.
                We&apos;re no longer selling engagements. We&apos;re selling
                licenses to what we built. The marginal build cost drops to
                a few hundred dollars in API calls. The flywheel is running
                on its own.
              </p>
            </div>
          </div>
        </section>

        <section className="p-section">
          <div className="p-num">§ 07</div>
          <h2>
            How I&apos;d <span className="italic">structure</span> this.
          </h2>
          <p>
            Clean terms on both sides. No ambiguity on what success looks
            like. No messy breakup if it doesn&apos;t work.
          </p>
          <ul>
            <li>
              90 days full-time, starting the week after my wedding (May 11).
              No side projects, no other income sources. Running the whole
              motion from pitch through delivery handoff.
            </li>
            <li>
              <b>Hit gate:</b> 3 closes, 3 named case studies by day 90.
            </li>
            <li>
              Your name goes on the LP emails. My life goes into the 90 days.
              Both of us have skin in the game.
            </li>
          </ul>
          <div className="p-two-col mt-lg">
            <div className="p-terms hit">
              <div className="p-terms-label">If we hit</div>
              <p>
                I step into the operator role permanently. We scale into
                Phase 2.
              </p>
            </div>
            <div className="p-terms miss">
              <div className="p-terms-label">If we miss</div>
              <p>
                We both walk clean. You keep the IP and everything I&apos;ve
                built. Real data point either way.
              </p>
            </div>
          </div>
        </section>

        <section className="p-section ask">
          <div className="p-num">§ 08</div>
          <h2 className="ask-h">
            What I&apos;m <span className="italic">actually</span> asking for.
          </h2>
          <p className="ask-body">
            <b>Not permission. Not a job. A pilot.</b>
          </p>
          <ul className="ask-list">
            <li>90 minutes together to tag the list.</li>
            <li>
              Your name on the first batch of LP emails by end of next week.
            </li>
            <li>Kickoff the week after my wedding, May 11.</li>
          </ul>
          <p className="ask-body">
            Everything else is mine. Calls, builds, retention, case studies.
          </p>
          <p className="ask-close">Let&apos;s go.</p>
        </section>

        <div className="proposal-cta">
          <a
            href={CLARK_WA_URL}
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
            Or book the 90-min session
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
