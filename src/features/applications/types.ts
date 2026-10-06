export interface ProcessCategory {
  name: string;
  steps: string[];
}

export interface SupportContact {
  name: string;
  contact: string;
}

export interface Credential { 
  label: string; 
  username: string; 
  password: string 
}

export interface Application {
  id: string;
  name: string;
  process: string;
  contacts: SupportContact[];
  creds: Credential[];
  checklist: Record<string, string[]>;
  categories: ProcessCategory[];
}

export type ApplicationDraft = Omit<Application, "id">;