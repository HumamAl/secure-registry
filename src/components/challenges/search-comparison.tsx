"use client";

import { useState } from "react";
import { Search, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type View = "match" | "no-match";

export function SearchComparison() {
  const [view, setView] = useState<View>("match");

  return (
    <div className="space-y-4">
      {/* Toggle */}
      <div className="flex items-center gap-1 rounded-md border border-border/60 p-0.5 w-fit">
        <button
          onClick={() => setView("match")}
          className={cn(
            "rounded px-3 py-1.5 text-xs font-medium transition-colors duration-100",
            view === "match"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Record found
        </button>
        <button
          onClick={() => setView("no-match")}
          className={cn(
            "rounded px-3 py-1.5 text-xs font-medium transition-colors duration-100",
            view === "no-match"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          No record found
        </button>
      </div>

      {/* Simulated search UI */}
      <div className="rounded-md border border-border/60 bg-card overflow-hidden">
        {/* Search bar */}
        <div className="flex items-center gap-2 border-b border-border/60 px-4 py-3 bg-muted/30">
          <Search className="w-4 h-4 text-muted-foreground shrink-0" />
          <span className="font-mono text-sm text-foreground/80">
            {view === "match" ? "REG-2024-08847" : "REG-2024-99999"}
          </span>
          <span className="ml-auto text-[11px] font-mono text-muted-foreground">
            Exact match only
          </span>
        </div>

        {/* Result */}
        <div className="p-4">
          {view === "match" ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[color:var(--success)]" />
                <span className="text-sm font-semibold text-[color:var(--success)]">
                  Registration found
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wide mb-0.5">
                    Registration No.
                  </p>
                  <p className="text-sm font-mono font-medium">REG-2024-08847</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wide mb-0.5">
                    Type
                  </p>
                  <p className="text-sm">General Contractor (GC-II)</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wide mb-0.5">
                    Status
                  </p>
                  <span
                    className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium"
                    style={{
                      backgroundColor: "color-mix(in oklch, var(--success) 10%, transparent)",
                      color: "var(--success)",
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--success)]" />
                    Active
                  </span>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wide mb-0.5">
                    Expires
                  </p>
                  <p className="text-sm font-mono">2026-03-14</p>
                </div>
              </div>
              <div
                className="rounded border px-3 py-2 text-[11px] text-muted-foreground font-mono"
                style={{
                  backgroundColor: "color-mix(in oklch, var(--warning) 6%, transparent)",
                  borderColor: "color-mix(in oklch, var(--warning) 15%, transparent)",
                }}
              >
                Owner details, contact information, and license number are not returned.
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <XCircle className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-semibold text-foreground">
                  No registration found
                </span>
              </div>
              <div
                className="rounded-md border px-4 py-3 space-y-1.5"
                style={{
                  backgroundColor: "color-mix(in oklch, var(--destructive) 4%, transparent)",
                  borderColor: "color-mix(in oklch, var(--destructive) 15%, transparent)",
                }}
              >
                <div className="flex items-start gap-2">
                  <AlertCircle
                    className="w-3.5 h-3.5 mt-0.5 shrink-0"
                    style={{ color: "var(--destructive)" }}
                  />
                  <p className="text-sm" style={{ color: "var(--destructive)" }}>
                    <strong>REG-2024-99999</strong> is not in the registry.
                  </p>
                </div>
                <p className="text-[11px] text-muted-foreground pl-5">
                  This could mean the number was entered incorrectly, or no record exists
                  with this exact identifier.
                </p>
              </div>
              <div className="space-y-1.5 text-[11px] text-muted-foreground">
                <p className="font-medium text-foreground/60">
                  Designed behavior — not a system error:
                </p>
                <ul className="space-y-1 pl-3">
                  <li className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-primary/40 shrink-0" />
                    No partial matches returned
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-primary/40 shrink-0" />
                    No listing of similar records
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-primary/40 shrink-0" />
                    Response time identical to a hit (no timing oracle)
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
