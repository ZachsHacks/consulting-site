"use client";

import { useEffect, useState } from "react";
import {
  SHOW_CASES,
  CALENDLY_URL,
  EMAIL,
  WHATSAPP_URL,
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
            <a href="#about">About</a>
            <a href="#process">Process</a>
            <a href="#pricing">Pricing</a>
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="nav-cta"
            aria-label="Message Zach on WhatsApp"
          >
            Message
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
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
                One custom app, built around how your business actually runs.{" "}
                <b>Shipped in 21 days. $25,000 flat.</b>{" "}
                <span className="u">
                  You own every line when I walk away.
                </span>
              </p>
              <div className="cta">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="btn primary"
                >
                  Message on WhatsApp →
                </a>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="btn ghost"
                >
                  Or book a call
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
              Six things your business
              <br />
              <span className="italic">actually</span>{" "}
              <span className="amber">needs</span>.
            </h2>
            <p>
              Not a stack of SaaS seats. Not a dashboard on top of a
              spreadsheet. One custom app built around how your shop already
              works, opened every morning by the people who run it.
            </p>
          </div>
          <div className="services reveal">
            <article className="service">
              <div className="num">S.01 / Field & floor</div>
              <div className="chevron">→</div>
              <div>
                <h3>
                  Route & <span className="italic">dispatch</span>
                </h3>
                <p>
                  Kill the 5am whiteboard. Drivers get the day on a phone.
                  You get a live map.
                </p>
              </div>
            </article>
            <article className="service">
              <div className="num">S.02 / Intake</div>
              <div className="chevron">→</div>
              <div>
                <h3>
                  Order <span className="italic">intake</span>
                </h3>
                <p>
                  Customers order on a link, not a screenshot. Inventory
                  updates itself.
                </p>
              </div>
            </article>
            <article className="service">
              <div className="num">S.03 / Office</div>
              <div className="chevron">→</div>
              <div>
                <h3>
                  Back-office <span className="italic">tools</span>
                </h3>
                <p>
                  One tool your office manager stops quitting over. The
                  spreadsheets, stickies, and three-tab workflows, gone.
                </p>
              </div>
            </article>
            <article className="service">
              <div className="num">S.04 / Customers</div>
              <div className="chevron">→</div>
              <div>
                <h3>
                  Custom <span className="italic">CRM</span>
                </h3>
                <p>
                  Not Salesforce. Not Monday. Yours. Built around how your
                  shop actually sells, not how a VC in San Francisco thinks
                  you should.
                </p>
              </div>
            </article>
            <article className="service">
              <div className="num">S.05 / Cash flow</div>
              <div className="chevron">→</div>
              <div>
                <h3>
                  Billing & <span className="italic">invoicing</span>
                </h3>
                <p>
                  Invoices fire the second a job closes. Stripe, ACH, or on
                  account. No more midnight typing.
                </p>
              </div>
            </article>
            <article className="service">
              <div className="num">S.06 / Control</div>
              <div className="chevron">→</div>
              <div>
                <h3>
                  Owner <span className="italic">dashboard</span>
                </h3>
                <p>
                  Revenue, open jobs, A/R, who owes you what. The number you
                  need to see before Shabbos.
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
            <div className="eyebrow">Before & after</div>
            <h2>
              What your business looks like on{" "}
              <span className="italic">day</span>{" "}
              <span className="amber">22</span>.
            </h2>
            <p>
              The shops winning right now aren&apos;t working harder.
              They&apos;re running on one tool that does the job of ten, built
              around how they actually work, owned outright.
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
                  <span>Software from 2015 that one ex-employee built</span>
                </li>
                <li>
                  <span className="icon">×</span>
                  <span>WhatsApp threads doing the work of a CRM</span>
                </li>
                <li>
                  <span className="icon">×</span>
                  <span>
                    Whiteboard route planning at 5am, redone by hand every
                    time a driver calls out
                  </span>
                </li>
                <li>
                  <span className="icon">×</span>
                  <span>
                    Spreadsheets you can&apos;t trust, edited by four people
                  </span>
                </li>
                <li>
                  <span className="icon">×</span>
                  <span>Invoices typed by hand, one by one, at night</span>
                </li>
                <li>
                  <span className="icon">×</span>
                  <span>An office manager stretched thinner every year</span>
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
                  <span>
                    Modern stack you own outright. Any developer can pick it
                    up.
                  </span>
                </li>
                <li>
                  <span className="icon">◆</span>
                  <span>
                    Every customer, order, and conversation in one searchable
                    place
                  </span>
                </li>
                <li>
                  <span className="icon">◆</span>
                  <span>
                    Routes auto-built in 90 seconds, pushed to the driver&apos;s
                    phone
                  </span>
                </li>
                <li>
                  <span className="icon">◆</span>
                  <span>One source of truth. One database. One login.</span>
                </li>
                <li>
                  <span className="icon">◆</span>
                  <span>Invoices generated and sent overnight, hands-off</span>
                </li>
                <li>
                  <span className="icon">◆</span>
                  <span>
                    An office manager with an afternoon again.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section">
        <div className="wrap">
          <div className="sec-head reveal">
            <div className="eyebrow">About</div>
            <h2>
              One builder. <span className="italic">One</span> client{" "}
              <span className="amber">at a time</span>.
            </h2>
          </div>
          <div className="about-grid reveal">
            <div className="about-body">
              <p>
                I&apos;m Zach Weiss. <b>Brandeis CS</b>, ex-backend engineer
                at <b>Carbon Black</b>, Brooklyn-based, and frum.
              </p>
              <p>
                I build one custom app for one business at a time. No agency
                layers. No offshore handoffs. No account manager who schedules
                calls with the person actually writing code. You work with the
                builder directly, start to finish.
              </p>
              <p>
                Modern AI tools let one person out-ship a ten-person team. You
                get the work of an agency in 21 days, at a fraction of the
                cost, handed over with every password, every repo, and every
                account in your name.
              </p>
              <p>
                I answer my own phone. You text me directly.
              </p>
            </div>
            <aside className="about-card">
              <div className="about-card-label">Credentials</div>
              <ul>
                <li>
                  <span className="k">Education</span>
                  <span className="v">Brandeis University, BS Computer Science</span>
                </li>
                <li>
                  <span className="k">Prior work</span>
                  <span className="v">
                    Backend engineer, Carbon Black (cybersecurity)
                  </span>
                </li>
                <li>
                  <span className="k">Based</span>
                  <span className="v">Brooklyn, NY · frum community</span>
                </li>
                <li>
                  <span className="k">Model</span>
                  <span className="v">
                    Solo. One client at a time. You work with me directly.
                  </span>
                </li>
                <li>
                  <span className="k">Stack</span>
                  <span className="v">
                    Next.js, Supabase, Prisma, n8n, Claude, Stripe, Twilio
                  </span>
                </li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      {/* METHOD */}
      <section id="process" className="section">
        <div className="wrap">
          <div className="sec-head reveal">
            <div className="eyebrow">How it works</div>
            <h2>
              Diagnose. Spec. <span className="italic">Build.</span> Train.{" "}
              <span className="amber">Hand over.</span>
            </h2>
          </div>
          <div className="method-grid">
            <div className="phases reveal">
              <div className="phase">
                <div className="p">Phase I</div>
                <div>
                  <div className="t">
                    <span className="italic">Diagnose</span>.
                  </div>
                  <div className="d">
                    One 45-minute call where I watch how your business
                    actually runs, not how the org chart says it does.
                  </div>
                </div>
                <div className="w">Day 00</div>
              </div>
              <div className="phase">
                <div className="p">Phase II</div>
                <div>
                  <div className="t">
                    <span className="italic">Spec</span>.
                  </div>
                  <div className="d">
                    I write a plain-English document of what I&apos;m building,
                    what I&apos;m not, and what it&apos;ll do on day 22. You
                    sign it.
                  </div>
                </div>
                <div className="w">Days 01–03</div>
              </div>
              <div className="phase">
                <div className="p">Phase III</div>
                <div>
                  <div className="t">
                    <span className="italic">Build</span> in public.
                  </div>
                  <div className="d">
                    Daily Loom video. Live staging link. WhatsApp me anytime.
                    No black box.
                  </div>
                </div>
                <div className="w">Days 04–17</div>
              </div>
              <div className="phase">
                <div className="p">Phase IV</div>
                <div>
                  <div className="t">
                    <span className="italic">Train</span> the team.
                  </div>
                  <div className="d">
                    Your team uses it before it&apos;s live. We fix the
                    friction they find, not the friction I imagine.
                  </div>
                </div>
                <div className="w">Days 18–20</div>
              </div>
              <div className="phase">
                <div className="p">Phase V</div>
                <div>
                  <div className="t">
                    <span className="italic">Hand</span> over the keys.
                  </div>
                  <div className="d">
                    Repo transferred. Domains pointed. Passwords in your
                    vault. I&apos;m on call 30 days. Then the app is yours,
                    alone, forever.
                  </div>
                </div>
                <div className="w">Day 21</div>
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
                  <li>
                    Discovery call + written spec signed off before a line of
                    code
                  </li>
                  <li>
                    Full custom app on a modern portable stack (Next.js,
                    Supabase, Prisma, n8n, Claude, Stripe, Twilio)
                  </li>
                  <li>
                    Deployed to your domain, your Vercel, your Supabase, your
                    Stripe. Your accounts, not mine.
                  </li>
                  <li>
                    Every line of source code in a GitHub repo under your
                    name, day one
                  </li>
                  <li>
                    Team training, written docs, and a Loom walkthrough for
                    your office manager
                  </li>
                  <li>30 days of post-launch bug fixes at no extra cost</li>
                </ul>
              </div>
              <div className="price-col">
                <div className="price-col-head">How payment works</div>
                <ul>
                  <li>
                    <b>50%</b> on signature. Holds your slot, kicks off
                    discovery.
                  </li>
                  <li>
                    <b>50%</b> on delivery. On working software, not on a
                    go-live promise.
                  </li>
                  <li>
                    <b>
                      ${RETAINER_MIN}&ndash;${RETAINER_MAX}/mo
                    </b>{" "}
                    optional retainer for hosting, API costs, and tweaks.
                    Cancel anytime.
                  </li>
                  <li>
                    Post-launch changes billed at $175/hr or rolled into
                    retainer
                  </li>
                  <li>Major new features scoped as a separate v2</li>
                </ul>
              </div>
            </div>

            <div className="price-extras">
              <div className="price-extra">
                <div className="price-extra-label">The math</div>
                <p>
                  A $4K/month SaaS stack is $48K a year. Every year. Forever.
                  And you don&apos;t own it. This app is $25K once. You break
                  even in six months, and you compound from there.
                </p>
              </div>
              <div className="price-extra">
                <div className="price-extra-label">Risk reversal</div>
                <p>
                  If I don&apos;t ship a working app in 21 days from kickoff,
                  your deposit comes back. Not store credit. A wire. I&apos;d
                  rather eat the loss than drag a build into month three.
                </p>
              </div>
            </div>

            <div className="price-cta">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="btn primary"
              >
                Message on WhatsApp →
              </a>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noreferrer"
                className="btn ghost"
              >
                Or book a call
              </a>
              <span className="price-note">
                Quick answer. No deck. No pitch. No pressure.
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
              <div className="eyebrow">Get in touch</div>
              <h2>
                Send me a <span className="italic">message</span>.{" "}
                <span className="amber">Let&apos;s see if we&apos;re a fit</span>.
              </h2>
              <p>
                Text me on WhatsApp. Not a form. Not a funnel. My actual phone.
                Tell me how your business runs today in a sentence or two. If
                I can help, I&apos;ll say so. If I can&apos;t, I&apos;ll
                point you somewhere that can.
              </p>
              <div className="c-actions">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="btn primary big"
                >
                  Message Zach on WhatsApp →
                </a>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="btn ghost"
                >
                  Or book a call
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
                    <span className="w">Hour 00</span>
                    <span>
                      You message me on WhatsApp. I reply within the hour.
                    </span>
                  </div>
                  <div className="step">
                    <span className="w">Day 01</span>
                    <span>
                      Quick chat to size up the fit. No deck, no pitch.
                    </span>
                  </div>
                  <div className="step">
                    <span className="w">Day 02–04</span>
                    <span>
                      30-minute call. One-page scope written. Flat{" "}
                      {priceFormatted} confirmed.
                    </span>
                  </div>
                  <div className="step">
                    <span className="w">Day 05</span>
                    <span>
                      You sign. You pay 50 percent. We kick off.
                    </span>
                  </div>
                  <div className="step">
                    <span className="w">Day 26</span>
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
            Built for <span className="italic">paper,</span>{" "}
            <span className="amber">sweat, & family.</span>
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
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
              <a href={CALENDLY_URL} target="_blank" rel="noreferrer">
                Book a call
              </a>
              <a href="/intake">Intake form</a>
              <a href={`mailto:${EMAIL}`}>Email</a>
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
