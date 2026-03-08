import type {
  Registrant,
  Registration,
  SupportingDocument,
  Certificate,
  Application,
  ServicePlan,
  Transaction,
  ActivityLogEntry,
  DashboardStats,
  MonthlyRevenueDataPoint,
  StatusBreakdownDataPoint,
  MonthlyApplicationDataPoint,
  RegistrationTypeBreakdownPoint,
} from "@/lib/types";

// ---------------------------------------------------------------------------
// Date helpers (all dates relative to March 8, 2026)
// ---------------------------------------------------------------------------

const iso = (year: number, month: number, day: number): string => {
  const mm = String(month).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  return `${year}-${mm}-${dd}`;
};

// ---------------------------------------------------------------------------
// Service Plans (the 4 Stripe services)
// ---------------------------------------------------------------------------

export const servicePlans: ServicePlan[] = [
  {
    id: "svc_nr001",
    serviceType: "New Registration",
    price: 125,
    description: "Initial registration for a new contractor classification.",
    stripeProductId: "prod_NR8821xf9m2",
  },
  {
    id: "svc_ar002",
    serviceType: "Annual Renewal",
    price: 95,
    description: "Annual renewal of an existing active registration.",
    stripeProductId: "prod_AR4410p3k7n",
  },
  {
    id: "svc_sc003",
    serviceType: "Status Change / Amendment",
    price: 60,
    description: "Update to classification level, business name, or contact information.",
    stripeProductId: "prod_SC2294m1r6t",
  },
  {
    id: "svc_dc004",
    serviceType: "Duplicate Certificate",
    price: 35,
    description: "Replacement copy of a lost or damaged registration certificate.",
    stripeProductId: "prod_DC9043b4n9s",
  },
];

// ---------------------------------------------------------------------------
// Registrants
// ---------------------------------------------------------------------------

export const registrants: Registrant[] = [
  {
    id: "rgnt_k8m2p",
    role: "registrant",
    fullName: "Marcus Delgado",
    businessName: "Delgado General Contracting LLC",
    email: "marcus.delgado@delgadogc.com",
    phone: "(512) 847-3291",
    licenseNumber: "LIC-TX-084291",
    createdAt: iso(2021, 3, 14),
    activeRegistrationCount: 2,
  },
  {
    id: "rgnt_p3k7n",
    role: "registrant",
    fullName: "Sarah Okonkwo",
    businessName: "Okonkwo Electrical Services Inc.",
    email: "sarah@okonkwoelec.com",
    phone: "(713) 920-5847",
    licenseNumber: "LIC-TX-091847",
    createdAt: iso(2022, 7, 2),
    activeRegistrationCount: 1,
  },
  {
    id: "rgnt_m1r6t",
    role: "registrant",
    fullName: "James Whitfield",
    businessName: "Whitfield Mechanical Systems",
    email: "james.whitfield@whitfieldmech.net",
    phone: "(281) 634-7103",
    licenseNumber: "LIC-TX-077103",
    createdAt: iso(2020, 11, 22),
    activeRegistrationCount: 1,
  },
  {
    id: "rgnt_b4n9s",
    role: "registrant",
    fullName: "Luis Ramírez",
    businessName: "Ramírez Plumbing & Drain Co.",
    email: "luis@ramirezplumbing.com",
    phone: "(469) 382-9104",
    licenseNumber: "LIC-TX-102938",
    createdAt: iso(2023, 1, 9),
    activeRegistrationCount: 1,
  },
  {
    id: "rgnt_x7q3n",
    role: "registrant",
    fullName: "Donna Fitzgerald",
    businessName: "Fitzgerald HVAC Solutions",
    email: "donna@fitzgeraldhvac.biz",
    phone: "(214) 551-8320",
    licenseNumber: "LIC-TX-088320",
    createdAt: iso(2021, 9, 18),
    activeRegistrationCount: 1,
  },
  {
    id: "rgnt_9x3q1",
    role: "registrant",
    fullName: "Andre Beaumont",
    businessName: "Beaumont Fire & Safety LLC",
    email: "andre.beaumont@beaumontfire.com",
    phone: "(832) 714-6047",
    licenseNumber: "LIC-TX-064047",
    createdAt: iso(2019, 5, 30),
    activeRegistrationCount: 1,
  },
  {
    id: "rgnt_7xp2m",
    role: "registrant",
    fullName: "Priya Sharma",
    businessName: "Sharma Roofing Group",
    email: "priya.sharma@sharmaroofing.com",
    phone: "(972) 203-8841",
    licenseNumber: "LIC-TX-118841",
    createdAt: iso(2023, 6, 14),
    activeRegistrationCount: 1,
  },
  {
    id: "rgnt_4mn8x",
    role: "registrant",
    fullName: "Kevin O'Brien",
    businessName: "O'Brien Demolition Services",
    email: "kevin@obriendemolition.com",
    phone: "(915) 490-2367",
    licenseNumber: "LIC-TX-059821",
    createdAt: iso(2018, 2, 7),
    activeRegistrationCount: 0,
  },
  {
    id: "rgnt_6qr5j",
    role: "registrant",
    fullName: "Natasha Volkov",
    businessName: "Volkov Commercial Inspections LLC",
    email: "natasha.volkov@volkovinspect.com",
    phone: "(210) 388-7490",
    licenseNumber: "LIC-TX-094490",
    createdAt: iso(2022, 4, 28),
    activeRegistrationCount: 1,
  },
  {
    id: "rgnt_2wq9k",
    role: "registrant",
    fullName: "Tommy Huang",
    businessName: "Huang General Contracting",
    email: "tommy@huanggc.net",
    phone: "(817) 622-0193",
    licenseNumber: "LIC-TX-130193",
    createdAt: iso(2024, 8, 15),
    activeRegistrationCount: 0,
  },
  {
    id: "rgnt_r5n8p",
    role: "registrant",
    fullName: "Roberto Castellano",
    businessName: "Castellano & Sons Electrical",
    email: "rcastellano@castellanoelec.com",
    phone: "(713) 847-5512",
    licenseNumber: "LIC-TX-075512",
    createdAt: iso(2020, 6, 3),
    activeRegistrationCount: 1,
  },
  {
    id: "rgnt_t1q8z",
    role: "registrant",
    fullName: "Bridget Nwachukwu",
    businessName: "Nwachukwu Mechanical LLC",
    email: "bridget.nw@nwachukwumech.com",
    phone: "(281) 963-4027",
    licenseNumber: "LIC-TX-109274",
    createdAt: iso(2023, 11, 20),
    activeRegistrationCount: 1,
  },
];

// ---------------------------------------------------------------------------
// Supporting Documents (inline, referenced by registrations)
// ---------------------------------------------------------------------------

const makeDoc = (
  id: string,
  registrationId: string,
  type: SupportingDocument["type"],
  fileName: string,
  uploadedAt: string,
  status: SupportingDocument["status"],
  expiresAt?: string | null,
  rejectionNote?: string | null,
): SupportingDocument => ({
  id,
  registrationId,
  type,
  fileName,
  uploadedAt,
  expiresAt: expiresAt ?? null,
  status,
  rejectionNote: rejectionNote ?? null,
  visibility: "admin-only",
});

// ---------------------------------------------------------------------------
// Registrations — 17 records, realistic status distribution
// ---------------------------------------------------------------------------

