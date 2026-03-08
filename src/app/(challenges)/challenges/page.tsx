import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { executiveSummary, challenges } from "@/data/challenges";
import { ChallengeCard } from "@/components/challenges/challenge-card";
import { DataSeparationDiagram } from "@/components/challenges/data-separation-diagram";
import { PaymentPipeline } from "@/components/challenges/payment-pipeline";
import { SearchComparison } from "@/components/challenges/search-comparison";

export default function ChallengesPage() {
  const vizComponents = [
    <DataSeparationDiagram key="data-sep" />,
    <PaymentPipeline key="payment" />,
    <SearchComparison key="search" />,
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-10 space-y-10">

        {/* Page heading */}
        <div className="space-y-1">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
            My Approach
          </p>
          <h1 className="text-2xl font-semibold tracking-tight">
            How I&apos;d Build This
          </h1>
        </div>

        {/* Executive summary — dark panel */}
        <div
          className="rounded-lg p-6 space-y-4"
          style={{ background: "var(--section-dark)" }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors duration-100"
          >
            <ArrowLeft className="w-3 h-3" />
            Back to the live demo
          </Link>

          <div className="space-y-3 pt-1">
            {/* Common approach */}
            <div className="space-y-1">
              <p className="text-[11px] font-mono text-white/30 uppercase tracking-widest">
                Common approach
              </p>
              <p className="text-sm text-white/55 leading-relaxed">
                {executiveSummary.commonApproach}
              </p>
            </div>

            <div className="border-t border-white/10" />

            {/* Different approach */}
            <div className="space-y-1">
              <p className="text-[11px] font-mono text-primary/70 uppercase tracking-widest">
                My approach
              </p>
              <p className="text-sm text-white/80 leading-relaxed">
                I separate public and private record shapes at the{" "}
                <span className="text-primary font-semibold">
                  {executiveSummary.accentWord}
                </span>
                , so private fields can never surface through the public API — not by
                misconfiguration, not by a missed access check, not ever.
              </p>
            </div>
          </div>
        </div>

        {/* Challenge cards */}
        <div className="space-y-6">
          {challenges.map((challenge, i) => (
            <ChallengeCard
              key={challenge.id}
              title={challenge.title}
              description={challenge.description}
              outcome={challenge.outcome}
              stepNumber={i + 1}
            >
              {vizComponents[i]}
            </ChallengeCard>
          ))}
        </div>

        {/* Transitional moment before CTA */}
        <div className="flex items-center gap-4">
          <div className="flex-1 border-t border-border/40" />
          <span className="text-xs font-mono text-muted-foreground/50 uppercase tracking-widest">
            Next
          </span>
          <div className="flex-1 border-t border-border/40" />
        </div>

        {/* CTA closer */}
        <div className="rounded-lg border border-border/60 bg-card p-6 space-y-4">
          <div className="space-y-1.5">
            <h3 className="text-base font-semibold">
              Want to discuss the approach?
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              These aren&apos;t hypotheticals — they&apos;re the actual decisions I&apos;d make on
              day one. Reply on Upwork and we can walk through any of them in detail.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <Link
              href="/proposal"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors duration-100"
            >
              See the proposal
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <p className="text-xs text-muted-foreground font-mono">
              or reply directly on Upwork to start
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
