import type { Status } from "@/features/tickets/types";

export type SpielWhen = "Any" | Status;

export interface Spiel {
  id: string;
  name: string;
  when: SpielWhen;   // which ticket status this spiel is suggested for
  appId: string;     // "" = all applications
  body: string;
}

export type SpielDraft = Omit<Spiel, "id">;