export const registrations: Registration[] = [
  // --- REG-2024-08847 | Marcus Delgado | GC-II | Active ---------------------
  {
    id: "reg_k8m2p",
    registrationNumber: "REG-2024-08847",
    registrantId: "rgnt_k8m2p",
    registrantName: "Marcus Delgado",
    businessName: "Delgado General Contracting LLC",
    registrationType: "General Contractor (GC-II)",
    status: "Active",
    issuanceDate: iso(2024, 3, 11),
    expiryDate: iso(2026, 3, 10),
    lastRenewalDate: iso(2025, 3, 8),
    daysUntilExpiry: 2,
    inRenewalWindow: true,
    inGracePeriod: false,
    documents: [
      makeDoc("doc_a1b2c", "reg_k8m2p", "Business License", "delgado_biz_license_2026.pdf", iso(2025, 2, 14), "Verified", iso(2026, 12, 31)),
      makeDoc("doc_d3e4f", "reg_k8m2p", "Liability Insurance Certificate", "delgado_liability_ins_2025.pdf", iso(2025, 2, 14), "Verified", iso(2026, 1, 31)),
      makeDoc("doc_g5h6i", "reg_k8m2p", "Government-Issued ID", "delgado_dl_front.pdf", iso(2024, 3, 5), "Verified"),
      makeDoc("doc_j7k8l", "reg_k8m2p", "Proof of Training/Certification", "delgado_gc2_cert.pdf", iso(2024, 3, 5), "Verified"),
    ],
    adminNote: "Priority renewal due — expiry in 2 days. Contacted registrant via email 2026-03-06.",
    flagReason: null,
    applicationId: "app_k8m2p",
    createdAt: iso(2024, 3, 8),
    updatedAt: iso(2026, 3, 6),
  },

  // --- REG-2024-09102 | Marcus Delgado | Electrical Contractor | Active -----
  {
    id: "reg_a1x9r",
    registrationNumber: "REG-2024-09102",
    registrantId: "rgnt_k8m2p",
    registrantName: "Marcus Delgado",
    businessName: "Delgado General Contracting LLC",
    registrationType: "Electrical Contractor",
    status: "Active",
    issuanceDate: iso(2024, 7, 22),
    expiryDate: iso(2026, 7, 21),
    lastRenewalDate: null,
    daysUntilExpiry: 135,
    inRenewalWindow: false,
    inGracePeriod: false,
    documents: [
      makeDoc("doc_m9n0p", "reg_a1x9r", "Business License", "delgado_biz_license_2026.pdf", iso(2025, 2, 14), "Verified", iso(2026, 12, 31)),
      makeDoc("doc_q1r2s", "reg_a1x9r", "Liability Insurance Certificate", "delgado_liability_ins_2025.pdf", iso(2025, 2, 14), "Verified", iso(2026, 1, 31)),
      makeDoc("doc_t3u4v", "reg_a1x9r", "Proof of Training/Certification", "delgado_elec_endorsement.pdf", iso(2024, 7, 18), "Verified"),
    ],
    adminNote: null,
    flagReason: null,
    applicationId: "app_a1x9r",
    createdAt: iso(2024, 7, 15),
    updatedAt: iso(2024, 7, 22),
  },

  // --- REG-2023-07341 | Sarah Okonkwo | Electrical Contractor | Active ------
  {
    id: "reg_p3k7n",
    registrationNumber: "REG-2023-07341",
    registrantId: "rgnt_p3k7n",
    registrantName: "Sarah Okonkwo",
    businessName: "Okonkwo Electrical Services Inc.",
    registrationType: "Electrical Contractor",
    status: "Active",
    issuanceDate: iso(2023, 9, 4),
    expiryDate: iso(2026, 9, 3),
    lastRenewalDate: iso(2024, 9, 2),
    daysUntilExpiry: 179,
    inRenewalWindow: false,
    inGracePeriod: false,
    documents: [
      makeDoc("doc_w5x6y", "reg_p3k7n", "Business License", "okonkwo_license_2025.pdf", iso(2024, 8, 20), "Verified", iso(2026, 9, 30)),
      makeDoc("doc_z7a8b", "reg_p3k7n", "Liability Insurance Certificate", "okonkwo_ins_cert.pdf", iso(2024, 8, 20), "Verified", iso(2026, 8, 31)),
      makeDoc("doc_c9d0e", "reg_p3k7n", "Government-Issued ID", "okonkwo_passport_scan.pdf", iso(2023, 8, 30), "Verified"),
      makeDoc("doc_f1g2h", "reg_p3k7n", "Proof of Training/Certification", "okonkwo_journeyman_cert.pdf", iso(2023, 8, 30), "Verified"),
    ],
    adminNote: null,
    flagReason: null,
    applicationId: "app_p3k7n",
    createdAt: iso(2023, 8, 22),
    updatedAt: iso(2024, 9, 2),
  },

  // --- REG-2022-05814 | James Whitfield | Mechanical Systems | Active -------
  {
    id: "reg_m1r6t",
    registrationNumber: "REG-2022-05814",
    registrantId: "rgnt_m1r6t",
    registrantName: "James Whitfield",
    businessName: "Whitfield Mechanical Systems",
    registrationType: "Mechanical Systems",
    status: "Active",
    issuanceDate: iso(2022, 4, 18),
    expiryDate: iso(2026, 4, 17),
    lastRenewalDate: iso(2025, 4, 15),
    daysUntilExpiry: 40,
    inRenewalWindow: true,
    inGracePeriod: false,
    documents: [
      makeDoc("doc_i3j4k", "reg_m1r6t", "Business License", "whitfield_biz_license.pdf", iso(2025, 3, 28), "Verified", iso(2027, 1, 31)),
      makeDoc("doc_l5m6n", "reg_m1r6t", "Liability Insurance Certificate", "whitfield_ins_2025.pdf", iso(2025, 3, 28), "Verified", iso(2026, 4, 30)),
      makeDoc("doc_o7p8q", "reg_m1r6t", "Proof of Training/Certification", "whitfield_mech_license.pdf", iso(2022, 4, 10), "Verified"),
    ],
    adminNote: "Renewal window open. Registrant notified by automated email 2026-02-07.",
    flagReason: null,
    applicationId: "app_m1r6t",
    createdAt: iso(2022, 4, 1),
    updatedAt: iso(2025, 4, 15),
  },

  // --- REG-2025-11493 | Luis Ramírez | Plumbing Contractor | Pending Review --
  {
    id: "reg_b4n9s",
    registrationNumber: "REG-2025-11493",
    registrantId: "rgnt_b4n9s",
    registrantName: "Luis Ramírez",
    businessName: "Ramírez Plumbing & Drain Co.",
    registrationType: "Plumbing Contractor",
    status: "Pending Review",
    issuanceDate: iso(2026, 1, 1), // placeholder; not yet issued
    expiryDate: iso(2027, 1, 1),
    lastRenewalDate: null,
    daysUntilExpiry: 329,
    inRenewalWindow: false,
    inGracePeriod: false,
    documents: [
      makeDoc("doc_r9s0t", "reg_b4n9s", "Business License", "ramirez_business_license.pdf", iso(2026, 2, 17), "Pending Verification", iso(2027, 3, 31)),
      makeDoc("doc_u1v2w", "reg_b4n9s", "Liability Insurance Certificate", "ramirez_ins_cert.pdf", iso(2026, 2, 17), "Verified", iso(2027, 2, 28)),
      makeDoc("doc_x3y4z", "reg_b4n9s", "Government-Issued ID", "ramirez_dl.pdf", iso(2026, 2, 17), "Verified"),
      // Missing training cert — edge case: application submitted with incomplete docs
    ],
    adminNote: "Application under review. Liability insurance verified. Business license pending secondary check. Training certification not uploaded — flagged for follow-up.",
    flagReason: null,
    applicationId: "app_b4n9s",
    createdAt: iso(2026, 2, 17),
    updatedAt: iso(2026, 3, 2),
  },

  // --- REG-2025-11701 | Donna Fitzgerald | HVAC Systems | Pending Review ----
  {
    id: "reg_x7q3n",
    registrationNumber: "REG-2025-11701",
    registrantId: "rgnt_x7q3n",
    registrantName: "Donna Fitzgerald",
    businessName: "Fitzgerald HVAC Solutions",
    registrationType: "HVAC Systems",
    status: "Pending Review",
    issuanceDate: iso(2026, 1, 1),
    expiryDate: iso(2027, 1, 1),
    lastRenewalDate: null,
    daysUntilExpiry: 329,
    inRenewalWindow: false,
    inGracePeriod: false,
    documents: [
      makeDoc("doc_a5b6c", "reg_x7q3n", "Business License", "fitzgerald_license_2026.pdf", iso(2026, 2, 28), "Pending Verification", iso(2027, 2, 28)),
      makeDoc("doc_d7e8f", "reg_x7q3n", "Liability Insurance Certificate", "fitzgerald_ins.pdf", iso(2026, 2, 28), "Pending Verification", iso(2027, 2, 28)),
      makeDoc("doc_g9h0i", "reg_x7q3n", "Government-Issued ID", "fitzgerald_passport.pdf", iso(2026, 2, 28), "Verified"),
      makeDoc("doc_j1k2l", "reg_x7q3n", "Proof of Training/Certification", "fitzgerald_hvac_cert.pdf", iso(2026, 2, 28), "Pending Verification"),
    ],
    adminNote: "New application — all documents uploaded, standard review cycle in progress.",
    flagReason: null,
    applicationId: "app_x7q3n",
    createdAt: iso(2026, 2, 28),
    updatedAt: iso(2026, 3, 1),
  },

  // --- REG-2021-03907 | Andre Beaumont | Fire Suppression | Active ----------
  {
    id: "reg_9x3q1",
    registrationNumber: "REG-2021-03907",
    registrantId: "rgnt_9x3q1",
    registrantName: "Andre Beaumont",
    businessName: "Beaumont Fire & Safety LLC",
    registrationType: "Fire Suppression",
    status: "Active",
    issuanceDate: iso(2021, 8, 14),
    expiryDate: iso(2026, 8, 13),
    lastRenewalDate: iso(2025, 8, 11),
    daysUntilExpiry: 158,
    inRenewalWindow: false,
    inGracePeriod: false,
    documents: [
      makeDoc("doc_m3n4o", "reg_9x3q1", "Business License", "beaumont_biz_license.pdf", iso(2025, 7, 22), "Verified", iso(2027, 1, 31)),
      makeDoc("doc_p5q6r", "reg_9x3q1", "Liability Insurance Certificate", "beaumont_ins_2025.pdf", iso(2025, 7, 22), "Verified", iso(2026, 8, 31)),
      makeDoc("doc_s7t8u", "reg_9x3q1", "Proof of Training/Certification", "beaumont_fire_suppression_cert.pdf", iso(2021, 8, 9), "Verified"),
    ],
    adminNote: null,
    flagReason: null,
    applicationId: "app_9x3q1",
    createdAt: iso(2021, 8, 2),
    updatedAt: iso(2025, 8, 11),
  },

  // --- REG-2024-10277 | Priya Sharma | Roofing Contractor | Pending Payment -
  {
    id: "reg_7xp2m",
    registrationNumber: "REG-2024-10277",
    registrantId: "rgnt_7xp2m",
    registrantName: "Priya Sharma",
    businessName: "Sharma Roofing Group",
    registrationType: "Roofing Contractor",
    status: "Pending Payment",
    issuanceDate: iso(2026, 1, 1),
    expiryDate: iso(2027, 1, 1),
    lastRenewalDate: null,
    daysUntilExpiry: 329,
    inRenewalWindow: false,
    inGracePeriod: false,
    documents: [
      makeDoc("doc_v9w0x", "reg_7xp2m", "Business License", "sharma_license.pdf", iso(2026, 1, 18), "Verified", iso(2027, 4, 30)),
      makeDoc("doc_y1z2a", "reg_7xp2m", "Liability Insurance Certificate", "sharma_ins.pdf", iso(2026, 1, 18), "Verified", iso(2027, 1, 31)),
      makeDoc("doc_b3c4d", "reg_7xp2m", "Government-Issued ID", "sharma_dl.pdf", iso(2026, 1, 18), "Verified"),
      makeDoc("doc_e5f6g", "reg_7xp2m", "Proof of Training/Certification", "sharma_roofing_cert.pdf", iso(2026, 1, 18), "Verified"),
    ],
    adminNote: "Application fully reviewed and approved. Payment not received — Stripe checkout session expired 2026-02-04. Follow-up email sent 2026-02-05.",
    flagReason: null,
    applicationId: "app_7xp2m",
    createdAt: iso(2026, 1, 15),
    updatedAt: iso(2026, 2, 5),
  },

  // --- REG-2020-01847 | Kevin O'Brien | Demolition Contractor | Expired -----
  {
    id: "reg_4mn8x",
    registrationNumber: "REG-2020-01847",
    registrantId: "rgnt_4mn8x",
    registrantName: "Kevin O'Brien",
    businessName: "O'Brien Demolition Services",
    registrationType: "Demolition Contractor",
    status: "Expired",
    issuanceDate: iso(2020, 5, 29),
    expiryDate: iso(2025, 5, 28),
    lastRenewalDate: iso(2024, 5, 24),
    daysUntilExpiry: -284,
    inRenewalWindow: false,
    inGracePeriod: false,
    documents: [
      makeDoc("doc_h7i8j", "reg_4mn8x", "Business License", "obrien_license_2023.pdf", iso(2024, 4, 30), "Expired", iso(2025, 3, 31)),
      makeDoc("doc_k9l0m", "reg_4mn8x", "Liability Insurance Certificate", "obrien_ins_2024.pdf", iso(2024, 4, 30), "Expired", iso(2025, 5, 31)),
      makeDoc("doc_n1o2p", "reg_4mn8x", "Proof of Training/Certification", "obrien_demo_cert.pdf", iso(2020, 5, 20), "Verified"),
    ],
    adminNote: "Registration expired 2025-05-28. No renewal application received. Contractor removed from public lookup as of 2025-06-28.",
    flagReason: null,
    applicationId: "app_4mn8x_orig",
    createdAt: iso(2020, 5, 14),
    updatedAt: iso(2025, 6, 28),
  },

  // --- REG-2023-06529 | Natasha Volkov | Comm. Building Inspector | Active --
  {
    id: "reg_6qr5j",
    registrationNumber: "REG-2023-06529",
    registrantId: "rgnt_6qr5j",
    registrantName: "Natasha Volkov",
    businessName: "Volkov Commercial Inspections LLC",
    registrationType: "Commercial Building Inspector",
    status: "Active",
    issuanceDate: iso(2023, 6, 12),
    expiryDate: iso(2026, 6, 11),
    lastRenewalDate: iso(2025, 6, 9),
    daysUntilExpiry: 95,
    inRenewalWindow: false,
    inGracePeriod: false,
    documents: [
      makeDoc("doc_q3r4s", "reg_6qr5j", "Business License", "volkov_license.pdf", iso(2025, 5, 30), "Verified", iso(2027, 2, 28)),
      makeDoc("doc_t5u6v", "reg_6qr5j", "Liability Insurance Certificate", "volkov_ins_2025.pdf", iso(2025, 5, 30), "Verified", iso(2026, 6, 30)),
      makeDoc("doc_w7x8y", "reg_6qr5j", "Government-Issued ID", "volkov_dl.pdf", iso(2023, 6, 5), "Verified"),
      makeDoc("doc_z9a0b", "reg_6qr5j", "Proof of Training/Certification", "volkov_inspector_cert.pdf", iso(2023, 6, 5), "Verified"),
    ],
    adminNote: null,
    flagReason: null,
    applicationId: "app_6qr5j",
    createdAt: iso(2023, 6, 1),
    updatedAt: iso(2025, 6, 9),
  },

  // --- REG-2025-11842 | Tommy Huang | GC-I | Incomplete -------------------
  {
    id: "reg_2wq9k",
    registrationNumber: "REG-2025-11842",
    registrantId: "rgnt_2wq9k",
    registrantName: "Tommy Huang",
    businessName: "Huang General Contracting",
    registrationType: "General Contractor (GC-I)",
    status: "Incomplete",
    issuanceDate: iso(2026, 1, 1),
    expiryDate: iso(2027, 1, 1),
    lastRenewalDate: null,
    daysUntilExpiry: 329,
    inRenewalWindow: false,
    inGracePeriod: false,
    documents: [
      makeDoc("doc_c1d2e", "reg_2wq9k", "Business License", "huang_biz_license.pdf", iso(2026, 1, 28), "Pending Verification", iso(2027, 8, 31)),
      makeDoc("doc_f3g4h", "reg_2wq9k", "Government-Issued ID", "huang_passport.pdf", iso(2026, 1, 28), "Verified"),
      // Missing: Liability Insurance Certificate & Training Cert
    ],
    adminNote: "Application incomplete. Registrant notified: missing Liability Insurance Certificate and Proof of Training/Certification. No response in 14 days.",
    flagReason: null,
    applicationId: "app_2wq9k",
    createdAt: iso(2026, 1, 28),
    updatedAt: iso(2026, 2, 18),
  },

  // --- REG-2021-04112 | Roberto Castellano | Electrical Contractor | Active -
  {
    id: "reg_r5n8p",
    registrationNumber: "REG-2021-04112",
    registrantId: "rgnt_r5n8p",
    registrantName: "Roberto Castellano",
    businessName: "Castellano & Sons Electrical",
    registrationType: "Electrical Contractor",
    status: "Active",
    issuanceDate: iso(2021, 9, 20),
    expiryDate: iso(2026, 9, 19),
    lastRenewalDate: iso(2025, 9, 17),
    daysUntilExpiry: 195,
    inRenewalWindow: false,
    inGracePeriod: false,
    documents: [
      makeDoc("doc_i5j6k", "reg_r5n8p", "Business License", "castellano_license.pdf", iso(2025, 8, 28), "Verified", iso(2027, 3, 31)),
      makeDoc("doc_l7m8n", "reg_r5n8p", "Liability Insurance Certificate", "castellano_ins_2025.pdf", iso(2025, 8, 28), "Verified", iso(2026, 9, 30)),
      makeDoc("doc_o9p0q", "reg_r5n8p", "Proof of Training/Certification", "castellano_master_elec.pdf", iso(2021, 9, 14), "Verified"),
    ],
    adminNote: null,
    flagReason: null,
    applicationId: "app_r5n8p",
    createdAt: iso(2021, 9, 7),
    updatedAt: iso(2025, 9, 17),
  },

  // --- REG-2024-10841 | Bridget Nwachukwu | Mechanical Systems | Under Review
  {
    id: "reg_t1q8z",
    registrationNumber: "REG-2024-10841",
    registrantId: "rgnt_t1q8z",
    registrantName: "Bridget Nwachukwu",
    businessName: "Nwachukwu Mechanical LLC",
    registrationType: "Mechanical Systems",
    status: "Under Review",
    issuanceDate: iso(2026, 1, 1),
    expiryDate: iso(2027, 1, 1),
    lastRenewalDate: null,
    daysUntilExpiry: 329,
    inRenewalWindow: false,
    inGracePeriod: false,
    documents: [
      makeDoc("doc_r1s2t", "reg_t1q8z", "Business License", "nwachukwu_license.pdf", iso(2026, 2, 10), "Verified", iso(2027, 6, 30)),
      makeDoc("doc_u3v4w", "reg_t1q8z", "Liability Insurance Certificate", "nwachukwu_ins.pdf", iso(2026, 2, 10), "Verified", iso(2027, 2, 28)),
      makeDoc("doc_x5y6z", "reg_t1q8z", "Government-Issued ID", "nwachukwu_dl.pdf", iso(2026, 2, 10), "Verified"),
      makeDoc("doc_a7b8c", "reg_t1q8z", "Proof of Training/Certification", "nwachukwu_mech_cert.pdf", iso(2026, 2, 10), "Pending Verification"),
    ],
    adminNote: "Third-party verification of training certification requested from issuing body. Awaiting response.",
    flagReason: null,
    applicationId: "app_t1q8z",
    createdAt: iso(2026, 2, 10),
    updatedAt: iso(2026, 2, 24),
  },

  // --- REG-2019-00341 | Kevin O'Brien | Demolition Contractor | Expired (2nd)
  {
    id: "reg_4mn8x_2",
    registrationNumber: "REG-2019-00341",
    registrantId: "rgnt_4mn8x",
    registrantName: "Kevin O'Brien",
    businessName: "O'Brien Demolition Services",
    registrationType: "General Contractor (GC-I)",
    status: "Expired",
    issuanceDate: iso(2019, 3, 1),
    expiryDate: iso(2024, 2, 28),
    lastRenewalDate: iso(2023, 2, 24),
    daysUntilExpiry: -739,
    inRenewalWindow: false,
    inGracePeriod: false,
    documents: [
      makeDoc("doc_d9e0f", "reg_4mn8x_2", "Business License", "obrien_gc_license_old.pdf", iso(2023, 2, 5), "Expired", iso(2024, 1, 31)),
      makeDoc("doc_g1h2i", "reg_4mn8x_2", "Proof of Training/Certification", "obrien_gc1_cert.pdf", iso(2019, 2, 22), "Verified"),
    ],
    adminNote: "Registration lapsed without renewal. Contractor holds separate active demolition registration.",
    flagReason: null,
    applicationId: "app_4mn8x_gc",
    createdAt: iso(2019, 2, 18),
    updatedAt: iso(2024, 4, 1),
  },

  // --- REG-2022-06003 | Sarah Okonkwo | Plumbing Contractor | Suspended -----
  {
    id: "reg_p3k7n_s",
    registrationNumber: "REG-2022-06003",
    registrantId: "rgnt_p3k7n",
    registrantName: "Sarah Okonkwo",
    businessName: "Okonkwo Electrical Services Inc.",
    registrationType: "Plumbing Contractor",
    status: "Suspended",
    issuanceDate: iso(2022, 11, 8),
    expiryDate: iso(2026, 11, 7),
    lastRenewalDate: iso(2025, 11, 3),
    daysUntilExpiry: 244,
    inRenewalWindow: false,
    inGracePeriod: false,
    documents: [
      makeDoc("doc_j3k4l", "reg_p3k7n_s", "Business License", "okonkwo_plumbing_license.pdf", iso(2025, 10, 25), "Verified", iso(2026, 10, 31)),
      makeDoc("doc_m5n6o", "reg_p3k7n_s", "Liability Insurance Certificate", "okonkwo_plumbing_ins.pdf", iso(2025, 10, 25), "Expired", iso(2026, 2, 28)),
    ],
    adminNote: "Suspended 2026-01-15 — liability insurance certificate lapsed. Registrant notified. Reinstatement requires updated insurance certificate and $60 amendment fee.",
    flagReason: "Liability insurance expired 2026-02-28 — suspension triggered per §4.3(b) of Registry Rules.",
    applicationId: "app_p3k7n_s",
    createdAt: iso(2022, 10, 28),
    updatedAt: iso(2026, 1, 15),
  },

  // --- REG-2023-08419 | Andre Beaumont | GC-III | Flagged -------------------
  {
    id: "reg_9x3q1_f",
    registrationNumber: "REG-2023-08419",
    registrantId: "rgnt_9x3q1",
    registrantName: "Andre Beaumont",
    businessName: "Beaumont Fire & Safety LLC",
    registrationType: "General Contractor (GC-III)",
    status: "Flagged",
    issuanceDate: iso(2023, 5, 3),
    expiryDate: iso(2026, 5, 2),
    lastRenewalDate: iso(2025, 4, 30),
    daysUntilExpiry: 55,
    inRenewalWindow: true,
    inGracePeriod: false,
    documents: [
      makeDoc("doc_p7q8r", "reg_9x3q1_f", "Business License", "beaumont_gc3_license.pdf", iso(2025, 4, 14), "Verified", iso(2027, 1, 31)),
      makeDoc("doc_s9t0u", "reg_9x3q1_f", "Liability Insurance Certificate", "beaumont_gc3_ins.pdf", iso(2025, 4, 14), "Verified", iso(2026, 5, 31)),
      makeDoc("doc_v1w2x", "reg_9x3q1_f", "Proof of Training/Certification", "beaumont_gc3_cert.pdf", iso(2023, 4, 28), "Verified"),
    ],
    adminNote: "FLAGGED: System detected possible duplicate — registrant holds REG-2021-03907 (Fire Suppression, Active). GC-III classification review required before renewal is processed. Escalated to Registry Director 2026-02-19.",
    flagReason: "Possible duplicate registration detected. Classification audit in progress.",
    applicationId: "app_9x3q1_f",
    createdAt: iso(2023, 4, 20),
    updatedAt: iso(2026, 2, 19),
  },

  // --- REG-2023-07788 | James Whitfield | HVAC Systems | Active (in grace) --
  {
    id: "reg_m1r6t_g",
    registrationNumber: "REG-2023-07788",
    registrantId: "rgnt_m1r6t",
    registrantName: "James Whitfield",
    businessName: "Whitfield Mechanical Systems",
    registrationType: "HVAC Systems",
    status: "Active",
    issuanceDate: iso(2023, 1, 20),
    expiryDate: iso(2026, 2, 14),
    lastRenewalDate: iso(2025, 2, 10),
    daysUntilExpiry: -22,
    inRenewalWindow: false,
    inGracePeriod: true,   // edge case: expired but within 60-day grace period
    documents: [
      makeDoc("doc_y3z4a", "reg_m1r6t_g", "Business License", "whitfield_hvac_license.pdf", iso(2025, 1, 28), "Verified", iso(2027, 1, 31)),
      makeDoc("doc_b5c6d", "reg_m1r6t_g", "Liability Insurance Certificate", "whitfield_hvac_ins.pdf", iso(2025, 1, 28), "Verified", iso(2026, 2, 28)),
      makeDoc("doc_e7f8g", "reg_m1r6t_g", "Proof of Training/Certification", "whitfield_hvac_cert.pdf", iso(2023, 1, 15), "Verified"),
    ],
    adminNote: "Registration expired 2026-02-14. 60-day grace period active — expires 2026-04-15. Renewal renewal payment received 2026-03-01, processing pending.",
    flagReason: null,
    applicationId: "app_m1r6t_g",
    createdAt: iso(2023, 1, 5),
    updatedAt: iso(2026, 3, 1),
  },
];

