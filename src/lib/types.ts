import type { LucideIcon } from "lucide-react";

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

// ---------------------------------------------------------------------------
// Challenge visualization types (Tab 2)
// ---------------------------------------------------------------------------

export type VisualizationType =
  | "flow"
  | "before-after"
  | "metrics"
  | "architecture"
  | "risk-matrix"
  | "timeline"
  | "dual-kpi"
  | "tech-stack"
  | "decision-flow";

export interface Challenge {
  id: string;
  title: string;
  description: string;
  visualizationType: VisualizationType;
  outcome?: string;
}

// ---------------------------------------------------------------------------
// Proposal types (Tab 3)
// ---------------------------------------------------------------------------

export interface Profile {
  name: string;
  tagline: string;
  bio: string;
  approach: { title: string; description: string }[];
  skillCategories: { name: string; skills: string[] }[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  tech: string[];
  relevance?: string;
  outcome?: string;
  liveUrl?: string;
}

// ---------------------------------------------------------------------------
// Screen definition for multi-screen-walkthrough format
// ---------------------------------------------------------------------------

export interface DemoScreen {
  id: string;
  label: string;
  icon?: LucideIcon;
  href: string;
}

// ---------------------------------------------------------------------------
// Conversion element variant types
// ---------------------------------------------------------------------------

export type ConversionVariant = "sidebar" | "inline" | "floating" | "banner";

// ===========================================================================
// DOMAIN TYPES — Contractor Certification Registry
// ===========================================================================

// ---------------------------------------------------------------------------
// Core status enumerations
// ---------------------------------------------------------------------------

export type RegistrationStatus =
  | "Active"
  | "Pending Review"
  | "Pending Payment"
  | "Under Review"
  | "Expired"
  | "Suspended"
  | "Flagged"
  | "Revoked"
  | "Incomplete"
  | "Withdrawn";

export type DocumentStatus =
  | "Verified"
  | "Pending Verification"
  | "Rejected"
  | "Expired"
  | "Awaiting Upload";

export type ApplicationStatus =
  | "Draft"
  | "Submitted"
  | "Under Review"
  | "Approved"
  | "Rejected"
  | "Withdrawn";

export type TransactionStatus =
  | "Completed"
  | "Pending"
  | "Failed"
  | "Refunded"
  | "Abandoned";

export type UserRole = "registrant" | "admin";

// ---------------------------------------------------------------------------
// Registration types & trades
// ---------------------------------------------------------------------------

export type RegistrationType =
  | "General Contractor (GC-I)"
  | "General Contractor (GC-II)"
  | "General Contractor (GC-III)"
  | "Electrical Contractor"
  | "Plumbing Contractor"
  | "HVAC Systems"
  | "Fire Suppression"
  | "Roofing Contractor"
  | "Mechanical Systems"
  | "Commercial Building Inspector"
  | "Demolition Contractor";

export type DocumentType =
  | "Business License"
  | "Liability Insurance Certificate"
  | "Government-Issued ID"
  | "Proof of Training/Certification";

// ---------------------------------------------------------------------------
// Supporting Document
// ---------------------------------------------------------------------------

export interface SupportingDocument {
  id: string;
  registrationId: string;
  type: DocumentType;
  fileName: string;
  uploadedAt: string;       // ISO date string
  /** Expiry date when document has one (e.g., insurance certificates) */
  expiresAt?: string | null;
  status: DocumentStatus;
  /** Reason for rejection when status === "Rejected" */
  rejectionNote?: string | null;
  /** Only admins can see the file storage URL */
  visibility: "public" | "admin-only";
}

// ---------------------------------------------------------------------------
// Registrant (the person/business that owns registrations)
// ---------------------------------------------------------------------------

export interface Registrant {
  id: string;               // "rgnt_k8m2p"
  role: UserRole;
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  licenseNumber: string;
  createdAt: string;
  /** Number of active registrations held by this registrant */
  activeRegistrationCount: number;
}

// ---------------------------------------------------------------------------
// Registration — the primary record
// ---------------------------------------------------------------------------

export interface Registration {
  id: string;               // "reg_b4n9s"
  registrationNumber: string;   // "REG-2024-08847"
  registrantId: string;         // references Registrant.id
  registrantName: string;       // denormalized for display
  businessName: string;
  registrationType: RegistrationType;
  status: RegistrationStatus;
  issuanceDate: string;         // ISO date — null when not yet issued
  expiryDate: string;           // ISO date
  /** Dates are ISO strings; null = not yet discharged */
  lastRenewalDate: string | null;
  /** Days until expiry — negative means expired */
  daysUntilExpiry: number;
  /** True when the registration is within the 30-day renewal window */
  inRenewalWindow: boolean;
  /** True when within 60-day grace period after expiry */
  inGracePeriod: boolean;
  documents: SupportingDocument[];
  /** Admin note; null when none */
  adminNote: string | null;
  /** Present when status === "Flagged" or "Suspended" */
  flagReason?: string | null;
  applicationId: string;        // references Application.id
  createdAt: string;
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// Certificate (the downloadable artifact tied to an Active registration)
// ---------------------------------------------------------------------------

export interface Certificate {
  id: string;               // "cert_x7q3n"
  registrationId: string;
  registrationNumber: string;
  registrantName: string;
  registrationType: RegistrationType;
  issuedAt: string;
  expiresAt: string;
  /** QR/lookup verification token */
  verificationToken: string;
  isDuplicate: boolean;
  /** If isDuplicate, which transaction paid for it */
  duplicateTransactionId?: string | null;
}

// ---------------------------------------------------------------------------
// Application (the initial submission that becomes a Registration)
// ---------------------------------------------------------------------------

export interface Application {
  id: string;               // "app_m1r6t"
  registrantId: string;
  registrantName: string;
  registrationType: RegistrationType;
  status: ApplicationStatus;
  submittedAt: string;
  reviewedAt: string | null;
  reviewedBy: string | null;    // admin name
  rejectionReason: string | null;
  /** Stripe payment intent tied to the New Registration service */
  paymentIntentId: string | null;
  serviceFee: number;           // 125.00
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Service Plan — the 4 Stripe-billed services
// ---------------------------------------------------------------------------

export type ServiceType =
  | "New Registration"
  | "Annual Renewal"
  | "Status Change / Amendment"
  | "Duplicate Certificate";

export interface ServicePlan {
  id: string;
  serviceType: ServiceType;
  price: number;            // 125 | 95 | 60 | 35
  description: string;
  stripeProductId: string;
}

// ---------------------------------------------------------------------------
// Transaction / Payment
// ---------------------------------------------------------------------------

export interface Transaction {
  id: string;               // "txn_p3k7n"
  registrationId: string | null;    // null for abandoned/failed
  registrantId: string;
  registrantName: string;
  serviceType: ServiceType;
  amount: number;
  status: TransactionStatus;
  stripePaymentIntentId: string;
  /** ISO timestamp of payment completion; null if not completed */
  completedAt: string | null;
  createdAt: string;
  /** Present when status === "Refunded" */
  refundReason?: string | null;
  /** Present when status === "Failed" */
  failureCode?: string | null;
}

// ---------------------------------------------------------------------------
// Activity Log
// ---------------------------------------------------------------------------

export type ActivityEventType =
  | "registration_created"
  | "registration_renewed"
  | "registration_suspended"
  | "registration_revoked"
  | "registration_expired"
  | "registration_flagged"
  | "document_uploaded"
  | "document_verified"
  | "document_rejected"
  | "payment_completed"
  | "payment_failed"
  | "application_submitted"
  | "application_approved"
  | "application_rejected"
  | "certificate_issued"
  | "public_lookup_performed"
  | "admin_note_added"
  | "amendment_submitted";

export interface ActivityLogEntry {
  id: string;               // "log_9x3q1"
  eventType: ActivityEventType;
  registrationId: string | null;
  registrationNumber: string | null;
  actorName: string;        // registrant name or "Registry System" or admin name
  actorRole: UserRole | "system";
  description: string;
  timestamp: string;        // ISO datetime string
  metadata?: Record<string, string | number | boolean>;
}

// ---------------------------------------------------------------------------
// Dashboard Stats
// ---------------------------------------------------------------------------

export interface DashboardStats {
  totalActiveRegistrations: number;
  activeRegistrationsChange: number;   // % change vs prior month
  pendingReview: number;
  pendingReviewChange: number;
  expiringIn30Days: number;
  expiringChange: number;
  renewalRate: number;                 // percentage 0-100
  renewalRateChange: number;
  avgProcessingDays: number;
  processingDaysChange: number;        // negative = faster (improvement)
  revenueMonthToDate: number;
  revenueChange: number;               // % vs prior month
  documentsPendingVerification: number;
  complianceRate: number;              // percentage of Active records fully compliant
}

// ---------------------------------------------------------------------------
// Chart data types
// ---------------------------------------------------------------------------

export interface MonthlyRevenueDataPoint {
  month: string;
  revenue: number;
  renewals: number;
  newRegistrations: number;
  amendments: number;
}

export interface StatusBreakdownDataPoint {
  status: RegistrationStatus;
  count: number;
  /** Percentage of total registrations */
  percentage: number;
  fill: string;
}

export interface MonthlyApplicationDataPoint {
  month: string;
  submitted: number;
  approved: number;
  rejected: number;
}

export interface RegistrationTypeBreakdownPoint {
  registrationType: string;
  count: number;
  percentage: number;
}
