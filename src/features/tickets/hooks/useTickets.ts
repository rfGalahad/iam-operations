import { useMemo, useState } from "react";
import { usePersistentState } from "../../../hooks/usePersistentState";
import { defaultChecklist, LOG_KEY, TICKETS_KEY } from "../constants";
import type { LogEntry, NewTicketDraft, StateFilter, Ticket } from "../types";

const sampleTickets: Ticket[] = [
  { id: 1, number: "INC0091234", application: "SAP ECC", category: "Creation", sub: "New Hire", state: "Open", days: 0, pendingReason: "", checklist: defaultChecklist("Creation") },
  { id: 2, number: "INC0091240", application: "Salesforce", category: "Deactivation", sub: "Termination", state: "Pending", days: 2, pendingReason: "Awaiting IS Approval", checklist: defaultChecklist("Deactivation") },
  { id: 3, number: "INC0091251", application: "Workday", category: "Creation", sub: "Contractor", state: "Pending", days: 3, pendingReason: "Awaiting user ID from requester", checklist: defaultChecklist("Creation") },
  { id: 4, number: "INC0091260", application: "AD / Azure", category: "Reactivation", sub: "Return from LOA", state: "Execution", days: 0, pendingReason: "", checklist: defaultChecklist("Reactivation").map(c => ({ ...c, checked: true })) },
  { id: 5, number: "INC0091277", application: "SAP ECC", category: "Modification", sub: "Role change", state: "Open", days: 0, pendingReason: "", checklist: defaultChecklist("Modification") },
];

export function useTickets() {
  
  const [tickets, setTickets] = usePersistentState<Ticket[]>(TICKETS_KEY, sampleTickets);
  const [log, setLog] = usePersistentState<LogEntry[]>(LOG_KEY, []);
  const [selId, setSelId] = useState<number | null>(() => tickets[0]?.id ?? null);
  const [filter, setFilter] = useState<StateFilter>("All");

  const selected = tickets.find(t => t.id === selId);
  const visible = filter === "All" ? tickets : tickets.filter(t => t.state === filter);
  const counts = useMemo(() => {
    const c = { Open: 0, Pending: 0, Execution: 0 };
    tickets.forEach(t => { if (t.state in c) c[t.state as keyof typeof c]++; });
    return c;
  }, [tickets]);

  const update = (id: number, patch: Partial<Ticket>) =>
    setTickets(ts => ts.map(t => (t.id === id ? { ...t, ...patch } : t)));

  const addLog = (t: Ticket, result: LogEntry["result"], reason = "") =>
    setLog(l => [{ number: t.number, application: t.application, category: t.category, result, reason, ts: new Date().toLocaleTimeString() }, ...l]);

  return {
    tickets, visible, log, counts, selected, selId, filter,
    setFilter, select: setSelId,
    create: (d: NewTicketDraft) => {
      const id = Date.now();
      setTickets(ts => [{ id, ...d, state: "Open", days: 0, pendingReason: "", checklist: defaultChecklist(d.category) }, ...ts]);
      setSelId(id);
    },
    toggleCheck: (idx: number) =>
      selected && update(selected.id, { checklist: selected.checklist.map((c, i) => (i === idx ? { ...c, checked: !c.checked } : c)) }),
    moveToExecution: () => selected && update(selected.id, { state: "Execution", pendingReason: "", days: 0 }),
    setPending: (reason: string) => selected && update(selected.id, { state: "Pending", pendingReason: reason, days: 0 }),
    resume: () => selected && update(selected.id, { state: "Open" }),
    cancel: (reason: string) => { if (!selected) return; addLog(selected, "Cancelled", reason); update(selected.id, { state: "Cancelled", pendingReason: reason }); },
    complete: () => { if (!selected) return; addLog(selected, "Completed"); update(selected.id, { state: "Closed" }); },
    reset: () => { setTickets(sampleTickets); setLog([]); setSelId(sampleTickets[0].id); },
  };
}

export type TicketsStore = ReturnType<typeof useTickets>;