// ---------------------------------------------------------------------------
// Applications
// ---------------------------------------------------------------------------

export const applications: Application[] = [
  {
    id: "app_k8m2p",
    registrantId: "rgnt_k8m2p",
    registrantName: "Marcus Delgado",
    registrationType: "General Contractor (GC-II)",
    status: "Approved",
    submittedAt: iso(2024, 3, 8),
    reviewedAt: iso(2024, 3, 11),
    reviewedBy: "Registry Admin — J. Harmon",
    rejectionReason: null,
    paymentIntentId: "pi_3OgKT2Lx8z1a9B2J3hM",
    serviceFee: 125,
    createdAt: iso(2024, 3, 8),
  },
  {
    id: "app_b4n9s",
    registrantId: "rgnt_b4n9s",
    registrantName: "Luis Ramírez",
    registrationType: "Plumbing Contractor",
    status: "Under Review",
    submittedAt: iso(2026, 2, 17),
    reviewedAt: null,
    reviewedBy: null,
    rejectionReason: null,
    paymentIntentId: "pi_7RjMX4Px9q2b0C3K4fN",
    serviceFee: 125,
    createdAt: iso(2026, 2, 17),
  },
  {
    id: "app_x7q3n",
    registrantId: "rgnt_x7q3n",
    registrantName: "Donna Fitzgerald",
    registrationType: "HVAC Systems",
    status: "Under Review",
    submittedAt: iso(2026, 2, 28),
    reviewedAt: null,
    reviewedBy: null,
    rejectionReason: null,
    paymentIntentId: "pi_2NkLP8Sy0r3c1D4L5gO",
    serviceFee: 125,
    createdAt: iso(2026, 2, 28),
  },
  {
    id: "app_7xp2m",
    registrantId: "rgnt_7xp2m",
    registrantName: "Priya Sharma",
    registrationType: "Roofing Contractor",
    status: "Approved",
    submittedAt: iso(2026, 1, 15),
    reviewedAt: iso(2026, 1, 22),
    reviewedBy: "Registry Admin — T. Vasquez",
    rejectionReason: null,
    paymentIntentId: null, // payment never completed
    serviceFee: 125,
    createdAt: iso(2026, 1, 15),
  },
  {
    id: "app_2wq9k",
    registrantId: "rgnt_2wq9k",
    registrantName: "Tommy Huang",
    registrationType: "General Contractor (GC-I)",
    status: "Submitted",
    submittedAt: iso(2026, 1, 28),
    reviewedAt: null,
    reviewedBy: null,
    rejectionReason: null,
    paymentIntentId: "pi_5PmNQ9Tz1s4d2E5M6hP",
    serviceFee: 125,
    createdAt: iso(2026, 1, 28),
  },
];

