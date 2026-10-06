import { useState } from "react";

import { usePersistentState } from "@/hooks/usePersistentState";

import type { ImportRow } from "../importParser";
import { CATEGORIES, PRIORITIES } from "../constants";
import { TICKETS_KEY } from "../constants";
import type { Spiel } from "@/features/spiels/types";
import type { Application } from "@/features/applications/types";
import type { Dialog, Filter, NewTicketDraft, Ticket, TicketActions } from "../types";
import { filterTickets, isActive, makeChecks, today, uid } from "../utils";

interface Options { 
  notify?: (msg: string) => void; 
  addApps?: (apps: Application[]) => void 
}

export const useTickets = (
  apps: Application[], 
  spiels: Spiel[], 
  { 
    notify = () => {}, 
    addApps = () => {} 
  }: Options = {}
) => {

  const [tickets, setTickets] = usePersistentState<Ticket[]>(TICKETS_KEY, []);
  const [selId, setSelId] = useState<string | null>(() => tickets[0]?.id ?? null);
  const [filter, setFilter] = useState<Filter>("Active");
  const [query, setQuery] = useState("");
  const [dialog, setDialog] = useState<Dialog>(null);

  const appOf = (id: string) => apps.find(a => a.id === id);
  const appName = (id: string) => appOf(id)?.name ?? "(deleted app)";

  const selected = tickets.find(t => t.id === selId);
  const selectedApp = selected && appOf(selected.appId);
  const visible = filterTickets(tickets, filter, query, appName);
  const counts = {
    open: tickets.filter(t => t.status === "Open").length,
    pending: tickets.filter(t => t.status === "Pending").length,
    execution: tickets.filter(t => t.status === "Execution").length,
  };
  const subOptions = [...new Set(tickets.map(t => t.sub).filter(Boolean))];

  const patch = (fn: (t: Ticket) => Ticket) => {
    if (!selId) return;
    setTickets(ts => ts.map(t => (t.id === selId ? fn(t) : t)));
  };

  const actions: TicketActions = {
    addAccounts: list => patch(t => ({ ...t, accts: [...t.accts, ...list] })),
    update: (key, value) =>
      patch(t => {
        const n = { ...t, [key]: value } as Ticket;
        if (key === "status") {
          if (isActive(n)) delete n.closed;
          else { n.closed = today(); n.logged = false; }
        }
        return n;
      }),
    toggleCheck: i => patch(t => ({ ...t, checks: t.checks.map((c, j) => (j === i ? { ...c, d: !c.done } : c)) })),
    removeCheck: i => patch(t => ({ ...t, checks: t.checks.filter((_, j) => j !== i) })),
    addCheck: text => patch(t => ({ ...t, checks: [...t.checks, { text: text, done: false }] })),
    resetChecklist: () => {
      if (!selected || !confirm("Reload the checklist from the template? Current ticks will be lost.")) return;
      patch(t => ({ ...t, checks: makeChecks(appOf(t.appId), t.cat) }));
    },
    remove: () => {
      if (!selected || !confirm("Delete this ticket?")) return;
      setTickets(ts => ts.filter(t => t.id !== selected.id));
      setSelId(tickets.find(t => t.id !== selected.id)?.id ?? null);
    },
    addAccount: () => patch(t => ({ ...t, accts: [...t.accts, { userId: "", name: "", roles: "", isService: false }] })),
    updateAccount: (i, key, value) =>
      patch(t => ({ ...t, accts: t.accts.map((a, j) => (j === i ? { ...a, [key]: value } : a)) })),
    removeAccount: i => patch(t => ({ ...t, accts: t.accts.filter((_, j) => j !== i) })),
  };

  return {
    tickets, 
    visible, 
    counts, 
    selected, 
    selectedApp, 
    selId, 
    filter, 
    query, 
    spiels, 
    subOptions, 
    dialog,
    actions, 
    appName,
    setFilter, 
    setQuery, 
    select: setSelId,
    apps,

    importTickets: (rows: ImportRow[]) => {
     const have = new Set(tickets.map(t => t.no));
     const created = new Map<string, Application>();
     const next: Ticket[] = [];
     for (const p of rows) {
       if (have.has(p.no)) continue;
       const name = p.app || "(Unassigned)";
       const key = name.toLowerCase();
       let app = apps.find(a => a.name.toLowerCase() === key) ?? created.get(key);
       if (!app) {
         app = { id: uid(), name, process: "", contacts: [], creds: [], checklist: {}, categories:[] };
         created.set(key, app);
       }
       const cat = CATEGORIES.find(c => c.toLowerCase() === p.cat.toLowerCase()) || p.cat || CATEGORIES[0];
       const pri = PRIORITIES.find(x => x.toLowerCase() === p.pri.toLowerCase()) || "Medium";
       next.push({
         id: uid(), no: p.no, sc: "", sub: p.sub, appId: app.id, cat, sum: `${cat}: ${name}`,
         req: p.req, status: "Open", pri, pend: "", notes: "", created: today(),
         accts: [], checks: makeChecks(app, cat),
       });
     }
     if (created.size) addApps([...created.values()]);
       setTickets(ts => [...next, ...ts]);
       setFilter("Active");
       setSelId(next[0]?.id ?? selId);
       notify(`Imported ${next.length} tickets`);
    },

    create: (d: NewTicketDraft) => {
      const t: Ticket = {
        ...d, id: uid(), status: "Open", pend: "", notes: "", created: today(),
        accts: [], checks: makeChecks(appOf(d.appId), d.cat),
      };
      setTickets(ts => [t, ...ts]);
      setFilter("Active");
      setQuery("");
      setSelId(t.id);
    },

    copy: async (text: string, msg: string) => {
      try { await navigator.clipboard.writeText(text); notify(msg); }
      catch { notify("Copy failed"); }
    },

    markLogged: (ticketIds: string[]) => {
      const loggedIds = new Set(ticketIds);
      setTickets(current =>
        current.map(ticket => (loggedIds.has(ticket.id) ? { ...ticket, logged: true } : ticket)),
      );
    },

    openNewForm: () => setDialog({ kind: "new" }),
    openImport: () => setDialog({ kind: "import" }),
    openPasteAccounts: () => setDialog({ kind: "paste" }),
    openSpiel: (id: string) => setDialog({ kind: "spiel", id }),
    closeDialog: () => setDialog(null),
  };
}

export type TicketsStore = ReturnType<typeof useTickets>;