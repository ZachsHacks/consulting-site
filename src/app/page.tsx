"use client";

const CALENDLY_URL = "https://calendly.com/zsweiss/chat";

const clientWork = [
  {
    name: "BP Soccer — Admin Platform",
    client: "David Gluck",
    description:
      "David was running a youth soccer league out of spreadsheets and group chats. I built a full admin panel that handles families, kids, sessions, payments, and driver logistics all in one place. The league now runs itself.",
    tags: ["Custom Web App", "Admin Dashboard", "Payments"],
    image: "/clients/davidgluck.png",
  },
  {
    name: "HaloPrime — AI Operations",
    client: "Ryan Danielson",
    description:
      "Ryan's team was spending hours on tasks that could be automated. I built AI-powered workflows and internal dashboards that handle the repetitive work, so his team focuses on what actually matters.",
    tags: ["Workflow Automation", "AI Agents", "Internal Tools"],
  },
  {
    name: "Accounting Platform",
    client: "Jacob",
    description:
      "Custom accounting software designed around how this firm actually operates. Replacing a patchwork of tools with one clean, purpose-built system.",
    tags: ["Custom Web App", "Finance", "In Progress"],
    inProgress: true,
  },
];

const steps = [
  {
    number: "1",
    title: "Tell me your problem",
    body: "We get on a free 30-minute call. You walk me through your workflow and what is slowing you down. No tech knowledge required. I do the listening.",
  },
  {
    number: "2",
    title: "I design the solution",
    body: "I map out exactly what needs to be built and show you before writing a single line of code. You stay in the loop the whole way, no surprises.",
  },
  {
    number: "3",
    title: "You get a working system",
    body: "I deliver something real and deployed. Not a prototype, not a demo. A system your team can use from day one.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <ClientSpotlight />
      <HowItWorks />
      <ClientWork />
      <CTABlock />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
      <div className="max-w-5xl mx-auto px-6 py-3 flex justify-between items-center">
        <a href="/">
          <img src="/logo.png" alt="Fitted Software Consulting" className="h-10 w-auto" />
        </a>
        <div className="flex items-center gap-6">
          <a
            href="#work"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
          >
            Work
          </a>
          <a
            href="#how-it-works"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
          >
            How it works
          </a>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            Book a Free Call
          </a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="max-w-5xl mx-auto px-6 pt-20 pb-20">
      <p
        className="text-xs font-semibold text-primary uppercase tracking-widest mb-5"
      >
        Custom Software for Small Businesses
      </p>
      <h1
        className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.08] text-foreground mb-4"
        style={{ fontFamily: "var(--font-jakarta)" }}
      >
        Your business deserves
        <br />
        <span className="text-primary">software built for it.</span>
      </h1>
      <p
        className="text-xl sm:text-2xl font-medium text-muted-foreground mb-8"
        style={{ fontFamily: "var(--font-jakarta)" }}
      >
        Not the closest thing you could find.
      </p>
      <p className="text-base sm:text-lg text-foreground/70 leading-relaxed max-w-xl mb-10">
        I&apos;m Zach. I build <strong className="text-foreground font-semibold">custom apps, automations, and tools</strong> for
        small business owners who are tired of squeezing their operations into
        software that was never designed for them. You tell me the problem. I
        build the solution.
      </p>
      <div className="flex flex-wrap gap-4 items-center">
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary text-primary-foreground font-semibold px-7 py-3.5 rounded-lg text-base hover:opacity-90 transition-opacity"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          Book a Free Call
        </a>
        <a
          href="#work"
          className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
        >
          See client work
        </a>
      </div>

      <div className="mt-14 pt-10 border-t border-border flex flex-wrap gap-10">
        <div>
          <p
            className="text-3xl font-bold text-foreground"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Fitted
          </p>
          <p className="text-sm text-muted-foreground mt-0.5">Every build made to measure</p>
        </div>
        <div>
          <p
            className="text-3xl font-bold text-foreground"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            100%
          </p>
          <p className="text-sm text-muted-foreground mt-0.5">
            Deployed, running systems
          </p>
        </div>
        <div>
          <p
            className="text-3xl font-bold text-foreground"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            0
          </p>
          <p className="text-sm text-muted-foreground mt-0.5">
            Templates. Everything is custom.
          </p>
        </div>
      </div>
    </section>
  );
}

