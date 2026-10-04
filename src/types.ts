export type TicketState = "Open" | "Pending" | "Execution" | "Closed" | "Cancelled";
export type TicketCategory = "Creation" | "Deactivation" | "Reactivation" | "Modification";

export interface ChecklistItem { label: string; checked: boolean }

export interface Ticket {
  id: number;
  number: string;
  application: string;
  category: TicketCategory;
  sub: string;
  state: TicketState;
  days: number;
  pendingReason: string;
  checklist: ChecklistItem[];
}

export interface ProcessCategory { name: string; steps: string[] }
export interface SupportContact { name: string; contact: string }

export interface AppRecord {
  name: string;
  env: string;
  url: string;
  username: string;
  password: string;
  notes: string;
  dos: string[];
  donts: string[];
  categories: ProcessCategory[];
  support: SupportContact[];
}

export interface LogEntry {
  number: string;
  application: string;
  category: string;
  result: "Completed" | "Cancelled";
  reason: string;
  ts: string;
}

export type NewTicketDraft = { number: string; application: string; category: TicketCategory; sub: string };