// ---------------------------------------------------------------------------
// Certificates
// ---------------------------------------------------------------------------

export const certificates: Certificate[] = [
  {
    id: "cert_k8m2p",
    registrationId: "reg_k8m2p",
    registrationNumber: "REG-2024-08847",
    registrantName: "Marcus Delgado",
    registrationType: "General Contractor (GC-II)",
    issuedAt: iso(2025, 3, 8),
    expiresAt: iso(2026, 3, 10),
    verificationToken: "TKN-GC2-84291-VRF",
    isDuplicate: false,
    duplicateTransactionId: null,
  },
  {
    id: "cert_p3k7n",
    registrationId: "reg_p3k7n",
    registrationNumber: "REG-2023-07341",
    registrantName: "Sarah Okonkwo",
    registrationType: "Electrical Contractor",
    issuedAt: iso(2024, 9, 2),
    expiresAt: iso(2026, 9, 3),
    verificationToken: "TKN-EC-91847-VRF",
    isDuplicate: false,
    duplicateTransactionId: null,
  },
  {
    id: "cert_m1r6t_dup",
    registrationId: "reg_m1r6t",
    registrationNumber: "REG-2022-05814",
    registrantName: "James Whitfield",
    registrationType: "Mechanical Systems",
    issuedAt: iso(2025, 4, 15),
    expiresAt: iso(2026, 4, 17),
    verificationToken: "TKN-MS-77103-VRF",
    isDuplicate: true,
    duplicateTransactionId: "txn_dup_m1r6t",
  },
  {
    id: "cert_9x3q1",
    registrationId: "reg_9x3q1",
    registrationNumber: "REG-2021-03907",
    registrantName: "Andre Beaumont",
    registrationType: "Fire Suppression",
    issuedAt: iso(2025, 8, 11),
    expiresAt: iso(2026, 8, 13),
    verificationToken: "TKN-FS-64047-VRF",
    isDuplicate: false,
    duplicateTransactionId: null,
  },
  {
    id: "cert_6qr5j",
    registrationId: "reg_6qr5j",
    registrationNumber: "REG-2023-06529",
    registrantName: "Natasha Volkov",
    registrationType: "Commercial Building Inspector",
    issuedAt: iso(2025, 6, 9),
    expiresAt: iso(2026, 6, 11),
    verificationToken: "TKN-CBI-94490-VRF",
    isDuplicate: false,
    duplicateTransactionId: null,
  },
];

