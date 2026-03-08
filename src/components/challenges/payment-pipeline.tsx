"use client";

import { useState } from "react";
import {
  CreditCard,
  Webhook,
  CheckCircle2,
  FileText,
  ChevronRight,
  RotateCcw,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PipelineStage {
  id: string;
  label: string;
  sublabel: string;
  icon: typeof CreditCard;
  type: "input" | "transform" | "output";
  detail: string;
  risk?: string;
}

const stages: PipelineStage[] = [
  {
    id: "checkout",
    label: "Stripe Checkout",
    sublabel: "Client pays",
    icon: CreditCard,
    type: "input",
    detail:
      "Contractor selects one of 4 fixed-price services and completes payment in Stripe-hosted checkout. No record is written yet.",
  },
  {
    id: "webhook",
    label: "Webhook Receipt",
    sublabel: "payment_intent.succeeded",
    icon: Webhook,
    type: "transform",
    detail:
      "Stripe fires a signed webhook. The handler verifies the signature, checks idempotency (prevents duplicate processing on retry), then reads the metadata embedded at checkout.",
    risk: "The idempotency key prevents double-writes if Stripe retries the webhook.",
  },
  {
    id: "write",
    label: "Atomic Record Write",
    sublabel: "DB transaction",
    icon: FileText,
    type: "transform",
    detail:
      "A single database transaction creates or updates the registration record. If the write fails, the transaction rolls back — the payment is logged as orphaned and flagged for manual review.",
    risk: "All-or-nothing: if the write fails, no partial record is created.",
  },
  {
    id: "confirm",
    label: "Confirmation",
    sublabel: "Certificate + receipt",
    icon: CheckCircle2,
    type: "output",
    detail:
      "Once the record is committed, a certificate is generated, an email receipt is sent, and the activity log records the event. The contractor's portal reflects the new status immediately.",
  },
];

export function PaymentPipeline() {
  const [activeStage, setActiveStage] = useState(0);
  const current = stages[activeStage];

  const stageColor = (type: PipelineStage["type"]) => {
    if (type === "input") return "border-border/60 bg-muted/40";
    if (type === "transform") return "border-primary/25 bg-primary/5";
    return "border-[color:var(--success)]/25 bg-[color:var(--success)]/5";
  };

  const stageActiveColor = (type: PipelineStage["type"]) => {
    if (type === "input") return "border-primary bg-primary/10 ring-2 ring-primary/20";
    if (type === "transform") return "border-primary bg-primary/15 ring-2 ring-primary/20";
    return "border-[color:var(--success)] bg-[color:var(--success)]/10 ring-2 ring-[color:var(--success)]/20";
  };

  return (
    <div className="space-y-4">
      {/* Stage nodes */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
        {stages.map((stage, i) => {
          const isActive = i === activeStage;
          const isPast = i < activeStage;
          const Icon = stage.icon;
          return (
            <div key={stage.id} className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => setActiveStage(i)}
                className={cn(
                  "flex-1 sm:flex-none flex items-center gap-2 rounded-md border px-3 py-2 text-left transition-all duration-150 cursor-pointer",
                  isActive
                    ? stageActiveColor(stage.type)
                    : isPast
                    ? "border-[color:var(--success)]/20 bg-[color:var(--success)]/5 opacity-70"
                    : stageColor(stage.type)
                )}
              >
                <Icon
                  className={cn(
                    "w-4 h-4 shrink-0",
                    isActive
                      ? stage.type === "output"
                        ? "text-[color:var(--success)]"
                        : "text-primary"
                      : isPast
                      ? "text-[color:var(--success)]"
                      : "text-muted-foreground"
                  )}
                />
                <div>
                  <p
                    className={cn(
                      "text-xs font-semibold",
                      isActive
                        ? stage.type === "output"
                          ? "text-[color:var(--success)]"
                          : "text-primary"
                        : "text-foreground/80"
                    )}
                  >
                    {stage.label}
                  </p>
                  <p className="text-[10px] font-mono text-muted-foreground">
                    {stage.sublabel}
                  </p>
                </div>
              </button>
              {i < stages.length - 1 && (
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50 shrink-0 hidden sm:block" />
              )}
            </div>
          );
        })}
      </div>

      {/* Detail panel */}
      <div className="rounded-md border border-border/50 bg-card p-4 space-y-2 min-h-[100px]">
        <p className="text-xs font-semibold text-foreground">{current.label}</p>
        <p className="text-sm text-muted-foreground leading-relaxed">{current.detail}</p>
        {current.risk && (
          <div
            className="flex items-start gap-2 rounded px-2.5 py-2 mt-1"
            style={{
              backgroundColor: "color-mix(in oklch, var(--warning) 8%, transparent)",
              border: "1px solid color-mix(in oklch, var(--warning) 20%, transparent)",
            }}
          >
            <AlertTriangle
              className="w-3.5 h-3.5 shrink-0 mt-0.5"
              style={{ color: "var(--warning)" }}
            />
            <p className="text-[11px]" style={{ color: "var(--warning)" }}>
              {current.risk}
            </p>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1.5">
          {stages.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveStage(i)}
              className={cn(
                "w-1.5 h-1.5 rounded-full transition-all duration-150",
                i === activeStage ? "bg-primary w-4" : "bg-border hover:bg-primary/40"
              )}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveStage(0)}
            className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors duration-100 font-mono"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
          <button
            onClick={() => setActiveStage((prev) => Math.min(prev + 1, stages.length - 1))}
            disabled={activeStage === stages.length - 1}
            className={cn(
              "flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors duration-100",
              activeStage === stages.length - 1
                ? "border-border/40 text-muted-foreground/40 cursor-not-allowed"
                : "border-primary/30 text-primary hover:bg-primary/5"
            )}
          >
            Next step
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
