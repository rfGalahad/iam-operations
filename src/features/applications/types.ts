export interface ProcessCategory {
  name: string;
  steps: string[];
}

export interface SupportContact {
  name: string;
  contact: string;
}

export interface Application {
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