// ---------------------------------------------------------------------------
// Transactions — last 90 days
// ---------------------------------------------------------------------------

export const transactions: Transaction[] = [
  {
    id: "txn_8h2k4",
    registrationId: "reg_p3k7n",
    registrantId: "rgnt_p3k7n",
    registrantName: "Sarah Okonkwo",
    serviceType: "Annual Renewal",
    amount: 95,
    status: "Completed",
    stripePaymentIntentId: "pi_4LnOR5Qy2t5e3F6N7iQ",
    completedAt: `${iso(2024, 9, 2)}T14:37:22Z`,
    createdAt: `${iso(2024, 9, 2)}T14:35:09Z`,
  },
  {
    id: "txn_k8m2p_ren",
    registrationId: "reg_k8m2p",
    registrantId: "rgnt_k8m2p",
    registrantName: "Marcus Delgado",
    serviceType: "Annual Renewal",
    amount: 95,
    status: "Completed",
    stripePaymentIntentId: "pi_8QrST6Uz3u6f4G7O8jR",
    completedAt: `${iso(2025, 3, 8)}T09:12:47Z`,
    createdAt: `${iso(2025, 3, 8)}T09:10:33Z`,
  },
  {
    id: "txn_b4n9s",
    registrationId: "reg_b4n9s",
    registrantId: "rgnt_b4n9s",
    registrantName: "Luis Ramírez",
    serviceType: "New Registration",
    amount: 125,
    status: "Completed",
    stripePaymentIntentId: "pi_7RjMX4Px9q2b0C3K4fN",
    completedAt: `${iso(2026, 2, 17)}T10:54:18Z`,
    createdAt: `${iso(2026, 2, 17)}T10:52:03Z`,
  },
  {
    id: "txn_x7q3n",
    registrationId: "reg_x7q3n",
    registrantId: "rgnt_x7q3n",
    registrantName: "Donna Fitzgerald",
    serviceType: "New Registration",
    amount: 125,
    status: "Completed",
    stripePaymentIntentId: "pi_2NkLP8Sy0r3c1D4L5gO",
    completedAt: `${iso(2026, 2, 28)}T11:29:07Z`,
    createdAt: `${iso(2026, 2, 28)}T11:27:44Z`,
  },
  {
    id: "txn_7xp2m",
    registrationId: null,  // edge case: payment never completed
    registrantId: "rgnt_7xp2m",
    registrantName: "Priya Sharma",
    serviceType: "New Registration",
    amount: 125,
    status: "Abandoned",
    stripePaymentIntentId: "pi_9StUV7Vz4v7g5H8P9kS",
    completedAt: null,
    createdAt: `${iso(2026, 1, 30)}T15:03:52Z`,
    failureCode: "checkout_session_expired",
  },
  {
    id: "txn_2wq9k",
    registrationId: "reg_2wq9k",
    registrantId: "rgnt_2wq9k",
    registrantName: "Tommy Huang",
    serviceType: "New Registration",
    amount: 125,
    status: "Completed",
    stripePaymentIntentId: "pi_5PmNQ9Tz1s4d2E5M6hP",
    completedAt: `${iso(2026, 1, 28)}T08:41:33Z`,
    createdAt: `${iso(2026, 1, 28)}T08:39:17Z`,
  },
  {
    id: "txn_t1q8z",
    registrationId: "reg_t1q8z",
    registrantId: "rgnt_t1q8z",
    registrantName: "Bridget Nwachukwu",
    serviceType: "New Registration",
    amount: 125,
    status: "Completed",
    stripePaymentIntentId: "pi_0UvWX8Wa5w8h6I9Q0lT",
    completedAt: `${iso(2026, 2, 10)}T13:18:54Z`,
    createdAt: `${iso(2026, 2, 10)}T13:16:40Z`,
  },
  {
    id: "txn_p3k7n_s",
    registrationId: "reg_p3k7n_s",
    registrantId: "rgnt_p3k7n",
    registrantName: "Sarah Okonkwo",
    serviceType: "Status Change / Amendment",
    amount: 60,
    status: "Completed",
    stripePaymentIntentId: "pi_1VwXY9Xb6x9i7J0R1mU",
    completedAt: `${iso(2026, 1, 10)}T16:47:09Z`,
    createdAt: `${iso(2026, 1, 10)}T16:44:55Z`,
  },
  {
    id: "txn_dup_m1r6t",
    registrationId: "reg_m1r6t",
    registrantId: "rgnt_m1r6t",
    registrantName: "James Whitfield",
    serviceType: "Duplicate Certificate",
    amount: 35,
    status: "Completed",
    stripePaymentIntentId: "pi_2WxYZ0Yc7y0j8K1S2nV",
    completedAt: `${iso(2025, 11, 14)}T10:22:31Z`,
    createdAt: `${iso(2025, 11, 14)}T10:20:48Z`,
  },
  {
    id: "txn_9x3q1_ren",
    registrationId: "reg_9x3q1",
    registrantId: "rgnt_9x3q1",
    registrantName: "Andre Beaumont",
    serviceType: "Annual Renewal",
    amount: 95,
    status: "Completed",
    stripePaymentIntentId: "pi_3XyZA1Zd8z1k9L2T3oW",
    completedAt: `${iso(2025, 8, 11)}T09:08:22Z`,
    createdAt: `${iso(2025, 8, 11)}T09:06:07Z`,
  },
  {
    id: "txn_6qr5j_ren",
    registrationId: "reg_6qr5j",
    registrantId: "rgnt_6qr5j",
    registrantName: "Natasha Volkov",
    serviceType: "Annual Renewal",
    amount: 95,
    status: "Completed",
    stripePaymentIntentId: "pi_4YzAB2Ae9a2l0M3U4pX",
    completedAt: `${iso(2025, 6, 9)}T14:02:18Z`,
    createdAt: `${iso(2025, 6, 9)}T14:00:03Z`,
  },
  {
    id: "txn_r5n8p_ren",
    registrationId: "reg_r5n8p",
    registrantId: "rgnt_r5n8p",
    registrantName: "Roberto Castellano",
    serviceType: "Annual Renewal",
    amount: 95,
    status: "Completed",
    stripePaymentIntentId: "pi_5ZaBc3Bf0b3m1N4V5qY",
    completedAt: `${iso(2025, 9, 17)}T11:31:44Z`,
    createdAt: `${iso(2025, 9, 17)}T11:29:29Z`,
  },
  {
    id: "txn_m1r6t_g",
    registrationId: "reg_m1r6t_g",
    registrantId: "rgnt_m1r6t",
    registrantName: "James Whitfield",
    serviceType: "Annual Renewal",
    amount: 95,
    status: "Completed",
    stripePaymentIntentId: "pi_6AbCd4Cg1c4n2O5W6rZ",
    completedAt: `${iso(2026, 3, 1)}T08:17:53Z`,
    createdAt: `${iso(2026, 3, 1)}T08:15:38Z`,
  },
  {
    id: "txn_fail_001",
    registrationId: "reg_m1r6t",
    registrantId: "rgnt_m1r6t",
    registrantName: "James Whitfield",
    serviceType: "Annual Renewal",
    amount: 95,
    status: "Failed",
    stripePaymentIntentId: "pi_7BcDe5Dh2d5o3P6X7sA",
    completedAt: null,
    createdAt: `${iso(2026, 2, 28)}T19:44:12Z`,
    failureCode: "card_declined",
  },
];

