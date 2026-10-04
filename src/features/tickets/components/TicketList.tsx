import { useState } from "react";

import type { NewTicketDraft, StateFilter, Ticket } from "../types";
import { STATE_FILTERS } from "../constants";

import { Badge } from "./Badge";
import { NewTicketForm } from "./NewTicketForm";

interface Props {
  tickets: Ticket[];
  applicationNames: string[];
  selectedId: number | null;
  filter: StateFilter;
  onFilter: (f: StateFilter) => void;
  onSelect: (id: number) => void;
  onCreate: (draft: NewTicketDraft) => void;
}

export function TicketList({ tickets, applicationNames, selectedId, filter, onFilter, onSelect, onCreate }: Props) {
  const [showNew, setShowNew] = useState(false);

  return (
    <div className="w-full md:w-95 md:min-w-[280px] max-h-[40vh] md:max-h-none border-b md:border-b-0 md:border-r border-line overflow-y-auto bg-panel">
      <div className="sticky top-0 z-[1] flex flex-wrap gap-1.5 p-2.5 border-b border-line bg-panel">
        {STATE_FILTERS.map(f => (
          <button key={f} className={`chip ${filter === f ? "chip-active" : ""}`} onClick={() => onFilter(f)}>{f}</button>
        ))}
        <button className="chip chip-active ml-auto" onClick={() => setShowNew(s => !s)}>+ Add Ticket</button>
      </div>

      {showNew && (
        <NewTicketForm
          applicationNames={applicationNames}
          onCreate={d => { onCreate(d); setShowNew(false); }}
          onCancel={() => setShowNew(false)}
        />
      )}

      {tickets.map(t => (
        <div key={t.id} onClick={() => onSelect(t.id)}
          className={`px-3.5 py-3 border-b border-line cursor-pointer hover:bg-panel2 ${t.id === selectedId ? "bg-panel2 border-l-[3px] border-l-accent" : ""}`}>
          <div className="flex justify-between items-center mb-1">
            <span className="font-mono text-[12.5px] text-sub">{t.number}</span>
            <Badge state={t.state} />
          </div>
          <div className="text-[13.5px] font-semibold">{t.application}</div>
          <div className="text-xs text-sub mt-0.5">{t.category} · {t.sub}</div>
          {t.state === "Pending" && (
            <div className="text-[11px] text-danger mt-1">{t.pendingReason} · day {t.days}{t.days >= 3 ? " — 3-STRIKE" : ""}</div>
          )}
        </div>
      ))}
      {tickets.length === 0 && <div className="p-10 text-sm text-sub">No tickets in this view.</div>}
    </div>
  );
}