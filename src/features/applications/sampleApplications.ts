import { blankCategories } from "./constants";
import type { Application } from "./types";

export const sampleApplications: Application[] = [
  {
    name: "SAP ECC", env: "Production", url: "sap.corp.internal/ecc",
    username: "svc_iam_sap01", password: "demo-password-01",
    notes: "Role changes take up to 15 min to propagate.",
    dos: ["Verify employee ID matches HR record before creation", "Use standard role templates from the role matrix"],
    donts: ["Never assign SAP_ALL profile", "Don't reuse a deactivated user ID for a new hire"],
    categories: blankCategories(),
    support: [{ name: "SAP Basis Team", contact: "sap-basis@corp.com" }],
  },
  {
    name: "Salesforce", env: "Production", url: "corp.my.salesforce.com",
    username: "iam.ops@corp.com", password: "demo-password-02",
    notes: "MFA required. Check the shared authenticator.",
    dos: ["Set profile based on department mapping sheet", "Deactivate via 'Freeze' first, then deactivate after 24h"],
    donts: ["Don't delete users. Deactivate only; deletion breaks record ownership"],
    categories: blankCategories(),
    support: [{ name: "SFDC Admin Team", contact: "sfdc-admins@corp.com" }],
  },
  {
    name: "Workday", env: "Production", url: "workday.corp.com",
    username: "iam_ops_wd", password: "demo-password-03",
    notes: "Contractor accounts expire automatically at contract end date.",
    dos: ["Confirm cost center before account creation"],
    donts: ["Don't create account before start date is confirmed by HR"],
    categories: blankCategories(),
    support: [{ name: "HRIS Team", contact: "hris-support@corp.com" }],
  },
  {
    name: "AD / Azure", env: "Production", url: "portal.azure.com",
    username: "iam-ops-admin", password: "demo-password-04",
    notes: "Group membership sync can take up to 1 hour.",
    dos: ["Reactivate via security group first, verify sync before closing ticket"],
    donts: ["Don't reactivate without confirming manager approval on file"],
    categories: blankCategories(),
    support: [{ name: "Infra/Identity Team", contact: "identity-infra@corp.com" }],
  },
];