// ---------------------------------------------------------------------------
// Activity Log — 22 entries
// ---------------------------------------------------------------------------

export const activityLog: ActivityLogEntry[] = [
  {
    id: "log_001",
    eventType: "public_lookup_performed",
    registrationId: "reg_k8m2p",
    registrationNumber: "REG-2024-08847",
    actorName: "Public (anonymous)",
    actorRole: "system",
    description: "Public verification lookup performed for REG-2024-08847.",
    timestamp: `${iso(2026, 3, 7)}T08:12:04Z`,
  },
  {
    id: "log_002",
    eventType: "admin_note_added",
    registrationId: "reg_k8m2p",
    registrationNumber: "REG-2024-08847",
    actorName: "J. Harmon (Admin)",
    actorRole: "admin",
    description: "Priority renewal flag added — registration expires in 2 days.",
    timestamp: `${iso(2026, 3, 6)}T14:32:17Z`,
  },
  {
    id: "log_003",
    eventType: "registration_flagged",
    registrationId: "reg_9x3q1_f",
    registrationNumber: "REG-2023-08419",
    actorName: "Registry System",
    actorRole: "system",
    description: "Possible duplicate registration detected — escalated for audit.",
    timestamp: `${iso(2026, 2, 19)}T09:07:44Z`,
  },
  {
    id: "log_004",
    eventType: "payment_completed",
    registrationId: "reg_m1r6t_g",
    registrationNumber: "REG-2023-07788",
    actorName: "James Whitfield",
    actorRole: "registrant",
    description: "Annual renewal payment of $95.00 received for REG-2023-07788.",
    timestamp: `${iso(2026, 3, 1)}T08:17:53Z`,
    metadata: { amount: 95, transactionId: "txn_m1r6t_g" },
  },
  {
    id: "log_005",
    eventType: "payment_failed",
    registrationId: "reg_m1r6t",
    registrationNumber: "REG-2022-05814",
    actorName: "James Whitfield",
    actorRole: "registrant",
    description: "Renewal payment attempt failed — card declined. Registrant prompted to retry.",
    timestamp: `${iso(2026, 2, 28)}T19:44:12Z`,
    metadata: { amount: 95, failureCode: "card_declined" },
  },
  {
    id: "log_006",
    eventType: "application_submitted",
    registrationId: "reg_x7q3n",
    registrationNumber: "REG-2025-11701",
    actorName: "Donna Fitzgerald",
    actorRole: "registrant",
    description: "New registration application submitted for HVAC Systems classification.",
    timestamp: `${iso(2026, 2, 28)}T11:27:44Z`,
  },
  {
    id: "log_007",
    eventType: "document_uploaded",
    registrationId: "reg_x7q3n",
    registrationNumber: "REG-2025-11701",
    actorName: "Donna Fitzgerald",
    actorRole: "registrant",
    description: "4 supporting documents uploaded: Business License, Liability Insurance, Government-Issued ID, Training Certificate.",
    timestamp: `${iso(2026, 2, 28)}T11:29:07Z`,
    metadata: { documentCount: 4 },
  },
  {
    id: "log_008",
    eventType: "registration_suspended",
    registrationId: "reg_p3k7n_s",
    registrationNumber: "REG-2022-06003",
    actorName: "T. Vasquez (Admin)",
    actorRole: "admin",
    description: "Registration suspended — liability insurance expired without renewal.",
    timestamp: `${iso(2026, 1, 15)}T10:20:00Z`,
  },
  {
    id: "log_009",
    eventType: "amendment_submitted",
    registrationId: "reg_p3k7n_s",
    registrationNumber: "REG-2022-06003",
    actorName: "Sarah Okonkwo",
    actorRole: "registrant",
    description: "Status Change / Amendment submitted. $60 fee paid. Updated insurance pending verification.",
    timestamp: `${iso(2026, 1, 10)}T16:47:09Z`,
  },
  {
    id: "log_010",
    eventType: "application_submitted",
    registrationId: "reg_b4n9s",
    registrationNumber: "REG-2025-11493",
    actorName: "Luis Ramírez",
    actorRole: "registrant",
    description: "New registration application submitted for Plumbing Contractor classification.",
    timestamp: `${iso(2026, 2, 17)}T10:52:03Z`,
  },
  {
    id: "log_011",
    eventType: "document_rejected",
    registrationId: "reg_b4n9s",
    registrationNumber: "REG-2025-11493",
    actorName: "J. Harmon (Admin)",
    actorRole: "admin",
    description: "Proof of Training/Certification not found in submission — registrant notified to upload.",
    timestamp: `${iso(2026, 3, 2)}T09:15:33Z`,
  },
  {
    id: "log_012",
    eventType: "certificate_issued",
    registrationId: "reg_9x3q1",
    registrationNumber: "REG-2021-03907",
    actorName: "Registry System",
    actorRole: "system",
    description: "Renewed registration certificate issued for Fire Suppression — valid through 2026-08-13.",
    timestamp: `${iso(2025, 8, 11)}T09:08:22Z`,
  },
  {
    id: "log_013",
    eventType: "registration_renewed",
    registrationId: "reg_6qr5j",
    registrationNumber: "REG-2023-06529",
    actorName: "Natasha Volkov",
    actorRole: "registrant",
    description: "Annual renewal processed. Registration extended to 2026-06-11.",
    timestamp: `${iso(2025, 6, 9)}T14:02:18Z`,
  },
  {
    id: "log_014",
    eventType: "public_lookup_performed",
    registrationId: "reg_9x3q1",
    registrationNumber: "REG-2021-03907",
    actorName: "Public (anonymous)",
    actorRole: "system",
    description: "Public verification lookup for REG-2021-03907 — verified Active.",
    timestamp: `${iso(2026, 3, 5)}T11:48:29Z`,
  },
  {
    id: "log_015",
    eventType: "document_verified",
    registrationId: "reg_t1q8z",
    registrationNumber: "REG-2024-10841",
    actorName: "J. Harmon (Admin)",
    actorRole: "admin",
    description: "Business License and Liability Insurance verified. Training certificate sent to issuing body for confirmation.",
    timestamp: `${iso(2026, 2, 24)}T15:07:41Z`,
  },
  {
    id: "log_016",
    eventType: "registration_expired",
    registrationId: "reg_4mn8x",
    registrationNumber: "REG-2020-01847",
    actorName: "Registry System",
    actorRole: "system",
    description: "Registration expired — no renewal received. Record removed from public lookup.",
    timestamp: `${iso(2025, 6, 28)}T00:01:00Z`,
  },
  {
    id: "log_017",
    eventType: "application_approved",
    registrationId: "reg_k8m2p",
    registrationNumber: "REG-2024-08847",
    actorName: "J. Harmon (Admin)",
    actorRole: "admin",
    description: "Application approved. Registration REG-2024-08847 issued.",
    timestamp: `${iso(2024, 3, 11)}T10:44:07Z`,
  },
  {
    id: "log_018",
    eventType: "registration_created",
    registrationId: "reg_k8m2p",
    registrationNumber: "REG-2024-08847",
    actorName: "Registry System",
    actorRole: "system",
    description: "Registration record created upon payment confirmation.",
    timestamp: `${iso(2024, 3, 8)}T13:22:48Z`,
  },
  {
    id: "log_019",
    eventType: "public_lookup_performed",
    registrationId: "reg_p3k7n_s",
    registrationNumber: "REG-2022-06003",
    actorName: "Public (anonymous)",
    actorRole: "system",
    description: "Public lookup for REG-2022-06003 — registration returned as Suspended.",
    timestamp: `${iso(2026, 2, 14)}T09:33:17Z`,
  },
  {
    id: "log_020",
    eventType: "registration_renewed",
    registrationId: "reg_r5n8p",
    registrationNumber: "REG-2021-04112",
    actorName: "Roberto Castellano",
    actorRole: "registrant",
    description: "Annual renewal processed. Registration extended to 2026-09-19.",
    timestamp: `${iso(2025, 9, 17)}T11:31:44Z`,
  },
  {
    id: "log_021",
    eventType: "certificate_issued",
    registrationId: "reg_m1r6t",
    registrationNumber: "REG-2022-05814",
    actorName: "Registry System",
    actorRole: "system",
    description: "Duplicate certificate issued — replacement for lost original.",
    timestamp: `${iso(2025, 11, 14)}T10:22:31Z`,
  },
  {
    id: "log_022",
    eventType: "public_lookup_performed",
    registrationId: "reg_6qr5j",
    registrationNumber: "REG-2023-06529",
    actorName: "Public (anonymous)",
    actorRole: "system",
    description: "Public verification lookup for REG-2023-06529 — verified Active.",
    timestamp: `${iso(2026, 3, 4)}T16:22:54Z`,
  },
];

