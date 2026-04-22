"use client";

import { useEffect, useState } from "react";

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
            <div className="logo">ZW</div>
            <div>
              <div className="m1">Zach Weiss</div>
              <div className="m2">Custom software · Solo studio</div>
            </div>
          </div>
          <div className="navlinks">
            <a href="#services">Services</a>
            <a href="#work">Work</a>
            <a href="#compare">Why now</a>
            <a href="#process">Process</a>
          </div>
          <a href="#contact" className="nav-cta">
            Let&apos;s Talk <span className="arrow">→</span>
          </a>
        </div>
      </nav>

      {/* HERO */}
      <header className="hero">
        <div className="wrap">
          <div className="hero-grid">
            <div>
              <div className="status-pill">
                <span className="dot"></span>Accepting 2 projects · Q3 2026
              </div>
              <h1>
                <span className="line">Custom</span>
                <span className="line">
                  <span className="chip amber">Software</span>
                </span>
                <span className="line">
                  <span>That</span> <span className="amber-word">Replaces</span>
                </span>
                <span className="line">
                  <span className="script">your</span>{" "}
                  <span className="chip outline">Tool Stack</span>.
                </span>
              </h1>
              <p className="lede">
                One builder. One platform. For owner-operated businesses still
                running on <b>paper, spreadsheets, and group chats</b> — I
                design, build, and ship{" "}
                <span className="u">the system your team actually uses</span>.
              </p>
              <div className="cta">
                <a href="#contact" className="btn primary">
                  Book a Discovery Call →
                </a>
                <a href="#services" className="btn ghost">
                  View Services
                </a>
              </div>
            </div>
            <div className="portrait">
              <span className="placeholder-tag">
                ◇ PORTRAIT · swap in real photo
              </span>
              <div className="silhouette"></div>
              <div className="name-plate">
                <div className="n">Zach Weiss</div>
                <div className="s">Est. 2023</div>
              </div>
            </div>
          </div>

          <div className="stats">
            <div className="stat">
              <div className="v">
                <span className="amber">4</span> platforms
              </div>
              <div className="l">Shipped & running real operations</div>
            </div>
            <div className="stat">
              <div className="v">
                40<span className="amber">+</span>
              </div>
              <div className="l">Customers routed, every week</div>
            </div>
            <div className="stat">
              <div className="v">
                24/<span className="amber">7</span>
              </div>
              <div className="l">Automations running in background</div>
            </div>
            <div className="stat">
              <div className="v">
                1<span className="amber">×</span>
              </div>
              <div className="l">Builder, end to end</div>
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
              Four things. <span className="italic">One</span> platform,{" "}
              <span className="amber">wired together</span>.
            </h2>
            <p>
              Not a stack of SaaS seats. Not a dashboard on top of a
              spreadsheet. The system your team opens at 7 a.m. — designed,
              built, and handed over.
            </p>
          </div>
          <div className="services reveal">
            <article className="service">
              <div className="num">S.01 / Primary system</div>
              <div className="chevron">→</div>
              <div>
                <h3>
                  Custom internal <span className="italic">platforms</span>
                </h3>
                <p>
                  Customers, orders, payments, scheduling, inventory, dispatch.
                  One login. One source of truth.
                </p>
              </div>
            </article>
            <article className="service">
              <div className="num">S.02 / Background</div>
              <div className="chevron">→</div>
              <div>
                <h3>
                  Workflow <span className="italic">automation</span>
                </h3>
                <p>
                  Invoices, lead routing, reminders, reports. The repetitive
                  work runs at night.
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
                  Specialist agents for research, drafting, data extraction.
                  Not a chatbot — a purpose-built operator.
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
                  CRM, accounting, email, internal tools wired into one
                  pipeline. Nothing falls through.
                </p>
              </div>
            </article>
            <article className="service">
              <div className="num">S.05 / Operator UX</div>
              <div className="chevron">→</div>
              <div>
                <h3>
                  Driver & field <span className="italic">apps</span>
                </h3>
                <p>
                  Built for the phone in the warehouse, the truck, the
                  kitchen. Fast, offline-tolerant, one-thumb.
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
                  Code, data, accounts — yours. I stay on retainer if you want
                  me; I don&apos;t hold anything hostage if you don&apos;t.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* WORK GALLERY */}
      <section id="work" className="section" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <div className="eyebrow">The work</div>
            <h2>
              Built <span className="italic">with purpose</span>. Quality at
              every touchpoint.
            </h2>
            <p>
              From the admin screen the owner uses every morning to the driver
              app running on a cracked phone in a delivery truck — it all has
              to work, end to end.
            </p>
          </div>

          <div className="gallery reveal">
            <div className="tile a">
              <div className="art art-dashboard"></div>
              <div className="label">
                <div className="t">Ops dashboard · Dagim</div>
                <div className="k">Case 001</div>
              </div>
            </div>
            <div className="tile b">
              <div className="art art-flow">
                <svg viewBox="0 0 200 120" fill="none">
                  <rect
                    x="10"
                    y="20"
                    width="40"
                    height="24"
                    rx="6"
                    stroke="#FF8A3D"
                    strokeWidth="1.5"
                  />
                  <rect
                    x="80"
                    y="10"
                    width="40"
                    height="24"
                    rx="6"
                    stroke="#B8B3A8"
                    strokeWidth="1.5"
                  />
                  <rect
                    x="80"
                    y="50"
                    width="40"
                    height="24"
                    rx="6"
                    stroke="#B8B3A8"
                    strokeWidth="1.5"
                  />
                  <rect
                    x="80"
                    y="90"
                    width="40"
                    height="24"
                    rx="6"
                    stroke="#B8B3A8"
                    strokeWidth="1.5"
                  />
                  <rect
                    x="150"
                    y="50"
                    width="40"
                    height="24"
                    rx="6"
                    stroke="#FF8A3D"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M50 32 L80 22 M50 32 L80 62 M50 32 L80 102 M120 22 L150 62 M120 62 L150 62 M120 102 L150 62"
                    stroke="#6B6860"
                    strokeWidth="1"
                  />
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
                <svg
                  viewBox="0 0 120 80"
                  style={{ width: "70%" }}
                  fill="none"
                >
                  <rect x="6" y="10" width="70" height="26" rx="13" fill="#FF8A3D" />
                  <text
                    x="18"
                    y="27"
                    fill="#1A0B04"
                    fontFamily="Inter"
                    fontSize="11"
                    fontWeight="700"
                  >
                    can&apos;t make Sun
                  </text>
                  <rect x="44" y="44" width="70" height="26" rx="13" fill="#2A2A2D" />
                  <text
                    x="52"
                    y="61"
                    fill="#F5F2EC"
                    fontFamily="Inter"
                    fontSize="11"
                    fontWeight="500"
                  >
                    got it — removed ✓
                  </text>
                </svg>
              </div>
              <div className="label">
                <div className="t">SMS-first · J/Goals</div>
                <div className="k">Case 003</div>
              </div>
            </div>
            <div className="tile e">
              <div className="art art-driver">
                <svg viewBox="0 0 200 80" fill="none">
                  <path
                    d="M10 60 Q60 20 110 50 T190 40"
                    stroke="#FF8A3D"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
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
                  <rect
                    x="20"
                    y="30"
                    width="160"
                    height="180"
                    rx="16"
                    stroke="#2E2E2B"
                    strokeWidth="1.5"
                    fill="#111113"
                  />
                  <rect x="32" y="46" width="100" height="10" rx="5" fill="#2E2E2B" />
                  <rect x="32" y="66" width="80" height="10" rx="5" fill="#2E2E2B" />
                  <rect
                    x="32"
                    y="92"
                    width="136"
                    height="34"
                    rx="8"
                    fill="#1A0F20"
                    stroke="#FF8A3D"
                    strokeWidth="1"
                  />
                  <text
                    x="42"
                    y="112"
                    fill="#FF8A3D"
                    fontFamily="JetBrains Mono"
                    fontSize="9"
                  >
                    → claude extracting...
                  </text>
                  <rect x="32" y="138" width="136" height="10" rx="5" fill="#22221F" />
                  <rect x="32" y="156" width="110" height="10" rx="5" fill="#22221F" />
                  <rect x="32" y="174" width="120" height="10" rx="5" fill="#22221F" />
                </svg>
              </div>
              <div className="label">
                <div className="t">AI agents · HaloPrime</div>
                <div className="k">Case 004</div>
              </div>
            </div>
            <div className="tile g">
              <div className="art art-reel">
                <svg viewBox="0 0 200 100" fill="none">
                  <rect
                    x="40"
                    y="10"
                    width="48"
                    height="80"
                    rx="8"
                    fill="#2A0A14"
                    stroke="#3A1020"
                    strokeWidth="1"
                  />
                  <polygon points="58,36 58,64 80,50" fill="#FF8A3D" />
                  <rect
                    x="100"
                    y="10"
                    width="48"
                    height="80"
                    rx="8"
                    fill="#2A0A14"
                    stroke="#3A1020"
                    strokeWidth="1"
                  />
                  <polygon points="118,36 118,64 140,50" fill="#FF8A3D" />
                </svg>
              </div>
              <div className="label">
                <div className="t">Parent comms · BP/Soccer</div>
                <div className="k">Case 002</div>
              </div>
            </div>
            <div className="tile h">
              <div className="art art-ads">
                <svg viewBox="0 0 200 80" fill="none">
                  <rect
                    x="14"
                    y="14"
                    width="172"
                    height="52"
                    rx="8"
                    stroke="#6BD18A"
                    strokeWidth="1.5"
                    fill="#0A1A18"
                  />
                  <rect x="24" y="24" width="40" height="32" rx="4" fill="#143028" />
                  <rect x="74" y="24" width="80" height="8" rx="4" fill="#6BD18A" />
                  <rect x="74" y="40" width="110" height="6" rx="3" fill="#2E3B36" />
                  <rect x="74" y="52" width="60" height="6" rx="3" fill="#2E3B36" />
                </svg>
              </div>
              <div className="label">
                <div className="t">Reconciliation · automated</div>
                <div className="k">Invoices</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* YESTERDAY VS TODAY */}
      <section id="compare" className="section">
        <div className="wrap">
          <div className="sec-head reveal">
            <div className="eyebrow">The future is now</div>
            <h2>
              Adapt — <span className="italic">or</span> get left{" "}
              <span className="amber">behind</span>.
            </h2>
            <p>
              Owner-operated businesses winning today aren&apos;t working
              harder. They&apos;re shipping one custom tool that does what ten
              SaaS seats used to — and getting leverage the laggards can&apos;t
              match.
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
                  <span>200 paper slips a day running the warehouse</span>
                </li>
                <li>
                  <span className="icon">×</span>
                  <span>Five WhatsApp threads per customer</span>
                </li>
                <li>
                  <span className="icon">×</span>
                  <span>Whiteboard route planning at 5 a.m.</span>
                </li>
                <li>
                  <span className="icon">×</span>
                  <span>Invoices typed by hand, one by one</span>
                </li>
                <li>
                  <span className="icon">×</span>
                  <span>Scaling means hiring more admin staff</span>
                </li>
                <li>
                  <span className="icon">×</span>
                  <span>A SaaS seat for every job, none of them talk</span>
                </li>
              </ul>
            </div>
            <div className="col new">
              <h3>
                The <span className="italic amber">custom</span> edge
              </h3>
              <ul>
                <li>
                  <span className="icon">◆</span>
                  <span>One screen for orders, picking, and dispatch</span>
                </li>
                <li>
                  <span className="icon">◆</span>
                  <span>Every conversation logged against one account</span>
                </li>
                <li>
                  <span className="icon">◆</span>
                  <span>Optimized routes pushed to the driver app</span>
                </li>
                <li>
                  <span className="icon">◆</span>
                  <span>Invoices and reconciliation running overnight</span>
                </li>
                <li>
                  <span className="icon">◆</span>
                  <span>Scaling means adding a seat, not a salary</span>
                </li>
                <li>
                  <span className="icon">◆</span>
                  <span>One login. One source of truth. Yours.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CASEBOOK */}
      <section className="section" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <div className="eyebrow">Casebook</div>
            <h2>
              Built. <span className="italic">Deployed.</span> In use.
            </h2>
          </div>
          <div className="cases reveal">
            <article className="case wide">
              <div className="tag">
                <span className="amber">◆ Case 001</span> · Flagship · In
                service daily
              </div>
              <div className="glyph">
                Dag<span className="italic">i</span>m.
              </div>
              <h3>
                Full ops platform: driver app, CRM, inventory,{" "}
                <span className="amber">route optimization</span> across 40
                customers in 4 states.
              </h3>
              <p>
                Replaced paper slips, whiteboards, and five WhatsApp threads
                per customer with one platform. Orders come in on a phone.
                Routes push to the driver. Invoices send themselves.
              </p>
              <div className="stack">
                <span>Next.js</span>
                <span>Supabase</span>
                <span>Prisma</span>
                <span>n8n</span>
                <span>Route opt.</span>
                <span>Driver app</span>
              </div>
            </article>
            <article className="case half">
              <div className="tag">Case 002 · 2025</div>
              <div className="glyph">
                BP<span className="italic">/</span>Soccer
              </div>
              <h3>
                Admin panel replacing <span className="amber">spreadsheets</span>{" "}
                and WhatsApp for a youth soccer league.
              </h3>
              <p>
                Rosters, schedules, payments, parent comms. Coaches stopped
                chasing forms.
              </p>
              <div className="stack">
                <span>Next.js</span>
                <span>Supabase</span>
                <span>Stripe</span>
              </div>
            </article>
            <article className="case half">
              <div className="tag">Case 003 · 2025</div>
              <div className="glyph">
                J<span className="italic">/</span>Goals
              </div>
              <h3>
                Roster and cancellation management,{" "}
                <span className="amber">SMS-first</span>.
              </h3>
              <p>
                Players text in, the system handles the rest. Last-minute
                cancellations no longer blow up anyone&apos;s phone at 6 a.m.
              </p>
              <div className="stack">
                <span>Next.js</span>
                <span>Twilio</span>
                <span>Supabase</span>
              </div>
            </article>
            <article className="case third">
              <div className="tag">Case 004 · 2026</div>
              <div className="glyph">
                Halo<span className="italic">P.</span>
              </div>
              <h3>
                AI <span className="amber">automation</span> and internal
                tooling.
              </h3>
              <p>
                Custom agents doing work a junior hire used to. Overnight now.
              </p>
              <div className="stack">
                <span>Claude</span>
                <span>n8n</span>
              </div>
            </article>
            <article className="case third">
              <div className="tag">Case 005 · open</div>
              <div className="glyph" style={{ color: "var(--mute)" }}>
                Your<span className="italic amber">/</span>shop
              </div>
              <h3>
                Your business, <span className="amber">wired together</span>.
              </h3>
              <p>30-minute call — no deck, no pitch. If it&apos;s a fit, we scope.</p>
              <div className="stack">
                <span>Q3 2026</span>
                <span>2 slots</span>
              </div>
            </article>
            <article className="case third">
              <div className="tag">Industries</div>
              <div className="glyph">
                <span className="amber">04</span>
              </div>
              <h3>Verticals shipped.</h3>
              <p>Food distribution · Youth sports · Field services · Fintech ops.</p>
              <div className="stack">
                <span>Owner-operated</span>
                <span>$1M–$20M</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* METHOD */}
      <section id="process" className="section">
        <div className="wrap">
          <div className="sec-head reveal">
            <div className="eyebrow">Method · § 05</div>
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
                    Half a day on-site or on a call. Watch the real workflow.
                    Meet the person who&apos;s been doing it in their head for
                    ten years.
                  </div>
                </div>
                <div className="w">Week 01</div>
              </div>
              <div className="phase">
                <div className="p">Phase II</div>
                <div>
                  <div className="t">
                    Map the <span className="italic">real</span> workflow.
                  </div>
                  <div className="d">
                    Not the one in the org chart. The actual chain of events
                    from order → cash.
                  </div>
                </div>
                <div className="w">Week 01–02</div>
              </div>
              <div className="phase">
                <div className="p">Phase III</div>
                <div>
                  <div className="t">
                    Ship a working <span className="italic">v1</span>.
                  </div>
                  <div className="d">
                    Real users, real data, the one workflow that hurts most.
                    Prove it works before adding more.
                  </div>
                </div>
                <div className="w">Week 04–08</div>
              </div>
              <div className="phase">
                <div className="p">Phase IV</div>
                <div>
                  <div className="t">
                    Wire in the <span className="italic">rest</span>.
                  </div>
                  <div className="d">
                    Automations, integrations, AI agents — added as the team
                    grows into them.
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
                    You own the code, the data, the accounts. I stay on
                    retainer if you want me; I don&apos;t hold anything hostage
                    if you don&apos;t.
                  </div>
                </div>
                <div className="w">Yours</div>
              </div>
            </div>
            <aside className="method-card reveal">
              <div className="qmark">&ldquo;</div>
              <blockquote>
                I don&apos;t sell seats. I build the one tool the business
                actually runs on — and{" "}
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
                <span className="who">— Zach Weiss</span>
                <span className="role">Studio of record</span>
              </div>
            </aside>
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
                Ready to grow <span className="italic">without</span>{" "}
                <span className="amber">hiring</span>?
              </h2>
              <p>
                Book a free discovery call. 30 minutes. No deck, no pitch. I
                ask questions about how the business actually runs today. If
                it&apos;s a fit, we scope. If it isn&apos;t, I&apos;ll point
                you somewhere that is.
              </p>
            </div>
            <div className="c-body">
              <form
                className="c-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <div className="field">
                  <label>Name</label>
                  <input placeholder="Who's writing" />
                </div>
                <div className="field">
                  <label>Business</label>
                  <input placeholder="Company & what it does" />
                </div>
                <div className="field">
                  <label>Email</label>
                  <input type="email" placeholder="you@yourbusiness.com" />
                </div>
                <div className="field">
                  <label>Focus</label>
                  <select defaultValue="Orders / dispatch / logistics">
                    <option>Orders / dispatch / logistics</option>
                    <option>Scheduling & rosters</option>
                    <option>Invoicing & payments</option>
                    <option>Lead routing & CRM</option>
                    <option>AI / automation</option>
                    <option>All of the above</option>
                  </select>
                </div>
                <div className="field start">
                  <label>Situation</label>
                  <textarea placeholder="How does the business actually run today? Paper? Spreadsheets? A group chat? The more specific, the better." />
                </div>
                <div className="c-submit">
                  <button type="submit" className="btn primary">
                    Book Discovery Call →
                  </button>
                  <a
                    href="mailto:zachweissbusiness@gmail.com"
                    className="btn ghost"
                  >
                    Or email directly
                  </a>
                </div>
                {sent && (
                  <div
                    style={{
                      marginTop: 24,
                      padding: "14px 18px",
                      background: "rgba(107,209,138,.1)",
                      border: "1px solid rgba(107,209,138,.3)",
                      borderRadius: 12,
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      color: "var(--green)",
                      fontFamily: '"JetBrains Mono", monospace',
                      fontSize: 13,
                    }}
                  >
                    ◆ Received. I&apos;ll reply within 24 hours. — Zach
                  </div>
                )}
              </form>
              <aside className="c-aside">
                <h4>
                  What <span className="italic">happens</span> next.
                </h4>
                <div className="steps">
                  <div className="step">
                    <span className="w">Day 00</span>
                    <span>You submit this form. I read it the same day.</span>
                  </div>
                  <div className="step">
                    <span className="w">Day 01–03</span>
                    <span>
                      Short reply: either a 30-min call booking, or a pointer
                      if I&apos;m not the right fit.
                    </span>
                  </div>
                  <div className="step">
                    <span className="w">Day 04–07</span>
                    <span>
                      Intake call. No deck. No pitch. Questions about the real
                      workflow.
                    </span>
                  </div>
                  <div className="step">
                    <span className="w">Day 08–14</span>
                    <span>Written scope & fixed price. You decide.</span>
                  </div>
                  <div className="step">
                    <span className="w">Week 04–08</span>
                    <span>First login. Real users. Real data.</span>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="wrap">
          <div className="foot-big">
            <span className="italic">Let&apos;s</span> build{" "}
            <span className="amber">something</span>.
          </div>
          <div className="foot-cols">
            <div>
              <h5>Zach Weiss</h5>
              <p className="mail">zachweissbusiness@gmail.com</p>
              <p>Independent studio · Brooklyn, NY · Remote</p>
              <p style={{ marginTop: 16 }}>
                Custom software for owner-operated businesses $1M — $20M /
                year.
              </p>
            </div>
            <div>
              <h5>Services</h5>
              <a>Custom platforms</a>
              <a>Automation</a>
              <a>AI agents</a>
              <a>Integration</a>
            </div>
            <div>
              <h5>Stack</h5>
              <a>Next.js</a>
              <a>Supabase · Prisma</a>
              <a>n8n · Claude</a>
              <a>Stripe · Twilio</a>
            </div>
            <div>
              <h5>Elsewhere</h5>
              <a>LinkedIn</a>
              <a>GitHub</a>
              <a>X / Twitter</a>
              <a>Book a call</a>
            </div>
          </div>
          <div className="colophon">
            <span>© {new Date().getFullYear()} Zach Weiss · Custom software studio</span>
            <span>Set in Inter · Instrument Serif · JetBrains Mono</span>
            <span>Measured · Cut · Delivered</span>
          </div>
        </div>
      </footer>
    </>
  );
}
