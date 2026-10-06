import type { Filter, Priority, Status } from "./types";

export const TICKETS_KEY = "iam_desk_tickets";

export const CATEGORIES = [
  "Provisioning",
  "Deprovisioning",
  "Modification",
  "Access Request",
  "Password Reset / Unlock"
];

export const STATUSES: Status[] = [
  "Open",
  "Pending",
  "Execution",
  "Closed",
  "Cancelled"
];

export const PRIORITIES: Priority[] = [
  "Low",
  "Medium",
  "High",
  "Critical"
];

export const FILTERS: Filter[] = [
  "Active", 
  ...STATUSES, 
  "All"
];

export const ACTIVE: Status[] = [
  "Open",
  "Pending",
  "Execution"
];