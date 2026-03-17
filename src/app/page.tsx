"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Custom Web Applications",
    description:
      "Every application I build is measured, cut, and stitched around your specific workflow — from backend automation to the interface your team uses daily.",
    badge: "Apps",
  },
  {
    title: "Workflow Automation",
    description:
      "I replace manual processes with intelligent workflows that run 24/7 — lead routing, invoice processing, data pipelines, and everything in between.",
    badge: "Automation",
  },
  {
    title: "AI Agent Development",
    description:
      "Custom AI agents that handle real work: research, drafting, data extraction, and decision support — purpose-built for your operations.",
    badge: "AI",
  },
  {
    title: "System Integration",
    description:
      "I connect your CRM, email, databases, and internal tools into one seamless pipeline so nothing falls through the cracks.",
    badge: "Integration",
  },
];

const clientWork = [
  {
    name: "BP Soccer — Admin Platform",
    client: "David Gluck",
    description:
      "A full-stack admin panel for managing a youth soccer league — families, kids, sessions, payments, and driver logistics, all in one place. Built to replace spreadsheets and group chats with a system that actually scales.",
    tags: ["Next.js", "Full-Stack", "Admin Dashboard"],
    image: "/clients/davidgluck.png",
  },
  {
    name: "HaloPrime — AI Operations",
    client: "Ryan Danielson",
    description:
      "Building AI-powered automation and internal tooling for HaloPrime's operations — from n8n workflows to custom dashboards that keep the team moving fast.",
    tags: ["n8n", "AI Automation", "Internal Tools"],
  },
  {
    name: "Accounting Platform",
    client: "Jacob",
    description:
      "Currently building a custom accounting software solution — streamlining financial workflows with a clean, purpose-built interface.",
    tags: ["In Progress", "Web App", "Finance"],
    inProgress: true,
  },
];

const personalProjects = [
  {
    name: "Personal Chief of Staff",
    description:
      "An AI assistant that knows my priorities, calendar, sleep data, and active projects — then tells me the single most important thing I should be doing right now. Integrates with Google Calendar, Oura Ring, and my task system. Built for how my brain actually works.",
    tags: ["Next.js", "AI Agent", "Personal OS"],
  },
  {
    name: "Job Agent",
    description:
      "A CLI tool that automates my entire job search — discovers listings, scores them against my qualifications, tailors my resume, and checks ATS compatibility. Fully hands-off.",
    tags: ["Python", "AI Automation", "CLI"],
  },
  {
    name: "Tailored Resume",
    description:
      "Paste a job description, get back a resume optimized for that specific role. Uses Claude to rewrite and restructure experience for maximum relevance.",
    tags: ["Next.js", "Claude AI", "Automation"],
  },
  {
    name: "LinkedIn Kondo",
    description:
      "A Chrome extension that brings order to LinkedIn DMs — label, snooze, and organize messages so no lead or conversation slips through the cracks.",
    tags: ["Chrome Extension", "Productivity", "Sales"],
  },
  {
    name: "Shiur Transcriber",
    description:
      "A web app that transcribes Torah lectures, generates clean PDFs, and emails them out — turning spoken wisdom into shareable written content.",
    tags: ["Next.js", "Transcription", "PDF Generation"],
  },
];