function ClientSpotlight() {
  return (
    <section className="bg-secondary border-y border-border py-20">
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-4">
          Real Results
        </p>
        <h2
          className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-3"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          Hear it from a client.
        </h2>
        <p className="text-base text-muted-foreground mb-8 max-w-xl leading-relaxed">
          David Gluck ran BP Soccer, a youth league in Brooklyn, out of
          spreadsheets and group chats. Here is what happened when we built him
          a real system.
        </p>
        <div className="rounded-xl overflow-hidden border border-border bg-background max-w-3xl">
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              src="https://share.descript.com/embed/2Njnpq2tMKW"
              className="absolute inset-0 w-full h-full"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        </div>
        <div className="mt-7 border-l-4 border-primary pl-5 max-w-2xl">
          <p className="text-base sm:text-lg text-foreground leading-relaxed italic mb-3">
            &ldquo;Zach built exactly what I needed. Not a template, not a
            workaround. The system fits our league perfectly.&rdquo;
          </p>
          <p className="text-sm font-semibold text-foreground">David Gluck</p>
          <p className="text-sm text-muted-foreground">BP Soccer, Brooklyn</p>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20">
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-4">
          The Process
        </p>
        <h2
          className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-3"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          Simple from start to finish.
        </h2>
        <p className="text-base text-muted-foreground mb-12 max-w-xl leading-relaxed">
          No tech jargon, no lengthy proposals. Here is how we go from problem
          to working software.
        </p>
        <div className="grid sm:grid-cols-3 gap-10">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col gap-4">
              <div
                className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold flex-shrink-0"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                {step.number}
              </div>
              <h3
                className="text-lg font-semibold text-foreground"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClientWork() {
  return (
    <section id="work" className="bg-secondary border-y border-border py-20">
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-4">
          Portfolio
        </p>
        <h2
          className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-3"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          Work I&apos;ve shipped.
        </h2>
        <p className="text-base text-muted-foreground mb-10 max-w-xl leading-relaxed">
          Every project is a real, deployed system. Not a slide deck.
        </p>
        <div className="flex flex-col gap-5">
          {clientWork.map((project) => (
            <div
              key={project.name}
              className={`bg-background rounded-xl border border-border overflow-hidden ${
                project.inProgress ? "opacity-75" : ""
              }`}
            >
              <div
                className={`grid ${
                  project.image ? "md:grid-cols-[280px_1fr]" : "grid-cols-1"
                }`}
              >
                {project.image && (
                  <div className="relative overflow-hidden border-b md:border-b-0 md:border-r border-border">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover object-top min-h-[180px]"
                    />
                  </div>
                )}
                <div className="p-7">
                  <p className="text-xs text-muted-foreground font-medium mb-2">
                    Client: {project.client}
                  </p>
                  <div className="flex items-center gap-3 mb-3">
                    <h3
                      className="text-lg font-semibold text-foreground"
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    >
                      {project.name}
                    </h3>
                    {project.inProgress && (
                      <span className="text-xs text-muted-foreground border border-border px-2.5 py-0.5 rounded-full">
                        In Progress
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags
                      .filter((t) => t !== "In Progress")
                      .map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABlock() {
  return (
    <section className="bg-foreground py-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-5">
          Ready to fix it?
        </p>
        <h2
          className="text-3xl sm:text-5xl font-bold text-background tracking-tight leading-tight mb-5"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          Let&apos;s build something
          <br />
          made for your business.
        </h2>
        <p className="text-base text-background/60 max-w-md mx-auto mb-9 leading-relaxed">
          Tell me what is slowing your team down. We will get on a free call and
          figure out what is possible. No pitch, no pressure.
        </p>
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-primary text-primary-foreground font-semibold px-9 py-4 rounded-lg text-base hover:opacity-90 transition-opacity"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          Book a Free Call
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="max-w-5xl mx-auto px-6 flex justify-between items-center text-sm text-muted-foreground">
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="Fitted Software Consulting" className="h-7 w-auto opacity-70" />
          <span>&copy; {new Date().getFullYear()} Fitted Software Consulting</span>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="mailto:zachweissbusiness@gmail.com"
            className="hover:text-foreground transition-colors"
          >
            zachweissbusiness@gmail.com
          </a>
          <span className="hidden sm:block">Brooklyn, NY</span>
        </div>
      </div>
    </footer>
  );
}
