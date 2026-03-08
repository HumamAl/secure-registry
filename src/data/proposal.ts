// Tab 3 — Work With Me
// Proposal Builder output for secure-registry (Contractor Certification Registry)
// Client: Garrett | Budget: $2k–$5k | Timeline: < 1 month

export const proposalData = {
  hero: {
    name: "Humam",
    role: "Full-Stack Developer",
    valueProp:
      "I build registry systems where privacy isn't an afterthought — public lookup, role-based dashboards, and Stripe checkout that creates records automatically.",
    badge: "Built this demo for your project",
    stats: [
      { value: "24+", label: "Projects Shipped" },
      { value: "< 48hr", label: "Demo Turnaround" },
      { value: "15+", label: "Industries Served" },
    ],
  },

  portfolioProjects: [
    {
      id: "lead-crm",
      name: "Lead Intake CRM",
      description:
        "Public intake form feeding a CRM dashboard with lead scoring, pipeline management, and automation rules. The exact same public-in / admin-managed-out architecture your registry needs.",
      outcome:
        "End-to-end lead flow — public intake form to scored pipeline with configurable automation rules",
      tech: ["Next.js", "TypeScript", "Tailwind", "shadcn/ui"],
      url: null,
      relevance:
        "Public form + role-based dashboard — direct parallel to public lookup + owner/admin dashboards",
    },
    {
      id: "payguard",
      name: "PayGuard — Transaction Monitor",
      description:
        "Compliance dashboard with role-differentiated views, transaction flagging, multi-account linking, and alert management. Status-driven records are the core of both systems.",
      outcome:
        "Compliance monitoring dashboard with transaction flagging, multi-account linking, and alert delivery tracking",
      tech: ["Next.js", "TypeScript", "Tailwind", "shadcn/ui", "Recharts"],
      url: "https://payment-monitor.vercel.app",
      relevance:
        "Role-differentiated views and status-driven record management — maps to your multi-role access control",
    },
    {
      id: "auction-violations",
      name: "Auction Violations Monitor",
      description:
        "Compliance tool with access-controlled admin dashboard and public-facing views. Violation detection, enforcement workflows, and public lookup with restricted data exposure.",
      outcome:
        "Compliance dashboard with violation detection, seller flagging, and enforcement action tracking",
      tech: ["Next.js", "TypeScript", "Tailwind", "shadcn/ui"],
      url: "https://auction-violations.vercel.app",
      relevance:
        "Access-controlled admin + public-facing compliance views — same privacy boundary your registry enforces",
    },
    {
      id: "creator-economy",
      name: "Creator Economy App",
      description:
        "Livestreaming platform where a viewer tip triggers Stripe Connect split payments to creator payout — payment event drives downstream state changes automatically.",
      outcome:
        "End-to-end payment flow from viewer tip to creator payout via Stripe Connect split payments",
      tech: ["Next.js", "TypeScript", "Tailwind", "Stripe Connect"],
      url: null,
      relevance:
        "Stripe checkout triggering record creation — same pattern as your 4-service payment flow",
    },
  ],

  approachSteps: [
    {
      step: "01",
      title: "Map the Data Model",
      description:
        "Public fields vs. private fields vs. admin-only fields — decided in writing before a line of code. The privacy boundary is the hardest thing to retrofit later.",
      timeline: "Day 1–2",
    },
    {
      step: "02",
      title: "Build the Lookup + Privacy Layer",
      description:
        "Public exact-match search returns only what's safe to expose. This is the core architectural risk — I build and test it first, not last.",
      timeline: "Day 3–5",
    },
    {
      step: "03",
      title: "Wire Stripe Checkout → Record Creation",
      description:
        "Each of the 4 services (New Registration, Renewal, Amendment, Duplicate Certificate) hooks to a Stripe product. Successful payment automatically creates or updates the record.",
      timeline: "Day 6–9",
    },
    {
      step: "04",
      title: "Owner + Admin Dashboards",
      description:
        "Role-based views: registrants see their own records and status, admins see everything. File upload, document review, and status transitions all in-app.",
      timeline: "Day 10–16",
    },
    {
      step: "05",
      title: "Privacy QA",
      description:
        "Test that public search never exposes private data under any query permutation. Edge cases — partial matches, flagged records, expired registrations — all verified before handoff.",
      timeline: "Day 17–20",
    },
  ],

  skillCategories: [
    {
      label: "No-Code & Bubble",
      skills: [
        "Bubble.io",
        "No-Code Architecture",
        "Workflow Logic",
        "Data Types & Privacy Rules",
      ],
    },
    {
      label: "Database & Data Modeling",
      skills: [
        "Schema Design",
        "Relational Data Modeling",
        "Public vs. Private Field Separation",
        "Access Control Patterns",
      ],
    },
    {
      label: "Payments & Integrations",
      skills: [
        "Stripe Checkout",
        "Stripe Webhooks",
        "Payment → Record Automation",
        "File Upload Handling",
      ],
    },
    {
      label: "Frontend & UI",
      skills: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "shadcn/ui",
        "Responsive Design",
      ],
    },
  ],

  cta: {
    headline: "Ready to build this properly.",
    body: "Your 3-day manual process — application intake, payment, document review, certificate issue — can be a single automated flow. I've built the architecture. Let's talk about the real system.",
    action: "Reply on Upwork to start",
    availability: "Currently available for new projects",
  },
};

// Type helpers for page.tsx
export type ProposalData = typeof proposalData;
export type PortfolioProject = (typeof proposalData.portfolioProjects)[number];
export type ApproachStep = (typeof proposalData.approachSteps)[number];
export type SkillCategory = (typeof proposalData.skillCategories)[number];
