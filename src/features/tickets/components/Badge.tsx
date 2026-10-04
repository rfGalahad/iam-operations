import type { TicketState } from "../types";

export function Badge({ state }: { state: TicketState }) {
  return <span className={`badge badge-${state}`}>{state}</span>;
}