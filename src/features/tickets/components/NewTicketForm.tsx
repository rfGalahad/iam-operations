import { useState } from "react";
import { TEMPLATES } from "../constants";
import type { NewTicketDraft, TicketCategory } from "../types";

interface Props { applicationNames: string[]; onCreate: (d: NewTicketDraft) => void; onCancel: () => void }

const blank: NewTicketDraft = { number: "", application: "", category: "Creation", sub: "" };

export function NewTicketForm({ applicationNames, onCreate, onCancel }: Props) {
  const [draft, setDraft] = useState<NewTicketDraft>(blank);
  const submit = () => {
    if (!draft.number.trim() || !draft.application) return;
    onCreate(draft);
  };
  return (
    <div className="flex flex-col gap-2 px-3.5 py-3 border-b border-line">
      <input className="field" placeholder="Ticket number (INC...)" value={draft.number} onChange={e => setDraft(d => ({ ...d, number: e.target.value }))} />
      <select className="field" value={draft.application} onChange={e => setDraft(d => ({ ...d, application: e.target.value }))}>
        <option value="">Select application…</option>
        {applicationNames.map(n => <option key={n} value={n}>{n}</option>)}
      </select>
      <select className="field" value={draft.category} onChange={e => setDraft(d => ({ ...d, category: e.target.value as TicketCategory }))}>
        {Object.keys(TEMPLATES).map(c => <option key={c} value={c}>{c}</option>)}
      </select>
      <input className="field" placeholder="Sub-category (e.g. New Hire)" value={draft.sub} onChange={e => setDraft(d => ({ ...d, sub: e.target.value }))} />
      <div className="flex gap-2.5">
        <button className="btn btn-primary" onClick={submit}>Create</button>
        <button className="btn btn-ghost" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}