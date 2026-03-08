"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import {
  Search,
  ShieldCheck,
  ShieldX,
  ShieldAlert,
  FileText,
  RotateCcw,
  Upload,
  CheckCircle2,
  Clock,
  AlertTriangle,
  XCircle,
  ChevronDown,
  Check,
  X,
  Flag,
  DollarSign,
  CreditCard,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { APP_CONFIG } from "@/lib/config";
import {
  registrations,
  dashboardStats,
  applications,
  activityLog,
  servicePlans,
  getRegistrationByNumber,
  getRegistrationsByRegistrant,
  recentApplications,
  registrationsPendingAction,
  expiringRegistrations,
} from "@/data/mock-data";
import type { Registration, RegistrationStatus } from "@/lib/types";

const VerificationNetworkCanvas = dynamic(
  () =>
    import("@/components/dashboard/verification-network-canvas").then(
      (m) => m.VerificationNetworkCanvas
    ),
  { ssr: false }
);

// ---------------------------------------------------------------------------
// useCountUp — animated number counter using IntersectionObserver
// ---------------------------------------------------------------------------
function useCountUp(target: number, duration = 1100) {
  const [count, setCount] = useState(0);
  const elRef = useRef<HTMLParagraphElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (elRef.current) observer.observe(elRef.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, elRef };
}