const testimonials: {
  quote: string;
  name: string;
  role: string;
  company: string;
}[] = [];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold tracking-tight">
              Zach Weiss
            </span>
            <span className="text-xs text-muted-foreground tracking-widest uppercase hidden sm:inline">
              Bespoke Software
            </span>
          </div>
          <div className="flex gap-4 items-center">
            <a
              href="#work"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
            >
              Work
            </a>
            <a
              href="#services"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
            >
              Services
            </a>
            <a
              href="mailto:zachweissbusiness@gmail.com"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            >
              Get in Touch
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-24 pb-20">
        <div className="max-w-2xl">
          <p className="text-sm tracking-widest uppercase text-muted-foreground mb-6">
            Bespoke Software Studio
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            Software that fits
            <br />
            <span className="text-muted-foreground">
              like it was made for you.
            </span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
            I&apos;m Zach — I build custom AI systems, automation, and web
            applications tailored to the way your business actually operates.
            No off-the-rack solutions. Every project is measured, cut, and
            delivered to fit your workflow perfectly.
          </p>
          <div className="flex gap-3">
            <a
              href="mailto:zachweissbusiness@gmail.com"
              className={cn(buttonVariants({ size: "lg" }))}
            >
              Book a Consultation
            </a>
            <a
              href="#work"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              See My Work
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6">
        <div className="border-t border-border/40" />
      </div>

      {/* About */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="max-w-2xl">
          <p className="text-sm tracking-widest uppercase text-muted-foreground mb-4">
            About
          </p>
          <h2 className="text-2xl font-semibold tracking-tight mb-6">
            The right fit makes all the difference.
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              I&apos;ve spent my career at the intersection of tech and sales —
              I know how to build things, but more importantly, I know how to
              build the <em className="text-foreground not-italic font-medium">right</em> things. The ones that actually move the
              needle for your business.
            </p>
            <p>
              My approach is simple: I sit down with you, understand your
              workflows inside and out, and then build a custom solution —
              whether that&apos;s an AI agent, an automated pipeline, or a full
              web app — that fits your team like a glove. Every client gets
              a bespoke application designed specifically around their needs.
              Not a template. Not a demo. A real, deployed product that&apos;s yours.
            </p>
            <p>
              I work with n8n for workflow automation, modern AI models for
              intelligent agents, and Next.js for clean, fast web apps. But the
              tech is just the fabric — what I really do is make it fit.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6">
        <div className="border-t border-border/40" />
      </div>

      {/* Client Interview */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <p className="text-sm tracking-widest uppercase text-muted-foreground mb-4">
          Client Spotlight
        </p>
        <h2 className="text-2xl font-semibold tracking-tight mb-2">
          Hear it from a client.
        </h2>
        <p className="text-muted-foreground mb-8">
          A conversation with David Gluck about building the BP Soccer admin platform.
        </p>
        <div className="rounded-lg overflow-hidden border border-border/60 bg-card/50">
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              src="https://share.descript.com/embed/2Njnpq2tMKW"
              className="absolute inset-0 w-full h-full"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6">
        <div className="border-t border-border/40" />
      </div>

      {/* Client Work */}
      <section id="work" className="max-w-5xl mx-auto px-6 py-20">
        <p className="text-sm tracking-widest uppercase text-muted-foreground mb-4">
          Portfolio
        </p>
        <h2 className="text-2xl font-semibold tracking-tight mb-2">
          Client Work
        </h2>
        <p className="text-muted-foreground mb-10">
          Every engagement delivers a deployed, running system — not a slide deck.
        </p>
        <div className="grid gap-6">
          {clientWork.map((project) => (
            <Card
              key={project.name}
              className={cn(
                "bg-card/50 border-border/60 hover:border-border transition-colors overflow-hidden",
                project.inProgress && "opacity-80"
              )}
            >
              <div className={cn("grid", project.image ? "md:grid-cols-2" : "grid-cols-1")}>
                {project.image && (
                  <div className="relative aspect-video md:aspect-auto overflow-hidden border-b md:border-b-0 md:border-r border-border/40">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                )}
                <div>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-1">
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                      {project.inProgress && (
                        <Badge variant="outline" className="text-xs">
                          In Progress
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Client: {project.client}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription className="text-sm leading-relaxed">
                      {project.description}
                    </CardDescription>
                    <div className="flex flex-wrap gap-2">
                      {project.tags
                        .filter((t) => t !== "In Progress")
                        .map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16">
          <p className="text-sm tracking-widest uppercase text-muted-foreground mb-4">
            Personal Lab
          </p>
          <h3 className="text-xl font-semibold tracking-tight mb-2">
            Things I Build for Myself
          </h3>
          <p className="text-muted-foreground mb-10">
            If I hit a problem, I build the solution. These projects keep my
            skills sharp and my life running smoothly.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {personalProjects.map((project) => (
              <Card
                key={project.name}
                className="bg-card/50 border-border/60 hover:border-border transition-colors"
              >
                <CardHeader>
                  <CardTitle className="text-base">{project.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-sm leading-relaxed">
                    {project.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6">
        <div className="border-t border-border/40" />
      </div>

      {/* Services */}
      <section id="services" className="max-w-5xl mx-auto px-6 py-20">
        <p className="text-sm tracking-widest uppercase text-muted-foreground mb-4">
          Services
        </p>
        <h2 className="text-2xl font-semibold tracking-tight mb-2">
          What I Build
        </h2>
        <p className="text-muted-foreground mb-10">
          Bespoke solutions, delivered and deployed.
        </p>
        <div className="grid sm:grid-cols-2 gap-6">
          {services.map((service) => (
            <Card
              key={service.title}
              className="bg-card/50 border-border/60 hover:border-border transition-colors"
            >
              <CardHeader>
                <Badge variant="outline" className="w-fit mb-2 text-xs tracking-wider uppercase">
                  {service.badge}
                </Badge>
                <CardTitle className="text-lg">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <>
          <div className="max-w-5xl mx-auto px-6">
            <div className="border-t border-border/40" />
          </div>
          <section
            id="testimonials"
            className="max-w-5xl mx-auto px-6 py-20"
          >
            <p className="text-sm tracking-widest uppercase text-muted-foreground mb-4">
              Testimonials
            </p>
            <h2 className="text-2xl font-semibold tracking-tight mb-10">
              What Clients Say
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {testimonials.map((t, i) => (
                <Card key={i} className="bg-card/50 border-border/60">
                  <CardContent className="pt-6">
                    <p className="text-sm leading-relaxed mb-4 italic">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div>
                      <p className="text-sm font-medium">{t.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {t.role}, {t.company}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </>
      )}

      <div className="max-w-5xl mx-auto px-6">
        <div className="border-t border-border/40" />
      </div>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <Card className="bg-primary text-primary-foreground border-0">
          <CardContent className="py-12 px-8 text-center">
            <h2 className="text-2xl font-semibold tracking-tight mb-3">
              Let&apos;s build something that fits.
            </h2>
            <p className="text-primary-foreground/70 mb-6 max-w-md mx-auto">
              Tell me what&apos;s slowing your team down and I&apos;ll show you
              what&apos;s possible. No fluff, no sales pitch — just a
              conversation about your business.
            </p>
            <a
              href="mailto:zachweissbusiness@gmail.com"
              className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}
            >
              zachweissbusiness@gmail.com
            </a>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8">
        <div className="max-w-5xl mx-auto px-6 flex justify-between items-center text-sm text-muted-foreground">
          <span>&copy; {new Date().getFullYear()} Zach Weiss</span>
          <span className="tracking-widest uppercase text-xs">Brooklyn, NY</span>
        </div>
      </footer>
    </div>
  );
}
