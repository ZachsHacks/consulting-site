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
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Custom Web Apps",
    description:
      "I don't do cookie-cutter. Every app I build is designed around your specific workflow — from the backend automation to the UI your team actually uses.",
    badge: "Apps",
  },
  {
    title: "Workflow Automation",
    description:
      "I replace your manual processes with intelligent workflows that run 24/7 — lead routing, invoice processing, data pipelines, you name it.",
    badge: "n8n",
  },
  {
    title: "AI Agent Development",
    description:
      "Custom AI agents that handle real work: research, drafting, data extraction, and decision support — not just chatbot demos.",
    badge: "AI Agents",
  },
  {
    title: "System Integration",
    description:
      "I connect your CRM, email, databases, and internal tools into one seamless automated pipeline so nothing falls through the cracks.",
    badge: "Integration",
  },
];

const clientWork = [
  {
    name: "HaloPrime",
    description:
      "Building AI-powered automation and internal tooling for HaloPrime's operations — from n8n workflows to custom dashboards that keep the team moving fast.",
    tags: ["n8n", "AI Automation", "Internal Tools"],
  },
  {
    name: "Made in Heaven Mezuzahs",
    description:
      "Built a beautiful gallery site and admin system for my mom's handmade mezuzah business — proving that even small, personal businesses deserve great software.",
    tags: ["Web App", "E-commerce", "Custom Build"],
  },
];

const personalProjects = [
  {
    name: "Personal Chief of Staff",
    description:
      "An AI assistant that knows my priorities, calendar, and projects — and tells me the single most important thing I should be doing right now. Built for how my brain actually works.",
    tags: ["Next.js", "AI Agent", "Productivity"],
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
      "Paste a job description, get back a resume optimized for that specific role. Uses Claude to rewrite and restructure my experience for maximum relevance.",
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
}[] = [
  // Testimonials will be added here as they come in
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-lg font-semibold tracking-tight">
            Zach Weiss
          </span>
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
              href="mailto:zach@zachshacks.com"
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
          <Badge variant="secondary" className="mb-6">
            AI & Automation Consulting
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
            I build AI systems
            <br />
            <span className="text-muted-foreground">
              tailored to your business.
            </span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
            Hey, I&apos;m Zach. I&apos;m an AI consultant based in Brooklyn who
            helps businesses automate their operations and build custom apps that
            actually fit how they work. No templates, no one-size-fits-all — I
            learn your business, then I build the thing you actually need.
          </p>
          <div className="flex gap-3">
            <a
              href="mailto:zach@zachshacks.com"
              className={cn(buttonVariants({ size: "lg" }))}
            >
              Let&apos;s Talk
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

      <Separator className="max-w-5xl mx-auto" />

      {/* About */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            A bit about me
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              I&apos;ve spent my career at the intersection of tech and sales —
              I know how to build things, but more importantly, I know how to
              build the <em>right</em> things. The ones that actually move the
              needle for your business.
            </p>
            <p>
              My approach is simple: I sit down with you, understand your
              workflows inside and out, and then build a custom solution —
              whether that&apos;s an AI agent, an automated pipeline, or a full
              web app — that fits your team like a glove. Every client I work
              with gets a custom-tailored application designed specifically
              around their needs. Not a template. Not a demo. A real, deployed
              product that&apos;s yours.
            </p>
            <p>
              I work with n8n for workflow automation, modern AI models for
              intelligent agents, and Next.js for clean, fast web apps. But the
              tech is just the tool — what I really do is solve problems.
            </p>
          </div>
        </div>
      </section>

      <Separator className="max-w-5xl mx-auto" />

      {/* Work */}
      <section id="work" className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-2xl font-semibold tracking-tight mb-2">
          Client Work
        </h2>
        <p className="text-muted-foreground mb-10">
          Custom-built solutions for real businesses.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {clientWork.map((project) => (
            <Card
              key={project.name}
              className="bg-card/50 border-border/60 hover:border-border transition-colors"
            >
              <CardHeader>
                <CardTitle className="text-lg">{project.name}</CardTitle>
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

        <h3 className="text-xl font-semibold tracking-tight mt-16 mb-2">
          Personal Projects
        </h3>
        <p className="text-muted-foreground mb-10">
          Things I build because I can&apos;t help myself. If I hit a problem, I
          build the solution.
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
      </section>

      <Separator className="max-w-5xl mx-auto" />

      {/* Services */}
      <section id="services" className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-2xl font-semibold tracking-tight mb-2">
          What I Build
        </h2>
        <p className="text-muted-foreground mb-10">
          Every engagement ends with a deployed, running system — not a slide
          deck.
        </p>
        <div className="grid sm:grid-cols-2 gap-6">
          {services.map((service) => (
            <Card
              key={service.title}
              className="bg-card/50 border-border/60 hover:border-border transition-colors"
            >
              <CardHeader>
                <Badge variant="outline" className="w-fit mb-2">
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

      {/* Testimonials — ready to populate */}
      {testimonials.length > 0 && (
        <>
          <Separator className="max-w-5xl mx-auto" />
          <section
            id="testimonials"
            className="max-w-5xl mx-auto px-6 py-20"
          >
            <h2 className="text-2xl font-semibold tracking-tight mb-2">
              What Clients Say
            </h2>
            <p className="text-muted-foreground mb-10">
              Real results from real engagements.
            </p>
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

      <Separator className="max-w-5xl mx-auto" />

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <Card className="bg-primary text-primary-foreground border-0">
          <CardContent className="py-12 px-8 text-center">
            <h2 className="text-2xl font-semibold tracking-tight mb-3">
              Let&apos;s build something together.
            </h2>
            <p className="text-primary-foreground/70 mb-6 max-w-md mx-auto">
              Tell me what&apos;s slowing your team down and I&apos;ll show you
              what&apos;s possible. No fluff, no sales pitch — just a
              conversation about your business.
            </p>
            <a
              href="mailto:zach@zachshacks.com"
              className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}
            >
              zach@zachshacks.com
            </a>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8">
        <div className="max-w-5xl mx-auto px-6 flex justify-between items-center text-sm text-muted-foreground">
          <span>&copy; {new Date().getFullYear()} Zach Weiss</span>
          <span>Brooklyn, NY</span>
        </div>
      </footer>
    </div>
  );
}
