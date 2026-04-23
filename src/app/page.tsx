"use client";

import { useEffect, useState } from "react";
import {
  SHOW_CASES,
  CALENDLY_URL,
  EMAIL,
  PRICE_USD,
  TIMELINE_LABEL,
  RETAINER_MIN,
  RETAINER_MAX,
  STUDIO_NAME,
  FOUNDER,
  LOCATION,
  HEADSHOT_PATH,
} from "@/config";

const priceFormatted = `$${(PRICE_USD / 1000).toFixed(0)}K`;

export default function Home() {
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((x) => {
          if (x.isIntersecting) {
            x.target.classList.add("on");
            io.unobserve(x.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href") || "";
      if (id.length < 2) return;
      const t = document.querySelector(id);
      if (t) {
        e.preventDefault();
        window.scrollTo({
          top: t.getBoundingClientRect().top + window.scrollY - 72,
          behavior: "smooth",
        });
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      io.disconnect();
      document.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <>
      <nav className="top">
        <div className="wrap inner">
          <div className="mark">
            <div className="logo">W&amp;</div>
            <div>
              <div className="m1">{STUDIO_NAME}</div>
              <div className="m2">Custom apps · Built with AI</div>
            </div>
          </div>
          <div className="navlinks">
            <a href="#services">Services</a>
            <a href="#compare">Why now</a>
            <a href="#process">Process</a>
            <a href="#pricing">Pricing</a>
          </div>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noreferrer"
            className="nav-cta"
          >
            Book a Call <span className="arrow">→</span>
          </a>
        </div>
      </nav>

      {/* HERO */}
      <header className="hero">
        <div className="wrap">
          <div className="hero-grid">
            <div>
              <div className="status-pill">
                <span className="dot"></span>Accepting new projects · Q3 2026
              </div>
              <h1>
                <span className="line">
                  <span className="chip amber">Custom</span> apps,
                </span>
                <span className="line">
                  built with <span className="amber-word">AI,</span>
                </span>
                <span className="line">shipped in</span>
                <span className="line">
                  <span className="chip outline">21 days.</span>
                </span>
              </h1>
              <p className="lede">
                AI lets me build faster than any agency can quote. If your
                team is buried in <b>spreadsheets</b>, running on{" "}
                <b>software from 2004</b>, or patching the gaps with{" "}
                <b>WhatsApp</b>, I build the custom app that replaces all of
                it. <span className="u">Shipped in 21 days. Yours to own.</span>
              </p>
              <div className="cta">
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="btn primary"
                >
                  Book a Free Discovery Call →
                </a>
                <a href="#pricing" className="btn ghost">
                  See Pricing
                </a>
              </div>
            </div>
            <div
              className="hero-backdrop"
              style={{ backgroundImage: `url(${HEADSHOT_PATH})` }}
            />
          </div>

          <div className="stats">
            <div className="stat">
              <div className="v">
                <span className="amber">{priceFormatted}</span>
              </div>
              <div className="l">Flat price. One number, no quote dance.</div>
            </div>
            <div className="stat">
              <div className="v">
                <span className="amber">21</span>
              </div>
              <div className="l">Days to a working v1. Not weeks. Not months.</div>
            </div>
            <div className="stat">
              <div className="v">
                1<span className="amber">×</span>
              </div>
              <div className="l">Builder, end to end. No middleman.</div>
            </div>
            <div className="stat">
              <div className="v">
                100<span className="amber">%</span>
              </div>
              <div className="l">Yours. Code, data, accounts, domain.</div>
            </div>
          </div>

          <div className="marquee">
            <div className="marquee-track">
              {[
                "Next.js",
                "Supabase",
                "Prisma",
                "n8n",
                "Claude",
                "Stripe",
                "Twilio",
                "Vercel",
                "Postgres",
                "OpenAI",
                "Tailwind",
                "TypeScript",
                "Next.js",
                "Supabase",
                "Prisma",
                "n8n",
                "Claude",
                "Stripe",
                "Twilio",
                "Vercel",
                "Postgres",
                "OpenAI",
                "Tailwind",
                "TypeScript",
              ].map((t, i) => (
                <span key={i}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* SERVICES */}
      <section id="services" className="section">
        <div className="wrap">
          <div className="sec-head reveal">
            <div className="eyebrow">What I build</div>
            <h2>
              One custom app. <span className="italic">Wired</span>{" "}
              <span className="amber">end to end</span>.
            </h2>
            <p>
              Not a stack of SaaS seats. Not a dashboard on top of a
              spreadsheet. The one system your team opens at 7 a.m., built
              around how your business actually runs.
            </p>
          </div>
          <div className="services reveal">
            <article className="service">
              <div className="num">S.01 / The main app</div>
              <div className="chevron">→</div>
              <div>
                <h3>
                  Custom internal <span className="italic">platforms</span>
                </h3>
                <p>
                  Orders, customers, payments, scheduling, inventory, dispatch.
                  One login. One source of truth. Replaces the Frankenstein of
                  spreadsheets and SaaS seats you run on now.
                </p>
              </div>
            </article>
            <article className="service">
              <div className="num">S.02 / Background work</div>
              <div className="chevron">→</div>
              <div>
                <h3>
                  Workflow <span className="italic">automation</span>
                </h3>
                <p>
                  Invoices, lead routing, reminders, reports. The repetitive
                  tasks that eat your team&apos;s day run automatically,
                  overnight. You keep the output. You lose the drudgery.
                </p>
              </div>
            </article>
            <article className="service">
              <div className="num">S.03 / Intelligence</div>
              <div className="chevron">→</div>
              <div>
                <h3>
                  AI <span className="italic">agents</span>
                </h3>
                <p>
                  Custom agents that do real work. Research, drafting, data
                  extraction, customer outreach. Not a chatbot. A purpose-built
                  operator that never sleeps.
                </p>
              </div>
            </article>
            <article className="service">
              <div className="num">S.04 / Connective tissue</div>
              <div className="chevron">→</div>
              <div>
                <h3>
                  System <span className="italic">integration</span>
                </h3>
                <p>
                  Your CRM, accounting, email, and internal tools wired into
                  one pipeline. Data flows where it needs to. Nothing falls
                  through the cracks.
                </p>
              </div>
            </article>
            <article className="service">
              <div className="num">S.05 / Field & floor</div>
              <div className="chevron">→</div>
              <div>
                <h3>
                  Driver & field <span className="italic">apps</span>
                </h3>
                <p>
                  Built for the phone in the warehouse, the truck, the
                  kitchen. Fast, offline-tolerant, one-thumb usable by someone
                  who isn&apos;t sitting at a desk.
                </p>
              </div>
            </article>
            <article className="service">
              <div className="num">S.06 / Handover</div>
              <div className="chevron">→</div>
              <div>
                <h3>
                  You <span className="italic">own</span> it
                </h3>
                <p>
                  Code, data, accounts, domain. Fully yours. I stay on
                  retainer if you want me. If you don&apos;t, I hand over the
                  keys and walk. Nothing held hostage.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* WORK GALLERY (hidden until real case studies are ready) */}
      {SHOW_CASES && (
        <section id="work" className="section" style={{ paddingTop: 40 }}>
          <div className="wrap">
            <div className="sec-head reveal">
              <div className="eyebrow">The work</div>
              <h2>
                Built <span className="italic">with purpose</span>. Quality at
                every touchpoint.
              </h2>
              <p>
                From the admin screen the owner uses every morning to the
                driver app running on a cracked phone in a delivery truck. It
                all has to work, end to end.
              </p>
            </div>
            <div className="gallery reveal">
              <div className="tile a">
                <div className="art art-dashboard"></div>
                <div className="label">
                  <div className="t">Ops dashboard</div>
                  <div className="k">Admin panel</div>
                </div>
              </div>
              <div className="tile b">
                <div className="art art-flow">
                  <svg viewBox="0 0 200 120" fill="none">
                    <rect x="10" y="20" width="40" height="24" rx="6" stroke="#FF8A3D" strokeWidth="1.5" />
                    <rect x="80" y="10" width="40" height="24" rx="6" stroke="#B8B3A8" strokeWidth="1.5" />
                    <rect x="80" y="50" width="40" height="24" rx="6" stroke="#B8B3A8" strokeWidth="1.5" />
                    <rect x="80" y="90" width="40" height="24" rx="6" stroke="#B8B3A8" strokeWidth="1.5" />
                    <rect x="150" y="50" width="40" height="24" rx="6" stroke="#FF8A3D" strokeWidth="1.5" />
                    <path d="M50 32 L80 22 M50 32 L80 62 M50 32 L80 102 M120 22 L150 62 M120 62 L150 62 M120 102 L150 62" stroke="#6B6860" strokeWidth="1" />
                  </svg>
                </div>
                <div className="label">
                  <div className="t">n8n pipeline · 24/7</div>
                  <div className="k">Automation</div>
                </div>
              </div>
              <div className="tile c">
                <div className="art art-ring"></div>
                <div className="label">
                  <div className="t">Inventory · SKU photos</div>
                  <div className="k">Operators</div>
                </div>
              </div>
              <div className="tile d">
                <div className="art art-sms">
                  <svg viewBox="0 0 120 80" style={{ width: "70%" }} fill="none">
                    <rect x="6" y="10" width="70" height="26" rx="13" fill="#FF8A3D" />
                    <text x="18" y="27" fill="#1A0B04" fontFamily="Inter" fontSize="11" fontWeight="700">
                      can&apos;t make Sun
                    </text>
                    <rect x="44" y="44" width="70" height="26" rx="13" fill="#2A2A2D" />
                    <text x="52" y="61" fill="#F5F2EC" fontFamily="Inter" fontSize="11" fontWeight="500">
                      got it, removed ✓
                    </text>
                  </svg>
                </div>
                <div className="label">
                  <div className="t">SMS-first comms</div>
                  <div className="k">Customer</div>
                </div>
              </div>
              <div className="tile e">
                <div className="art art-driver">
                  <svg viewBox="0 0 200 80" fill="none">
                    <path d="M10 60 Q60 20 110 50 T190 40" stroke="#FF8A3D" strokeWidth="2" strokeDasharray="4 4" />
                    <circle cx="10" cy="60" r="4" fill="#FF8A3D" />
                    <circle cx="60" cy="36" r="3" fill="#B8B3A8" />
                    <circle cx="110" cy="50" r="3" fill="#B8B3A8" />
                    <circle cx="155" cy="41" r="3" fill="#B8B3A8" />
                    <circle cx="190" cy="40" r="4" fill="#FF8A3D" />
                  </svg>
                </div>
                <div className="label">
                  <div className="t">Route optimization</div>
                  <div className="k">Driver app</div>
                </div>
              </div>
              <div className="tile f">
                <div className="art art-agent">
                  <svg viewBox="0 0 200 240" fill="none">
                    <rect x="20" y="30" width="160" height="180" rx="16" stroke="#2E2E2B" strokeWidth="1.5" fill="#111113" />
                    <rect x="32" y="46" width="100" height="10" rx="5" fill="#2E2E2B" />
                    <rect x="32" y="66" width="80" height="10" rx="5" fill="#2E2E2B" />
                    <rect x="32" y="92" width="136" height="34" rx="8" fill="#1A0F20" stroke="#FF8A3D" strokeWidth="1" />
                    <text x="42" y="112" fill="#FF8A3D" fontFamily="JetBrains Mono" fontSize="9">
                      → claude extracting...
                    </text>
                    <rect x="32" y="138" width="136" height="10" rx="5" fill="#22221F" />
                    <rect x="32" y="156" width="110" height="10" rx="5" fill="#22221F" />
                    <rect x="32" y="174" width="120" height="10" rx="5" fill="#22221F" />
                  </svg>
                </div>
                <div className="label">
                  <div className="t">AI agents at work</div>
                  <div className="k">Intelligence</div>
                </div>
              </div>
              <div className="tile g">
                <div className="art art-reel">
                  <svg viewBox="0 0 200 100" fill="none">
                    <rect x="40" y="10" width="48" height="80" rx="8" fill="#2A0A14" stroke="#3A1020" strokeWidth="1" />
                    <polygon points="58,36 58,64 80,50" fill="#FF8A3D" />
                    <rect x="100" y="10" width="48" height="80" rx="8" fill="#2A0A14" stroke="#3A1020" strokeWidth="1" />
                    <polygon points="118,36 118,64 140,50" fill="#FF8A3D" />
                  </svg>
                </div>
                <div className="label">
                  <div className="t">Parent comms</div>
                  <div className="k">Notifications</div>
                </div>
              </div>
              <div className="tile h">
                <div className="art art-ads">
                  <svg viewBox="0 0 200 80" fill="none">
                    <rect x="14" y="14" width="172" height="52" rx="8" stroke="#6BD18A" strokeWidth="1.5" fill="#0A1A18" />
                    <rect x="24" y="24" width="40" height="32" rx="4" fill="#143028" />
                    <rect x="74" y="24" width="80" height="8" rx="4" fill="#6BD18A" />
                    <rect x="74" y="40" width="110" height="6" rx="3" fill="#2E3B36" />
                    <rect x="74" y="52" width="60" height="6" rx="3" fill="#2E3B36" />
                  </svg>
                </div>
                <div className="label">
                  <div className="t">Reconciliation</div>
                  <div className="k">Invoices</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* YESTERDAY VS TODAY */}
      <section id="compare" className="section">
        <div className="wrap">
          <div className="sec-head reveal">
            <div className="eyebrow">The future is now</div>
            <h2>
              Adapt <span className="italic">with AI</span>, or get left{" "}
              <span className="amber">behind</span>.
            </h2>
            <p>
              The owner-operators winning right now aren&apos;t working
              harder. They&apos;re shipping one custom tool that does what ten
              SaaS seats used to, built with AI in 21 days. The ones still on
              software from 2004 are already falling behind.
            </p>
          </div>
          <div className="compare reveal">
            <div className="col old">
              <h3>
                Yesterday&apos;s <span className="italic">playbook</span>
              </h3>
              <ul>
                <li>
                  <span className="icon">×</span>
                  <span>Software from 2004 running the entire business</span>
                </li>
                <li>
                  <span className="icon">×</span>
                  <span>Five WhatsApp threads per customer</span>
                </li>
                <li>
                  <span className="icon">×</span>
                  <span>Paper, clipboards, and a whiteboard at 5 a.m.</span>
                </li>
                <li>
                  <span className="icon">×</span>
                  <span>Invoices typed by hand, one by one</span>
                </li>
                <li>
                  <span className="icon">×</span>
                  <span>Every new process means another SaaS seat</span>
                </li>
                <li>
                  <span className="icon">×</span>
                  <span>Scaling means hiring more admin staff</span>
                </li>
              </ul>
            </div>
            <div className="col new">
              <h3>
                The <span className="italic amber">AI-built</span> edge
              </h3>
              <ul>
                <li>
                  <span className="icon">◆</span>
                  <span>One custom app doing the work of ten SaaS tools</span>
                </li>
                <li>
                  <span className="icon">◆</span>
                  <span>Every customer touchpoint logged in one place</span>
                </li>
                <li>
                  <span className="icon">◆</span>
                  <span>Automated dispatch and routing in the driver&apos;s hand</span>
                </li>
                <li>
                  <span className="icon">◆</span>
                  <span>Invoices generated and sent overnight, hands-off</span>
                </li>
                <li>
                  <span className="icon">◆</span>
                  <span>New workflows added in days, built with AI</span>
                </li>
                <li>
                  <span className="icon">◆</span>
                  <span>Scaling means one more seat, not one more hire</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* METHOD */}
      <section id="process" className="section">
        <div className="wrap">
          <div className="sec-head reveal">
            <div className="eyebrow">How it works</div>
            <h2>
              Sit. Learn. <span className="italic">Build.</span> Ship.{" "}
              <span className="amber">Hand over.</span>
            </h2>
          </div>
          <div className="method-grid">
            <div className="phases reveal">
              <div className="phase">
                <div className="p">Phase I</div>
                <div>
                  <div className="t">
                    Sit with the <span className="italic">owner</span>.
                  </div>
                  <div className="d">
                    Half a day on-site or on a call. I watch how the business
                    actually runs. Not what the org chart says. Not what the
                    manager thinks. The real flow from order to cash.
                  </div>
                </div>
                <div className="w">Day 01</div>
              </div>
              <div className="phase">
                <div className="p">Phase II</div>
                <div>
                  <div className="t">
                    Find the <span className="italic">one painful thing</span>.
                  </div>
                  <div className="d">
                    Every business has a thing everyone in it hates. I find
                    it, scope it, and build it first. Prove value fast before
                    scope creeps.
                  </div>
                </div>
                <div className="w">Day 02–03</div>
              </div>
              <div className="phase">
                <div className="p">Phase III</div>
                <div>
                  <div className="t">
                    Ship a working <span className="italic">v1</span>.
                  </div>
                  <div className="d">
                    Real users, real data, real workflow. Not a slide deck.
                    Not a demo. A working app your team opens Monday morning.
                  </div>
                </div>
                <div className="w">Day 04–21</div>
              </div>
              <div className="phase">
                <div className="p">Phase IV</div>
                <div>
                  <div className="t">
                    Wire in the <span className="italic">rest</span>.
                  </div>
                  <div className="d">
                    Once v1 is proving itself, layer on automations,
                    integrations, and AI agents. Added as the team grows into
                    them, not all at once.
                  </div>
                </div>
                <div className="w">Ongoing</div>
              </div>
              <div className="phase">
                <div className="p">Phase V</div>
                <div>
                  <div className="t">
                    Hand over the <span className="italic">keys</span>.
                  </div>
                  <div className="d">
                    Code, data, accounts, domain. All yours. I stay on
                    retainer if you want me. If you don&apos;t, full handoff,
                    clean exit. Nothing held hostage.
                  </div>
                </div>
                <div className="w">Yours</div>
              </div>
            </div>
            <aside className="method-card reveal">
              <div className="qmark">&ldquo;</div>
              <blockquote>
                I don&apos;t sell SaaS seats. I build the one custom app your
                business actually runs on, with AI, in 21 days, and{" "}
                <span className="italic">hand it over</span> when it&apos;s
                done.
              </blockquote>
              <div className="stack">
                <span>Next.js</span>
                <span>Supabase</span>
                <span>Prisma</span>
                <span>n8n</span>
                <span>Claude</span>
                <span>Stripe</span>
              </div>
              <div className="sig">
                <span className="who">— {FOUNDER}</span>
                <span className="role">Founder, {STUDIO_NAME}</span>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="section">
        <div className="wrap">
          <div className="sec-head reveal">
            <div className="eyebrow">Pricing</div>
            <h2>
              One price. <span className="italic">One app.</span>{" "}
              <span className="amber">Yours.</span>
            </h2>
            <p>
              No quote dance. No hourly meter. No "call for pricing." One
              number on the page so you know exactly what a working custom app
              for your business costs before you pick up the phone.
            </p>
          </div>

          <div className="price-card reveal">
            <div className="price-head">
              <div>
                <div className="price-tag">Standard engagement</div>
                <div className="price-name">Custom app, built with AI</div>
              </div>
              <div className="price-number">
                <span className="amount">{priceFormatted}</span>
                <span className="suffix">flat</span>
              </div>
            </div>

            <div className="price-sub">
              A working v1 of your custom app, shipped in{" "}
              <b>{TIMELINE_LABEL}</b>. Built by one person, powered by AI.
              Yours to own the day it ships.
            </div>

            <div className="price-cols">
              <div className="price-col">
                <div className="price-col-head">What&apos;s included</div>
                <ul>
                  <li>Half-day intake session, on-site or on a call</li>
                  <li>Complete custom app, deployed and running</li>
                  <li>Admin dashboard, driver app, or field app as scoped</li>
                  <li>Up to three external integrations (Stripe, Twilio, etc.)</li>
                  <li>AI agents where they earn their keep</li>
                  <li>All code, data, accounts, and domain under your name</li>
                </ul>
              </div>
              <div className="price-col">
                <div className="price-col-head">How payment works</div>
                <ul>
                  <li>
                    <b>50%</b> at kickoff
                  </li>
                  <li>
                    <b>50%</b> at delivery
                  </li>
                  <li>
                    <b>
                      ${RETAINER_MIN}&ndash;${RETAINER_MAX}/mo
                    </b>{" "}
                    retainer for hosting, API costs, and minor iteration
                  </li>
                  <li>Post-launch changes billed at $175/hr or rolled into retainer</li>
                  <li>Major new features scoped as a separate v2</li>
                </ul>
              </div>
            </div>

            <div className="price-cta">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noreferrer"
                className="btn primary"
              >
                Book a Free Discovery Call →
              </a>
              <span className="price-note">
                30 minutes. No deck. No pitch. No pressure.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="wrap">
          <div className="frame reveal">
            <div className="c-head">
              <div className="eyebrow">Get started</div>
              <h2>
                Ready to kill your <span className="italic">most painful</span>{" "}
                <span className="amber">workflow</span>?
              </h2>
              <p>
                Book a free 30-minute discovery call. No deck, no pitch. I ask
                questions about how your business actually runs today. If
                it&apos;s a fit, we scope. If it isn&apos;t, I&apos;ll point
                you somewhere that is.
              </p>
              <div className="c-actions">
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="btn primary big"
                >
                  Book a Call on Calendly →
                </a>
                <a href={`mailto:${EMAIL}`} className="btn ghost">
                  Or email me directly
                </a>
              </div>
            </div>
            <div className="c-body single">
              <aside className="c-aside">
                <h4>
                  What <span className="italic">happens</span> next.
                </h4>
                <div className="steps">
                  <div className="step">
                    <span className="w">Day 00</span>
                    <span>You book a call on Calendly. No form, no gatekeeping.</span>
                  </div>
                  <div className="step">
                    <span className="w">Day 01</span>
                    <span>
                      30-minute discovery call. I ask how the business really
                      runs. No pitch, no deck.
                    </span>
                  </div>
                  <div className="step">
                    <span className="w">Day 02–03</span>
                    <span>
                      One-page scope sent. Flat {priceFormatted} confirmed.
                      You sign, you pay 50 percent, we kick off.
                    </span>
                  </div>
                  <div className="step">
                    <span className="w">Day 04–21</span>
                    <span>
                      I build. You get progress updates. AI does the grunt
                      work. I do the thinking.
                    </span>
                  </div>
                  <div className="step">
                    <span className="w">Day 21</span>
                    <span>
                      First login. Real users, real data. Your custom app,
                      live and yours.
                    </span>
                  </div>
                </div>
              </aside>
            </div>
            {sent && (
              <div className="sent-banner">
                ◆ Received. I&apos;ll reply within 24 hours. — {FOUNDER}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="wrap">
          <div className="foot-big">
            <span className="italic">Let&apos;s</span> build{" "}
            <span className="amber">something.</span>
          </div>
          <div className="foot-cols">
            <div>
              <h5>{STUDIO_NAME}</h5>
              <p className="mail">{EMAIL}</p>
              <p>Independent studio · {LOCATION} · Remote</p>
              <p style={{ marginTop: 16 }}>
                Custom apps built with AI for owner-operated small
                businesses.
              </p>
            </div>
            <div>
              <h5>Services</h5>
              <a href="#services">Custom platforms</a>
              <a href="#services">Automation</a>
              <a href="#services">AI agents</a>
              <a href="#services">Integration</a>
            </div>
            <div>
              <h5>Stack</h5>
              <a>Next.js · TypeScript</a>
              <a>Supabase · Prisma</a>
              <a>n8n · Claude</a>
              <a>Stripe · Twilio</a>
            </div>
            <div>
              <h5>Get in touch</h5>
              <a href={CALENDLY_URL} target="_blank" rel="noreferrer">
                Book a call
              </a>
              <a href={`mailto:${EMAIL}`}>Email</a>
              <a href="#pricing">Pricing</a>
              <a href="#process">Process</a>
            </div>
          </div>
          <div className="colophon">
            <span>
              © {new Date().getFullYear()} {STUDIO_NAME} · Custom apps, built
              with AI
            </span>
            <span>Set in Inter · Instrument Serif · JetBrains Mono</span>
            <span>Measured · Cut · Delivered</span>
          </div>
        </div>
      </footer>
    </>
  );
}