// ---------------------------------------------------------------------------
// Status helpers
// ---------------------------------------------------------------------------
function StatusPill({ status }: { status: RegistrationStatus }) {
  const map: Record<RegistrationStatus, { label: string; classes: string; dot?: boolean }> = {
    Active:            { label: "Active",          classes: "bg-success/10 text-success border border-success/30", dot: true },
    "Pending Review":  { label: "Pending Review",  classes: "bg-warning/10 text-warning border border-warning/30" },
    "Pending Payment": { label: "Pending Payment", classes: "bg-warning/10 text-warning border border-warning/30" },
    "Under Review":    { label: "Under Review",    classes: "bg-primary/10 text-primary border border-primary/30" },
    Expired:           { label: "Expired",         classes: "bg-muted text-muted-foreground border border-border/60" },
    Suspended:         { label: "Suspended",       classes: "bg-destructive/10 text-destructive border border-destructive/30" },
    Flagged:           { label: "Flagged",         classes: "bg-destructive/10 text-destructive border border-destructive/30" },
    Revoked:           { label: "Revoked",         classes: "bg-destructive/10 text-destructive border border-destructive/30" },
    Incomplete:        { label: "Incomplete",      classes: "bg-muted text-muted-foreground border border-border/60" },
    Withdrawn:         { label: "Withdrawn",       classes: "bg-muted text-muted-foreground border border-border/60" },
  };
  const cfg = map[status] ?? { label: status, classes: "bg-muted text-muted-foreground border border-border/60" };
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full", cfg.classes)}>
      {cfg.dot && (
        <span className="relative inline-flex h-1.5 w-1.5 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-success" />
        </span>
      )}
      {cfg.label}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Record ID badge (signature detail)
// ---------------------------------------------------------------------------
function RecordIDBadge({ regNum }: { regNum: string }) {
  return (
    <span
      className="inline-flex items-center font-mono text-xs px-2 py-0.5 rounded"
      style={{
        background: "oklch(0.97 0.02 195)",
        borderLeft: "3px solid var(--primary)",
        color: "var(--primary)",
        letterSpacing: "0.04em",
      }}
    >
      {regNum}
    </span>
  );
}

// ---------------------------------------------------------------------------
// SCREEN 1 — Registry Lookup
// ---------------------------------------------------------------------------

const DEMO_NUMBERS = [
  "REG-2024-08847",
  "REG-2023-07341",
  "REG-2025-11294",
  "REG-2024-09102",
  "REG-XXXX-00000",
];

function ScreenRegistryLookup() {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [result, setResult] = useState<Registration | null | "not-found">(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = () => {
    if (!query.trim()) return;
    setIsVerifying(true);
    setSearched(false);
    setTimeout(() => {
      const found = getRegistrationByNumber(query.trim().toUpperCase());
      setResult(found ?? "not-found");
      setSearched(true);
      setIsVerifying(false);
    }, 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleVerify();
  };

  const handleDemoClick = (num: string) => {
    setQuery(num);
    setSearched(false);
    setResult(null);
    setIsVerifying(true);
    setTimeout(() => {
      const found = getRegistrationByNumber(num);
      setResult(found ?? "not-found");
      setSearched(true);
      setIsVerifying(false);
    }, 500);
  };

  return (
    <div className="relative min-h-[540px] flex flex-col items-center justify-start overflow-hidden bg-background">
      {/* Canvas background */}
      <div className="absolute inset-0 z-0">
        <VerificationNetworkCanvas />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full px-6 pt-12 pb-8">
        {/* Hero header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-primary bg-primary/8 border border-primary/20 rounded-full px-3 py-1 mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            Public Contractor Registry — Texas
          </div>
          <h1
            className="text-3xl font-semibold text-foreground mb-2"
            style={{ letterSpacing: "-0.03em" }}
          >
            Verify a Contractor Registration
          </h1>
          <p className="text-sm text-muted-foreground max-w-md">
            Enter a registration number to verify the current status, classification, and expiry
            of any licensed contractor.
          </p>
        </div>

        {/* Search input */}
        <div className="w-full max-w-lg">
          <div
            className="flex items-stretch overflow-hidden border border-border rounded-lg bg-background"
            style={{ boxShadow: "0 2px 12px oklch(0 0 0 / 0.06)" }}
          >
            <div className="flex items-center pl-4 text-muted-foreground/60">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (searched) { setSearched(false); setResult(null); }
              }}
              onKeyDown={handleKeyDown}
              placeholder="Enter Registration Number (e.g., REG-2024-08741)"
              className="flex-1 px-3 py-3.5 text-sm bg-transparent outline-none text-foreground placeholder:text-muted-foreground/50 font-mono"
            />
            <button
              onClick={handleVerify}
              disabled={!query.trim() || isVerifying}
              className={cn(
                "px-5 py-3.5 text-sm font-medium transition-colors duration-150 shrink-0",
                "bg-primary text-primary-foreground hover:bg-primary/90",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {isVerifying ? (
                <span className="flex items-center gap-1.5">
                  <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16 8 8 0 01-8-8z" />
                  </svg>
                  Verifying
                </span>
              ) : "Verify"}
            </button>
          </div>

          {/* Demo number chips */}
          <div className="flex flex-wrap gap-2 mt-3 items-center">
            <span className="text-xs text-muted-foreground/70">Try:</span>
            {DEMO_NUMBERS.map((num) => (
              <button
                key={num}
                onClick={() => handleDemoClick(num)}
                className={cn(
                  "text-xs font-mono px-2 py-0.5 rounded border transition-colors duration-100",
                  num === "REG-XXXX-00000"
                    ? "border-border/60 text-muted-foreground/60 hover:text-muted-foreground hover:border-border"
                    : "border-primary/20 text-primary/70 hover:text-primary hover:border-primary/40"
                )}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Result card */}
        {searched && result !== null && (
          <div
            className="w-full max-w-lg mt-6 border rounded-lg bg-background overflow-hidden"
            style={{
              borderColor: result === "not-found"
                ? "var(--destructive)"
                : result.status === "Active"
                  ? "var(--success)"
                  : "var(--warning)",
              borderTopWidth: "3px",
            }}
          >
            {result === "not-found" ? (
              <div className="p-5 flex items-start gap-3">
                <ShieldX className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-destructive text-sm">No Record Found</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    No active registration was found for{" "}
                    <span className="font-mono text-foreground">{query.toUpperCase()}</span>.
                    The registration may have expired or the number may be incorrect.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    {result.status === "Active" ? (
                      <ShieldCheck className="w-5 h-5 text-success shrink-0" />
                    ) : (
                      <ShieldAlert className="w-5 h-5 text-warning shrink-0" />
                    )}
                    <div>
                      <p className="font-semibold text-sm">{result.registrantName}</p>
                      <p className="text-xs text-muted-foreground">{result.businessName}</p>
                    </div>
                  </div>
                  <StatusPill status={result.status} />
                </div>

                {/* Detail block (signature detail: indented teal left-border) */}
                <div
                  className="rounded p-3 space-y-2"
                  style={{
                    background: "oklch(0.97 0.02 195)",
                    borderLeft: "3px solid var(--primary)",
                  }}
                >
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                    <div>
                      <span className="text-muted-foreground block mb-0.5">Registration No.</span>
                      <RecordIDBadge regNum={result.registrationNumber} />
                    </div>
                    <div>
                      <span className="text-muted-foreground block mb-0.5">Classification</span>
                      <span className="font-medium text-foreground">{result.registrationType}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block mb-0.5">Issued</span>
                      <span className="font-mono text-foreground">{result.issuanceDate}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block mb-0.5">Expires</span>
                      <span className={cn("font-mono", result.daysUntilExpiry < 30 ? "text-warning" : "text-foreground")}>
                        {result.expiryDate}
                        {result.daysUntilExpiry < 30 && result.daysUntilExpiry >= 0 && (
                          <span className="ml-1.5 text-warning text-[10px]">
                            ({result.daysUntilExpiry}d)
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-[10px] text-muted-foreground mt-3">
                  Verified by Texas Contractor Registry · {new Date().toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SCREEN 2 — Owner Dashboard
// ---------------------------------------------------------------------------

// Activity event label
function activityLabel(type: string): string {
  const map: Record<string, string> = {
    registration_renewed: "Registration renewed",
    registration_created: "Registration created",
    document_uploaded: "Document uploaded",
    document_verified: "Document verified",
    payment_completed: "Payment completed",
    certificate_issued: "Certificate issued",
    public_lookup_performed: "Public lookup performed",
    registration_flagged: "Registration flagged",
    registration_suspended: "Registration suspended",
    application_submitted: "Application submitted",
    application_approved: "Application approved",
    amendment_submitted: "Amendment submitted",
    admin_note_added: "Admin note added",
  };
  return map[type] ?? type.replace(/_/g, " ");
}

function ScreenOwnerDashboard() {
  const registrant = { id: "rgnt_k8m2p", fullName: "Marcus Delgado", businessName: "Delgado General Contracting LLC" };
  const myRegs = getRegistrationsByRegistrant(registrant.id);
  const myActivity = activityLog
    .filter((e) => myRegs.some((r) => r.id === e.registrationId))
    .slice(0, 5);

  const [uploadMsg, setUploadMsg] = useState<string | null>(null);

  const handleRenew = () => {
    // Simulated interaction — no alert
  };

  const handleUpload = () => {
    setUploadMsg("Document upload initiated. You will be redirected to the secure upload portal.");
    setTimeout(() => setUploadMsg(null), 3000);
  };

  return (
    <div className="bg-background min-h-[540px] p-5 space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold" style={{ letterSpacing: "-0.02em" }}>
            {registrant.businessName}
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">{registrant.fullName} · Registrant Portal</p>
        </div>
        <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
          rgnt_k8m2p
        </span>
      </div>

      {uploadMsg && (
        <div className="flex items-center gap-2 text-xs text-success bg-success/8 border border-success/25 rounded-lg px-3 py-2.5">
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
          {uploadMsg}
        </div>
      )}

      {/* Registration cards */}
      <div className="space-y-3">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Your Registrations ({myRegs.length})
        </p>
        {myRegs.map((reg) => (
          <div
            key={reg.id}
            className="aesthetic-card p-4"
            style={{ borderTopWidth: "3px", borderTopColor: reg.status === "Active" ? "var(--success)" : "var(--warning)" }}
          >
            <div className="flex items-start justify-between gap-2 mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <RecordIDBadge regNum={reg.registrationNumber} />
                  <StatusPill status={reg.status} />
                </div>
                <p className="text-sm font-medium">{reg.registrationType}</p>
              </div>
            </div>
            <div
              className="rounded p-3 grid grid-cols-2 gap-2 text-xs mb-3"
              style={{ background: "oklch(0.97 0.02 195)", borderLeft: "3px solid var(--primary)" }}
            >
              <div>
                <span className="text-muted-foreground">Expiry</span>
                <p className={cn("font-mono font-medium mt-0.5", reg.daysUntilExpiry < 30 ? "text-warning" : "text-foreground")}>
                  {reg.expiryDate}
                  {reg.inRenewalWindow && (
                    <span className="ml-1.5 text-warning text-[10px]">⚠ Renewal window</span>
                  )}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Documents</span>
                <p className="font-medium mt-0.5 text-foreground">{reg.documents.length} on file</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleRenew}
                className={cn(
                  "flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded border transition-colors duration-150",
                  reg.inRenewalWindow
                    ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90"
                    : "border-border/60 text-muted-foreground hover:text-foreground hover:border-border"
                )}
              >
                <RotateCcw className="w-3 h-3" />
                Renew — $95
              </button>
              <button
                onClick={handleUpload}
                className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded border border-border/60 text-muted-foreground hover:text-foreground hover:border-border transition-colors duration-150"
              >
                <Upload className="w-3 h-3" />
                Upload Document
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Recent activity */}
      <div>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
          Recent Activity
        </p>
        <div className="space-y-1">
          {myActivity.map((entry) => (
            <div
              key={entry.id}
              className="flex items-start gap-2.5 py-2 px-3 rounded text-xs aesthetic-hover"
            >
              <Clock className="w-3.5 h-3.5 text-primary/60 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-foreground">{entry.description}</p>
                <p className="text-muted-foreground/60 mt-0.5 font-mono">{entry.timestamp.slice(0, 10)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SCREEN 3 — Admin Console
// ---------------------------------------------------------------------------

function StatBar({
  label,
  value,
  change,
  prefix = "",
  suffix = "",
  index = 0,
}: {
  label: string;
  value: number;
  change: number;
  prefix?: string;
  suffix?: string;
  index?: number;
}) {
  const { count, elRef } = useCountUp(value, 1000);
  const positive = change >= 0;
  return (
    <div
      className="aesthetic-card p-4"
      style={{ animationDelay: `${index * 50}ms`, animationFillMode: "both" }}
    >
      <p className="text-xs text-muted-foreground font-medium mb-1.5">{label}</p>
      <p ref={elRef} className="text-2xl font-semibold font-mono tabular-nums text-foreground" style={{ letterSpacing: "-0.03em" }}>
        {prefix}{count.toLocaleString()}{suffix}
      </p>
      <p className={cn("text-xs mt-1", positive ? "text-success" : "text-destructive")}>
        {positive ? "+" : ""}{change}% vs last month
      </p>
    </div>
  );
}

type AppStatus = "Submitted" | "Under Review" | "Approved" | "Rejected" | "Draft" | "Withdrawn";
function AppStatusBadge({ status }: { status: AppStatus }) {
  const map: Record<AppStatus, string> = {
    Approved: "bg-success/10 text-success border border-success/30",
    Rejected: "bg-destructive/10 text-destructive border border-destructive/30",
    "Under Review": "bg-primary/10 text-primary border border-primary/30",
    Submitted: "bg-warning/10 text-warning border border-warning/30",
    Draft: "bg-muted text-muted-foreground border border-border/60",
    Withdrawn: "bg-muted text-muted-foreground border border-border/60",
  };
  return (
    <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", map[status] ?? "bg-muted text-muted-foreground border border-border/60")}>
      {status}
    </span>
  );
}

function ScreenAdminConsole() {
  const [filter, setFilter] = useState<"All" | "Pending" | "Flagged" | "Expiring">("All");

  const displayedRegs = useMemo(() => {
    if (filter === "Pending") return registrationsPendingAction.slice(0, 8);
    if (filter === "Flagged") return registrations.filter((r) => r.status === "Flagged" || r.status === "Suspended").slice(0, 8);
    if (filter === "Expiring") return expiringRegistrations.slice(0, 8);
    return registrations.slice(0, 8);
  }, [filter]);

  const [actionMap, setActionMap] = useState<Record<string, "approved" | "rejected" | "flagged">>({});

  const handleAction = (id: string, action: "approved" | "rejected" | "flagged") => {
    setActionMap((prev) => ({ ...prev, [id]: action }));
  };

  return (
    <div className="bg-background min-h-[540px] p-5 space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold" style={{ letterSpacing: "-0.02em" }}>Registry Admin Console</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Manage registrations, review applications, and process renewals</p>
        </div>
        <span className="text-[10px] font-mono text-muted-foreground/60">Admin — J. Harmon</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <StatBar label="Active Registrations" value={dashboardStats.totalActiveRegistrations} change={dashboardStats.activeRegistrationsChange} index={0} />
        <StatBar label="Pending Review" value={dashboardStats.pendingReview} change={dashboardStats.pendingReviewChange} index={1} />
        <StatBar label="Expiring in 30 Days" value={dashboardStats.expiringIn30Days} change={dashboardStats.expiringChange} index={2} />
        <StatBar label="Revenue MTD" value={dashboardStats.revenueMonthToDate} prefix="$" change={dashboardStats.revenueChange} index={3} />
      </div>

      {/* Applications queue */}
      <div>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
          Applications Queue
        </p>
        <div className="space-y-2">
          {recentApplications.slice(0, 3).map((app) => (
            <div key={app.id} className="aesthetic-card p-3 flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-medium text-foreground truncate">{app.registrantName}</span>
                  <AppStatusBadge status={app.status as AppStatus} />
                </div>
                <p className="text-xs text-muted-foreground truncate">{app.registrationType}</p>
                <p className="text-[10px] font-mono text-muted-foreground/60 mt-0.5">{app.submittedAt}</p>
              </div>
              <div className="flex gap-1.5 shrink-0">
                <button
                  onClick={() => handleAction(app.id, "approved")}
                  className={cn(
                    "p-1.5 rounded border text-xs transition-colors duration-150",
                    actionMap[app.id] === "approved"
                      ? "bg-success text-success-foreground border-success"
                      : "border-success/40 text-success hover:bg-success/10"
                  )}
                  title="Approve"
                >
                  <Check className="w-3 h-3" />
                </button>
                <button
                  onClick={() => handleAction(app.id, "rejected")}
                  className={cn(
                    "p-1.5 rounded border text-xs transition-colors duration-150",
                    actionMap[app.id] === "rejected"
                      ? "bg-destructive text-primary-foreground border-destructive"
                      : "border-destructive/40 text-destructive hover:bg-destructive/10"
                  )}
                  title="Reject"
                >
                  <X className="w-3 h-3" />
                </button>
                <button
                  onClick={() => handleAction(app.id, "flagged")}
                  className={cn(
                    "p-1.5 rounded border text-xs transition-colors duration-150",
                    actionMap[app.id] === "flagged"
                      ? "bg-warning text-warning-foreground border-warning"
                      : "border-warning/40 text-warning hover:bg-warning/10"
                  )}
                  title="Flag"
                >
                  <Flag className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Registrations table with filter */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Registrations
          </p>
          <div className="flex gap-1 ml-auto">
            {(["All", "Pending", "Flagged", "Expiring"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "text-xs px-2.5 py-1 rounded border transition-colors duration-150",
                  filter === f
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border/60 text-muted-foreground hover:text-foreground"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-1">
          {displayedRegs.map((reg) => {
            const action = actionMap[reg.id];
            return (
              <div
                key={reg.id}
                className="flex items-center gap-3 px-3 py-2 rounded text-xs aesthetic-hover"
              >
                <RecordIDBadge regNum={reg.registrationNumber} />
                <span className="flex-1 truncate text-foreground/80">{reg.registrantName}</span>
                <span className="hidden sm:block text-muted-foreground/60 truncate max-w-[120px]">{reg.registrationType.split(" (")[0]}</span>
                {action ? (
                  <span className={cn(
                    "text-xs font-medium px-2 py-0.5 rounded-full",
                    action === "approved" ? "bg-success/10 text-success" : action === "rejected" ? "bg-destructive/10 text-destructive" : "bg-warning/10 text-warning"
                  )}>
                    {action.charAt(0).toUpperCase() + action.slice(1)}
                  </span>
                ) : (
                  <StatusPill status={reg.status} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SCREEN 4 — Services & Fees
// ---------------------------------------------------------------------------

const SERVICE_ICONS = [DollarSign, CreditCard, FileText, FileText];
const SERVICE_FEATURES: Record<string, string[]> = {
  "New Registration":           ["Application review (3-5 business days)", "Digital certificate issued on approval", "Public registry listing", "Document verification (all 4 required docs)"],
  "Annual Renewal":             ["Same-day processing", "Updated certificate issued", "12-month extension", "No re-submission of verified documents"],
  "Status Change / Amendment":  ["Classification change or upgrade", "Business name update", "Contact information update", "Admin review within 2 days"],
  "Duplicate Certificate":      ["Instant issuance upon payment", "PDF and printable format", "Linked to original registration", "No additional documentation required"],
};

function ScreenServicesFees() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [paid, setPaid] = useState<string | null>(null);

  const handlePay = (id: string) => {
    setSelectedPlan(null);
    setPaid(id);
    setTimeout(() => setPaid(null), 3000);
  };

  return (
    <div className="bg-background min-h-[540px] p-5 space-y-5">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold" style={{ letterSpacing: "-0.02em" }}>Services & Fee Schedule</h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          All fees are processed securely through Stripe. Payments are non-refundable once the review process begins.
        </p>
      </div>

      {paid && (
        <div className="flex items-center gap-2 text-xs text-success bg-success/8 border border-success/25 rounded-lg px-3 py-2.5">
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
          Payment initiated. You will receive a confirmation email within 5 minutes.
        </div>
      )}

      {/* Service cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {servicePlans.map((plan, i) => {
          const Icon = SERVICE_ICONS[i] ?? DollarSign;
          const features = SERVICE_FEATURES[plan.serviceType] ?? [];
          const isSelected = selectedPlan === plan.id;
          return (
            <div
              key={plan.id}
              className={cn(
                "aesthetic-card p-4 cursor-pointer transition-colors duration-150",
                isSelected && "border-primary/50"
              )}
              style={i === 0 ? { borderTopWidth: "3px", borderTopColor: "var(--primary)" } : {}}
              onClick={() => setSelectedPlan(isSelected ? null : plan.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded flex items-center justify-center bg-primary/8 border border-primary/20">
                    <Icon className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-sm font-medium">{plan.serviceType}</span>
                </div>
                <span className="text-lg font-semibold font-mono text-primary" style={{ letterSpacing: "-0.03em" }}>
                  ${plan.price}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">{plan.description}</p>

              {/* Features (expanded on click) */}
              {isSelected && (
                <ul className="space-y-1.5 mb-3">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-1.5 text-xs text-foreground/80">
                      <CheckCircle2 className="w-3 h-3 text-success shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              )}

              <button
                onClick={(e) => { e.stopPropagation(); handlePay(plan.id); }}
                className="w-full text-xs font-medium py-2 rounded border border-primary/25 text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-150"
              >
                Pay Now — ${plan.price}
              </button>
            </div>
          );
        })}
      </div>

      <div className="text-xs text-muted-foreground/70 flex items-center gap-1.5 pt-1">
        <ShieldCheck className="w-3.5 h-3.5 text-success" />
        Secured by Stripe · PCI DSS compliant · TLS 1.3 encrypted
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SCREEN NAVIGATOR (top tabs, inside the browser frame)
// ---------------------------------------------------------------------------

const SCREENS = [
  { id: "lookup",    label: "Registry Lookup" },
  { id: "owner",     label: "Owner Dashboard" },
  { id: "admin",     label: "Admin Console" },
  { id: "services",  label: "Services & Fees" },
] as const;

type ScreenId = typeof SCREENS[number]["id"];

// ---------------------------------------------------------------------------
// PAGE
// ---------------------------------------------------------------------------

export default function WalkthroughPage() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>("lookup");

  const screenContent = {
    lookup:   <ScreenRegistryLookup />,
    owner:    <ScreenOwnerDashboard />,
    admin:    <ScreenAdminConsole />,
    services: <ScreenServicesFees />,
  } as const;

  return (
    <div className="space-y-0">
      {/* Screen navigator tabs — rendered inside the page, above the content */}
      <div className="flex items-center border-b border-border/60 bg-background/95 sticky top-0 z-20 backdrop-blur-sm">
        {SCREENS.map((screen) => {
          const isActive = screen.id === activeScreen;
          return (
            <button
              key={screen.id}
              onClick={() => setActiveScreen(screen.id)}
              className={cn(
                "flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium transition-all duration-150 border-b-2 -mb-px whitespace-nowrap",
                isActive
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border/60"
              )}
            >
              {screen.label}
            </button>
          );
        })}
      </div>

      {/* Screen content */}
      <div className="transition-opacity duration-150">
        {screenContent[activeScreen]}
      </div>

      {/* Conversion banner */}
      <div className="mx-5 mb-5 mt-4 p-4 rounded-lg border border-primary/15 bg-gradient-to-r from-primary/5 to-transparent flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-foreground">
            Built for{" "}
            <span className="text-primary">{APP_CONFIG.projectName}</span>
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Humam · Full-Stack Developer · Available now
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="/challenges"
            className="text-xs text-muted-foreground hover:text-primary transition-colors duration-150"
          >
            My Approach →
          </a>
          <a
            href="/proposal"
            className="inline-flex items-center gap-1.5 text-xs font-medium bg-primary text-primary-foreground px-3 py-1.5 rounded hover:bg-primary/90 transition-colors duration-150"
          >
            Work with me
          </a>
        </div>
      </div>
    </div>
  );
}