// ---------------------------------------------------------------------------
// Dashboard Stats
// ---------------------------------------------------------------------------

export const dashboardStats: DashboardStats = {
  totalActiveRegistrations: 1_847,
  activeRegistrationsChange: 3.2,
  pendingReview: 18,
  pendingReviewChange: -12.4,
  expiringIn30Days: 47,
  expiringChange: 8.7,
  renewalRate: 74.3,
  renewalRateChange: 1.8,
  avgProcessingDays: 3.8,
  processingDaysChange: -0.6,         // negative = faster (improvement)
  revenueMonthToDate: 12_065,
  revenueChange: 11.2,
  documentsPendingVerification: 9,
  complianceRate: 96.7,
};

// ---------------------------------------------------------------------------
// Monthly Revenue Chart Data — 12 months (Mar 2025 – Feb 2026)
// Government registry revenue: fiscal year start Mar, renewal spikes Jan–Mar
// ---------------------------------------------------------------------------

export const monthlyRevenueData: MonthlyRevenueDataPoint[] = [
  { month: "Mar", revenue: 10_845, renewals: 82, newRegistrations: 21, amendments: 9 },
  { month: "Apr", revenue: 9_310,  renewals: 74, newRegistrations: 17, amendments: 7 },
  { month: "May", revenue: 8_740,  renewals: 68, newRegistrations: 15, amendments: 8 },
  { month: "Jun", revenue: 9_020,  renewals: 72, newRegistrations: 16, amendments: 6 },
  { month: "Jul", revenue: 7_885,  renewals: 60, newRegistrations: 14, amendments: 7 },  // summer lull
  { month: "Aug", revenue: 8_150,  renewals: 63, newRegistrations: 15, amendments: 8 },
  { month: "Sep", revenue: 9_470,  renewals: 76, newRegistrations: 18, amendments: 7 },  // fall pickup
  { month: "Oct", revenue: 10_215, renewals: 83, newRegistrations: 19, amendments: 9 },
  { month: "Nov", revenue: 9_650,  renewals: 79, newRegistrations: 16, amendments: 8 },
  { month: "Dec", revenue: 7_420,  renewals: 55, newRegistrations: 12, amendments: 6 },  // holiday slowdown
  { month: "Jan", revenue: 13_840, renewals: 112, newRegistrations: 28, amendments: 12 }, // fiscal renewal spike
  { month: "Feb", revenue: 11_490, renewals: 94,  newRegistrations: 22, amendments: 10 },
];

