export type Status = "Open" | "Pending" | "Execution" | "Closed" | "Cancelled";
export type Priority = "Low" | "Medium" | "High" | "Critical";
export type Filter = "Active" | Status | "All";

export interface CheckItem { 
  text: string; 
  done: boolean 
}

export interface Account { 
  userId: string; 
  name: string; 
  roles: string; 
  isService: boolean 
}

export interface Ticket {
  id: string; 
  no: string; 
  appId: string; 
  cat: string; 
  sum: string; 
  req: string;
  status: Status; 
  pri: Priority; 
  sc: string; 
  sub: string; 
  pend: string; 
  notes: string;
  created: string; 
  closed?: string; 
  logged?: boolean;
  checks: CheckItem[]; 
  accts: Account[];
}

export interface TicketActions {            
  update: <K extends keyof Ticket>(key: K, value: Ticket[K]) => void; // store handles closed-date logic when key === "status"
  toggleCheck: (i: number) => void;
  removeCheck: (i: number) => void;
  addCheck: (text: string) => void;
  resetChecklist: () => void;               
  remove: () => void;
  addAccount: () => void;
  addAccounts: (a: Account[]) => void;
  updateAccount: <K extends keyof Account>(i: number, key: K, value: Account[K]) => void;
  removeAccount: (i: number) => void;
}

export type NewTicketDraft = Pick<Ticket, "no" | "sum" | "appId" | "cat" | "req" | "pri" | "sc" | "sub">;

export type Dialog =
  | null
  | { kind: "new" }
  | { kind: "import" }
  | { kind: "paste" }
  | { kind: "spiel"; id: string };