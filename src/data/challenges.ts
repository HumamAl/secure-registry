import type { Challenge } from "@/lib/types";

export const executiveSummary = {
  commonApproach:
    "Most developers treat privacy as an access control layer on top of a shared data model — a middleware rule that checks roles before returning records.",
  differentApproach:
    "I separate public and private record shapes at the data model level, so private fields can never surface through the public API — not by misconfiguration, not by an missed access check, not ever.",
  accentWord: "data model level",
};

export const challenges: Challenge[] = [
  {
    id: "data-separation",
    title: "Public vs. Private Record Architecture",
    description:
      "The registry holds two fundamentally different data types: a Public Lookup Record (registration number, type, status, expiry) and a Private Owner Record (registrant name, email, phone, license number). These must never share a response shape. Enforcing this at the access control layer is fragile — a single middleware bypass exposes everything. The safe answer is a data model that makes it structurally impossible.",
    visualizationType: "architecture",
    outcome:
      "Could eliminate any possibility of private owner details leaking through public search results — enforced by data model design, not just access control rules.",
  },
  {
    id: "payment-pipeline",
    title: "Atomic Payment → Record Creation",
    description:
      "Stripe checkout for the four fixed-price services (New Registration, Annual Renewal, Status Change, Duplicate Certificate) must atomically create or update the corresponding record. If the webhook fires but the record write fails, the contractor has paid for nothing. If the record is written before payment confirms, the system has a record with no revenue. The solution is an idempotent webhook handler that treats payment confirmation as the single source of truth.",
    visualizationType: "flow",
    outcome:
      "Could ensure records are created or updated atomically after Stripe checkout confirms — no orphaned payments, no missing registrations.",
  },
  {
    id: "exact-match-search",
    title: "Exact-Match Lookup Without Data Browsing",
    description:
      "The public search must return only exact matches — no partial matches, no listing all records, no pagination of results. This is a deliberate privacy feature: the registry is not a directory. The UX challenge is that 'no record found' must feel authoritative, not broken. Users entering an incorrect registration number should understand what happened — not wonder if the system is down.",
    visualizationType: "before-after",
    outcome:
      "Could return only the public-facing fields for matching records, exposing zero owner information even on a confirmed match.",
  },
];
