import { ACTIVE } from "./constants";
import type { Application } from "../applications/types";
import type { Account, CheckItem, Filter, Ticket } from "./types";

export const isActive = (t: Ticket) => ACTIVE.includes(t.status);

export const progress = (t: Ticket) => {
  const total = t.checks.length;
  const done = t.checks.filter(c => c.done).length;
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
};

export function filterTickets(tickets: Ticket[], filter: Filter, query: string, appName: (id: string) => string) {
  const k = query.trim().toLowerCase();
  return tickets.filter(t => {
    const byStatus = filter === "All" || (filter === "Active" ? isActive(t) : t.status === filter);
    return byStatus && (!k || (t.no + t.sc + t.sum + t.req + appName(t.appId)).toLowerCase().includes(k));
  });
}

export const uid = () => Math.random().toString(36).slice(2, 9);
export const today = () => new Date().toISOString().slice(0, 10);

const FALLBACK_CHECKS = [
  "Request approval verified", 
  "Request completed", 
  "Requester notified", 
  "Ticket updated"
];

export const makeChecks = (app: Application | undefined, cat: string): CheckItem[] =>
  (app?.checklist[cat] ?? FALLBACK_CHECKS).map(text => ({ text, done: false }));


export function parseAccounts(text: string): Account[] {
  return text
    .split("\n")
    .map(l => l.replace(/\r$/, ""))
    .filter(l => l.trim())
    .map(l => {
      const c = l.split(/\t|\|/).map(x => x.trim());
      return { userId: c[0] || "", name: c[1] || "", roles: c[2] || "", isService: /^(y|yes|true|1|x)$/i.test(c[3] || "") };
    });
}

export function fillSpiel(t: Ticket, body: string, ctx: { appName: string; analyst: string }) {
  const m: Record<string, string> = {
    requester: t.req, ticket: t.no, summary: t.sum, app: ctx.appName, category: t.cat,
    account: t.accts.map(a => a.userId).filter(Boolean).join(", "),
    analyst: ctx.analyst, date: today(), pending: t.pend,
  };
  return body.replace(/\{\{(\w+)\}\}/g, (x, k: string) => m[k] || x);
}