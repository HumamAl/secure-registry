"use client";

import { Lock, Eye, ShieldCheck, Database } from "lucide-react";

export function DataSeparationDiagram() {
  return (
    <div className="space-y-3">
      {/* Public layer */}
      <div className="rounded-md border border-primary/20 bg-primary/5 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Eye className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold text-primary uppercase tracking-wide font-mono">
            Public Lookup Record
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            "Registration Number",
            "Registration Type",
            "Status",
            "Expiry Date",
          ].map((field) => (
            <div
              key={field}
              className="rounded border border-primary/15 bg-card px-2 py-1.5 text-center"
            >
              <span className="text-[11px] font-mono text-foreground/70">
                {field}
              </span>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-muted-foreground mt-2">
          Returned by public search API — safe to expose
        </p>
      </div>

      {/* Privacy boundary */}
      <div className="flex items-center gap-3 px-2">
        <div className="flex-1 border-t-2 border-dashed border-primary/30" />
        <div
          className="flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold font-mono"
          style={{
            backgroundColor: "color-mix(in oklch, var(--warning) 10%, transparent)",
            border: "1px solid color-mix(in oklch, var(--warning) 25%, transparent)",
            color: "var(--warning)",
          }}
        >
          <ShieldCheck className="w-3 h-3" />
          Privacy Boundary — enforced at schema level
        </div>
        <div className="flex-1 border-t-2 border-dashed border-primary/30" />
      </div>

      {/* Private layer */}
      <div
        className="rounded-md border p-4"
        style={{
          backgroundColor: "color-mix(in oklch, var(--destructive) 4%, transparent)",
          borderColor: "color-mix(in oklch, var(--destructive) 20%, transparent)",
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Lock className="w-4 h-4 text-[color:var(--destructive)]" />
          <span
            className="text-xs font-semibold uppercase tracking-wide font-mono"
            style={{ color: "var(--destructive)" }}
          >
            Private Owner Record
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            "Registrant Name",
            "Email Address",
            "Phone Number",
            "License Number",
          ].map((field) => (
            <div
              key={field}
              className="rounded border px-2 py-1.5 text-center"
              style={{
                borderColor: "color-mix(in oklch, var(--destructive) 15%, transparent)",
                backgroundColor: "color-mix(in oklch, var(--destructive) 6%, transparent)",
              }}
            >
              <span
                className="text-[11px] font-mono"
                style={{ color: "color-mix(in oklch, var(--destructive) 70%, var(--foreground))" }}
              >
                {field}
              </span>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-muted-foreground mt-2">
          Admin-only — never returned by public API, not a different rule — a different type
        </p>
      </div>

      {/* Footnote */}
      <div className="flex items-start gap-2 px-1">
        <Database className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
        <p className="text-[11px] text-muted-foreground">
          Two separate response shapes:{" "}
          <code className="font-mono bg-muted px-1 rounded text-foreground/60">
            PublicRegistrationRecord
          </code>{" "}
          and{" "}
          <code className="font-mono bg-muted px-1 rounded text-foreground/60">
            PrivateRegistrationRecord
          </code>
          . No shared type means no accidental field exposure.
        </p>
      </div>
    </div>
  );
}
