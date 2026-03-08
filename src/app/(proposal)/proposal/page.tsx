// Tab 3 — Work With Me
// Proposal Builder: Asymmetric Split hero, Featured+Grid portfolio,
// Vertical Timeline process, Compact skills, Dark Panel CTA.
// Aesthetic: saas-modern / deep teal oklch(0.52 0.14 195)

import Link from "next/link";
import { ExternalLink, TrendingUp, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { APP_CONFIG } from "@/lib/config";
import { proposalData } from "@/data/proposal";

export const metadata = {
  title: "Work With Me | SecureRegistry Demo",
};

// ─── Inline component helpers (no "use client" needed) ────────────────────────

function PulsingDot({ className }: { className?: string }) {
  return (
    <span className={`relative inline-flex h-2 w-2 ${className ?? ""}`}>
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[color:var(--success)]/60 opacity-75" />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-[color:var(--success)]" />
    </span>
  );
}

function PulsingPrimaryDot() {
  return (
    <span className="relative inline-flex h-1.5 w-1.5">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/50 opacity-75" />
      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProposalPage() {
  const { hero, portfolioProjects, approachSteps, skillCategories, cta } =
    proposalData;

  const clientName = APP_CONFIG.clientName;
  const projectName = APP_CONFIG.projectName;

  // Featured project = first (Lead Intake CRM — strongest parallel)
  const featuredProject = portfolioProjects[0];
  const gridProjects = portfolioProjects.slice(1);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-5 py-10 md:px-8 space-y-14">

        {/* ── SECTION 1: Asymmetric Split Hero ──────────────────────────────── */}
        <section className="overflow-hidden rounded-lg border border-border/50">
          <div className="flex flex-col md:flex-row min-h-[260px]">

            {/* Left 65%: dark panel */}
            <div
              className="flex-[3] px-8 py-10 md:px-10 md:py-12 space-y-5 relative overflow-hidden"
              style={{
                background: "oklch(0.10 0.02 var(--primary-h))",
              }}
            >
              {/* Subtle radial glow in corner */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(ellipse at 10% 80%, oklch(0.52 0.14 195 / 0.15), transparent 60%)",
                }}
              />

              <div className="relative z-10 space-y-5">
                {/* Pulsing badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5"
                  style={{ background: "oklch(1 0 0 / 0.06)" }}>
                  <PulsingPrimaryDot />
                  <span className="font-mono text-xs tracking-wider text-white/65">
                    {hero.badge}
                  </span>
                </div>

                {/* Name + role */}
                <div className="space-y-1.5">
                  <p className="font-mono text-xs tracking-widest uppercase text-white/35">
                    {hero.role}
                  </p>
                  <h1 className="text-3xl md:text-4xl font-semibold leading-tight tracking-tight text-white">
                    {hero.name}
                  </h1>
                </div>

                {/* Value prop */}
                <p className="text-base text-white/65 leading-relaxed max-w-sm">
                  {hero.valueProp}
                </p>

                {/* Availability — bottom of dark panel */}
                <div className="flex items-center gap-2 pt-1">
                  <PulsingDot />
                  <span className="text-xs text-white/50">
                    {cta.availability}
                  </span>
                </div>
              </div>
            </div>

            {/* Right 35%: light stats sidebar */}
            <div
              className="flex-[1.4] px-6 py-8 md:px-8 md:py-10 flex flex-col justify-between border-t md:border-t-0 md:border-l border-border/40"
              style={{ background: "oklch(0.98 0.01 195)" }}
            >
              <div className="space-y-6">
                {hero.stats.map((stat) => (
                  <div key={stat.label} className="space-y-0.5">
                    <div className="text-2xl font-semibold tracking-tight text-foreground tabular-nums">
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground leading-snug">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Subtle teal accent line */}
              <div
                className="mt-6 h-0.5 w-12 rounded-full"
                style={{ background: "oklch(0.52 0.14 195)" }}
              />
            </div>
          </div>
        </section>

        {/* ── SECTION 2: Proof of Work — Featured + Grid ────────────────────── */}
        <section className="space-y-6">
          <div className="space-y-1">
            <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
              Proof of Work
            </p>
            <h2 className="text-xl font-semibold tracking-tight">
              Relevant Projects
            </h2>
            <p className="text-sm text-muted-foreground">
              Selected for{" "}
              {clientName ?? projectName} — domain match, feature overlap, exact outcomes.
            </p>
          </div>

          {/* Featured project — full width */}
          <div className="linear-card p-6 border-l-2 border-primary">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-primary uppercase tracking-wider">
                    Best Match
                  </span>
                </div>
                <h3 className="text-base font-semibold">{featuredProject.name}</h3>
              </div>
              {/* No URL for Lead Intake CRM — omit icon */}
            </div>

            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              {featuredProject.description}
            </p>

            {featuredProject.relevance && (
              <p className="text-xs font-medium text-primary mt-3">
                {featuredProject.relevance}
              </p>
            )}

            {/* Outcome badge */}
            <div
              className="flex items-start gap-2 rounded-md px-3 py-2 mt-4"
              style={{
                backgroundColor:
                  "color-mix(in oklch, var(--success) 8%, transparent)",
                border:
                  "1px solid color-mix(in oklch, var(--success) 18%, transparent)",
              }}
            >
              <TrendingUp className="h-3.5 w-3.5 mt-0.5 shrink-0 text-[color:var(--success)]" />
              <p className="text-xs font-medium text-[color:var(--success)]">
                {featuredProject.outcome}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-4">
              {featuredProject.tech.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="font-mono text-xs px-2 py-0.5 rounded-md bg-primary/8 text-primary border-0"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Grid: remaining 3 projects */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {gridProjects.map((project) => (
              <div
                key={project.id}
                className="linear-card p-5 space-y-3 flex flex-col"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold leading-snug">
                    {project.name}
                  </h3>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary shrink-0 transition-colors"
                      style={{ transition: "color var(--t-interactive)" }}
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                  {project.description}
                </p>

                {project.relevance && (
                  <p className="text-xs font-medium text-primary">
                    {project.relevance}
                  </p>
                )}

                {/* Outcome */}
                <div
                  className="flex items-start gap-1.5 rounded-md px-2.5 py-2"
                  style={{
                    backgroundColor:
                      "color-mix(in oklch, var(--success) 6%, transparent)",
                    border:
                      "1px solid color-mix(in oklch, var(--success) 15%, transparent)",
                  }}
                >
                  <TrendingUp className="h-3 w-3 mt-0.5 shrink-0 text-[color:var(--success)]" />
                  <p className="text-[11px] font-medium text-[color:var(--success)] leading-relaxed">
                    {project.outcome}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1">
                  {project.tech.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="font-mono text-[10px] px-1.5 py-0 rounded-md bg-primary/8 text-primary border-0"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 3: How I Work — Vertical Timeline ─────────────────────── */}
        <section className="space-y-6">
          <div className="space-y-1">
            <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
              Process
            </p>
            <h2 className="text-xl font-semibold tracking-tight">
              How I Build a Registry
            </h2>
            <p className="text-sm text-muted-foreground">
              These 5 phases match your project&apos;s actual risks — not a generic MVP checklist.
            </p>
          </div>

          <div className="space-y-0 max-w-2xl">
            {approachSteps.map((step, i) => (
              <div key={step.step} className="flex gap-5">
                {/* Timeline spine */}
                <div className="flex flex-col items-center">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-primary/20"
                    style={{ background: "oklch(0.52 0.14 195 / 0.08)" }}
                  >
                    <span className="font-mono text-xs font-semibold text-primary">
                      {step.step}
                    </span>
                  </div>
                  {i < approachSteps.length - 1 && (
                    <div
                      className="w-px flex-1 mt-2 mb-0"
                      style={{ background: "oklch(0.52 0.14 195 / 0.18)" }}
                    />
                  )}
                </div>

                {/* Content */}
                <div className={`pb-7 space-y-1 ${i === approachSteps.length - 1 ? "pb-0" : ""}`}>
                  <div className="flex items-baseline gap-3 pt-1">
                    <h3 className="text-sm font-semibold">{step.title}</h3>
                    <span className="font-mono text-xs text-muted-foreground">
                      {step.timeline}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Budget/timeline callout */}
          <div
            className="rounded-lg border border-border/50 px-5 py-4 max-w-2xl"
            style={{ background: "oklch(0.98 0.01 195)" }}
          >
            <div className="flex items-start gap-3">
              <div
                className="mt-0.5 w-1 h-10 rounded-full shrink-0"
                style={{ background: "oklch(0.52 0.14 195)" }}
              />
              <div>
                <p className="text-sm font-medium text-foreground">
                  Fits your budget and timeline
                </p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  20 days, comfortably within your $2k–$5k range and 30 hr/week cap.
                  Scope is fixed before work starts — no surprise overruns.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 4: Skills — Compact Grouped Layout ────────────────────── */}
        <section className="space-y-6">
          <div className="space-y-1">
            <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground">
              Skills
            </p>
            <h2 className="text-xl font-semibold tracking-tight">
              Relevant Tech
            </h2>
            <p className="text-sm text-muted-foreground">
              Filtered to what actually matters for this project.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skillCategories.map((category) => (
              <div
                key={category.label}
                className="rounded-lg border border-border/50 p-4"
                style={{ background: "oklch(0.99 0.005 195)" }}
              >
                <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-2.5">
                  {category.label}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center px-2.5 py-0.5 text-xs rounded-md border font-mono"
                      style={{
                        background: "oklch(0.52 0.14 195 / 0.06)",
                        borderColor: "oklch(0.52 0.14 195 / 0.20)",
                        color: "oklch(0.52 0.14 195)",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 5: CTA — Dark Panel ───────────────────────────────────── */}
        <section
          className="rounded-lg overflow-hidden"
          style={{ background: "oklch(0.10 0.02 var(--primary-h))" }}
        >
          {/* Radial glow */}
          <div
            className="relative overflow-hidden"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at 80% 20%, oklch(0.52 0.14 195 / 0.12), transparent 60%)",
            }}
          >
            <div className="px-8 py-10 md:px-12 md:py-14 text-center space-y-5">
              {/* Availability */}
              <div className="flex items-center justify-center gap-2">
                <PulsingDot />
                <span className="text-sm text-white/60">{cta.availability}</span>
              </div>

              {/* Headline */}
              <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
                {cta.headline}
              </h2>

              {/* Body */}
              <p className="text-base text-white/60 max-w-md mx-auto leading-relaxed">
                {cta.body}
              </p>

              {/* Action — text, not a dead link */}
              <p className="text-base font-semibold text-primary pt-1">
                {cta.action}
              </p>

              {/* Back link */}
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs text-white/35 hover:text-white/60 transition-colors mt-2"
                style={{ transition: "color var(--t-interactive)" }}
              >
                <ArrowLeft className="h-3 w-3" />
                Back to the demo
              </Link>
            </div>
          </div>

          {/* Signature strip */}
          <div
            className="px-8 py-4 md:px-12 border-t flex items-center justify-between"
            style={{ borderColor: "oklch(1 0 0 / 0.08)", background: "oklch(1 0 0 / 0.03)" }}
          >
            <span className="text-sm text-white/40">— Humam</span>
            <span className="font-mono text-xs text-white/25 hidden sm:block">
              {projectName}
            </span>
          </div>
        </section>

      </div>
    </div>
  );
}
