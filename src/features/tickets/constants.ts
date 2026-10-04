import type { ChecklistItem, StateFilter, TicketCategory } from "./types";

export const TICKETS_KEY = "iam_ops_tickets";
export const LOG_KEY = "iam_ops_log";

export const TEMPLATES: Record<TicketCategory, string[]> = {
  Creation: ["IS Approval obtained", "Profile/Role Owner Approval obtained", "Complete user details (name, user ID, role/profile)", "Confirmed user does not already exist"],
  Deactivation: ["Complete user details provided", "Confirmed account exists and is active", "IS/Manager Approval (if required)"],
  Reactivation: ["Complete user details provided", "Confirmed account exists and is inactive", "Approval obtained (if required)"],
  Modification: ["IS Approval obtained", "Profile/Role Owner Approval obtained", "Complete change details specified"],
};

export const defaultChecklist = (cat: TicketCategory): ChecklistItem[] =>
  (TEMPLATES[cat] ?? ["IS Approval obtained", "Profile/Role Owner Approval obtained", "Complete details provided"])
    .map(label => ({ label, checked: false }));

export const CANCEL_REASONS = [
  "3-Strike Rule (no response)", 
  "Out of Scope", 
  "No Longer Required", 
  "Duplicate Ticket"
];

export const PENDING_REASONS = [
  "Awaiting IS Approval", 
  "Awaiting Profile/Role Owner Approval", 
  "Awaiting user details", 
  "Awaiting 3rd-party support"
];

export const STATE_FILTERS: StateFilter[] = [
  "All", 
  "Open", 
  "Pending", 
  "Execution", 
  "Closed", 
  "Cancelled"
];