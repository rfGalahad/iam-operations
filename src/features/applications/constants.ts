import type { Application, ProcessCategory } from "./types";

export const APPS_KEY = "iam_ops_apps";
export const DEFAULT_CATEGORY = "Provisioning";

export const blankCategories = (): ProcessCategory[] => [
  { name: "Provisioning", steps: ["Verify approvals", "Verify details", "Create account"] },
  { name: "Deprovisioning", steps: ["Verify account is active", "Disable access", "Notify requester"] },
  { name: "Modification", steps: ["Verify approval for change", "Apply change", "Confirm with user"] },
];

export const emptyApplication = (name: string): Application => ({
  name,
  env: "Production",
  url: "",
  username: "",
  password: "",
  notes: "",
  dos: [],
  donts: [],
  categories: blankCategories(),
  support: [],
});