// ---------------------------------------------------------------------------
// Status Breakdown — donut chart
// ---------------------------------------------------------------------------

export const statusBreakdown: StatusBreakdownDataPoint[] = [
  { status: "Active",          count: 1_847, percentage: 88.1, fill: "var(--chart-1)" },
  { status: "Expired",         count: 102,   percentage: 4.9,  fill: "var(--chart-2)" },
  { status: "Pending Review",  count: 58,    percentage: 2.8,  fill: "var(--chart-3)" },
  { status: "Suspended",       count: 32,    percentage: 1.5,  fill: "var(--chart-4)" },
  { status: "Flagged",         count: 18,    percentage: 0.9,  fill: "var(--chart-5)" },
  { status: "Incomplete",      count: 20,    percentage: 1.0,  fill: "var(--chart-2)" },
  { status: "Revoked",         count: 9,     percentage: 0.4,  fill: "var(--chart-4)" },
  { status: "Pending Payment", count: 7,     percentage: 0.3,  fill: "var(--chart-3)" },
  { status: "Under Review",    count: 3,     percentage: 0.1,  fill: "var(--chart-5)" },
];

// ---------------------------------------------------------------------------
// Monthly Application Volume — 12 months
// ---------------------------------------------------------------------------

export const monthlyApplicationData: MonthlyApplicationDataPoint[] = [
  { month: "Mar", submitted: 31, approved: 28, rejected: 2 },
  { month: "Apr", submitted: 24, approved: 22, rejected: 1 },
  { month: "May", submitted: 21, approved: 18, rejected: 2 },
  { month: "Jun", submitted: 23, approved: 21, rejected: 1 },
  { month: "Jul", submitted: 18, approved: 16, rejected: 1 },
  { month: "Aug", submitted: 20, approved: 18, rejected: 1 },
  { month: "Sep", submitted: 27, approved: 24, rejected: 2 },
  { month: "Oct", submitted: 29, approved: 26, rejected: 2 },
  { month: "Nov", submitted: 25, approved: 22, rejected: 2 },
  { month: "Dec", submitted: 16, approved: 14, rejected: 1 },
  { month: "Jan", submitted: 42, approved: 37, rejected: 3 },  // fiscal renewal spike
  { month: "Feb", submitted: 34, approved: 30, rejected: 3 },
];

// ---------------------------------------------------------------------------
// Registration Type Breakdown — bar chart
// ---------------------------------------------------------------------------

export const registrationTypeBreakdown: RegistrationTypeBreakdownPoint[] = [
  { registrationType: "General Contractor (GC-I)",    count: 487, percentage: 26.4 },
  { registrationType: "General Contractor (GC-II)",   count: 312, percentage: 16.9 },
  { registrationType: "Electrical Contractor",         count: 298, percentage: 16.1 },
  { registrationType: "Plumbing Contractor",           count: 214, percentage: 11.6 },
  { registrationType: "HVAC Systems",                  count: 187, percentage: 10.1 },
  { registrationType: "Roofing Contractor",            count: 142, percentage: 7.7  },
  { registrationType: "Mechanical Systems",            count: 98,  percentage: 5.3  },
  { registrationType: "Commercial Building Inspector", count: 67,  percentage: 3.6  },
  { registrationType: "General Contractor (GC-III)",   count: 28,  percentage: 1.5  },
  { registrationType: "Fire Suppression",              count: 24,  percentage: 1.3  },
  { registrationType: "Demolition Contractor",         count: 9,   percentage: 0.5  },
];

// ---------------------------------------------------------------------------
// Lookup helpers
// ---------------------------------------------------------------------------

export const getRegistrantById = (id: string): Registrant | undefined =>
  registrants.find((r) => r.id === id);

export const getRegistrationsByRegistrant = (registrantId: string): Registration[] =>
  registrations.filter((r) => r.registrantId === registrantId);

export const getRegistrationByNumber = (registrationNumber: string): Registration | undefined =>
  registrations.find((r) => r.registrationNumber === registrationNumber);

export const getTransactionsByRegistration = (registrationId: string): Transaction[] =>
  transactions.filter((t) => t.registrationId === registrationId);

export const getTransactionsByRegistrant = (registrantId: string): Transaction[] =>
  transactions.filter((t) => t.registrantId === registrantId);

export const getCertificateByRegistration = (registrationId: string): Certificate | undefined =>
  certificates.find((c) => c.registrationId === registrationId);

export const getActivityByRegistration = (registrationId: string): ActivityLogEntry[] =>
  activityLog
    .filter((e) => e.registrationId === registrationId)
    .sort((a, b) => b.timestamp.localeCompare(a.timestamp));

// ---------------------------------------------------------------------------
// Computed lists for UI
// ---------------------------------------------------------------------------

/** Registrations expiring within 30 days (renewal window) */
export const expiringRegistrations: Registration[] = registrations
  .filter((r) => r.inRenewalWindow && r.status === "Active")
  .sort((a, b) => a.daysUntilExpiry - b.daysUntilExpiry);

/** Registrations requiring admin action */
export const registrationsPendingAction: Registration[] = registrations.filter(
  (r) =>
    r.status === "Pending Review" ||
    r.status === "Under Review" ||
    r.status === "Flagged" ||
    r.status === "Suspended"
);

/** Recently submitted applications (last 30 days) */
export const recentApplications: Application[] = applications
  .filter((a) => a.status !== "Approved" && a.status !== "Rejected")
  .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
