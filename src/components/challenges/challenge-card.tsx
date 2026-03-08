import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChallengeCardProps {
  title: string;
  description: string;
  outcome?: string;
  children: React.ReactNode;
  className?: string;
  stepNumber?: number;
}

export function ChallengeCard({
  title,
  description,
  outcome,
  children,
  className,
  stepNumber,
}: ChallengeCardProps) {
  return (
    <div
      className={cn(
        "bg-card border border-border/60 rounded-lg p-6 space-y-4 hover:border-primary/30 transition-all duration-150",
        className
      )}
    >
      <div className="flex items-start gap-4">
        {stepNumber !== undefined && (
          <span className="font-mono text-sm tabular-nums text-primary/50 shrink-0 mt-0.5">
            {String(stepNumber).padStart(2, "0")}
          </span>
        )}
        <div className="flex-1">
          <h2 className="text-base font-semibold leading-snug">{title}</h2>
          <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{description}</p>
        </div>
      </div>
      <div>{children}</div>
      {outcome && (
        <div
          className="flex items-start gap-2 rounded-md px-3 py-2.5"
          style={{
            backgroundColor: "color-mix(in oklch, var(--success) 6%, transparent)",
            border: "1px solid color-mix(in oklch, var(--success) 18%, transparent)",
          }}
        >
          <TrendingUp className="h-3.5 w-3.5 mt-0.5 shrink-0 text-[color:var(--success)]" />
          <p className="text-xs font-medium text-[color:var(--success)]">{outcome}</p>
        </div>
      )}
    </div>
  );
}
