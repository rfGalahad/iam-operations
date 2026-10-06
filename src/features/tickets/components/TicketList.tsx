import { Button, Chip, TextInput } from "@/components/ui/index";
import { FILTERS } from "../constants";
import type { Filter, Ticket } from "../types";
import { progress } from "../utils";
import { StatusBadge } from "./StatusBadge";

interface Props {
  tickets: Ticket[];
  counts: { open: number; pending: number; execution: number };
  appName: (id: string) => string;
  selectedId: string | null;
  filter: Filter;
  query: string;
  onQuery: (q: string) => void;
  onFilter: (f: Filter) => void;
  onSelect: (id: string) => void;
  onNew: () => void;
  onImport: () => void;
}

const tools = "flex flex-wrap gap-1.5 border-b border-line p-2.5";

export function TicketList(prop: Props) {
  return (
    <div className="rounded-[10px] border border-line bg-panel">
      <div className={tools}>
        <TextInput
          placeholder="Search ticket, app, requester"
          value={prop.query}
          onChange={e => prop.onQuery(e.target.value)}
        />
      </div>
      <div className={tools}>
        {FILTERS.map(filter => (
          <Chip 
            key={filter} 
            active={filter === prop.filter} 
            onClick={() => prop.onFilter(filter)}
          >
            {filter}
          </Chip>
        ))}
      </div>
      <div className={`${tools} items-center justify-between`}>
        <span className="flex gap-1.5">
          <Button size="sm" onClick={prop.onImport}>
            Import tickets
          </Button>
          <Button size="sm" variant="primary" onClick={prop.onNew}>
            New ticket
          </Button>
        </span>
      </div>

      {prop.tickets.map(t => {
        const { done, total, pct } = progress(t);
        const sel = t.id === prop.selectedId;
        return (
          <button
            key={t.id}
            type="button"
            aria-current={sel}
            onClick={() => prop.onSelect(t.id)}
            className={`block w-full cursor-pointer border-b border-l-[3px] border-b-line px-3 py-2.5 text-left last:border-b-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent ${
              sel ? "border-l-accent bg-panel2" : "border-l-transparent"
            }`}
          >
            <div className="flex items-center gap-1.5">
              <b className="font-mono font-semibold">{t.no}</b>
              <StatusBadge status={t.status} />
            </div>
            <div>{t.sum}</div>
            <div className="mt-0.5 flex flex-wrap gap-2.5 text-xs text-sub">
              <span>{prop.appName(t.appId)}</span>
              <span>{t.cat}</span>
              <span>{done}/{total}</span>
            </div>
            <div className="mt-1.5 h-1 overflow-hidden rounded-sm bg-panel2">
              <div className="h-full bg-ok" style={{ width: `${pct}%` }} />
            </div>
          </button>
        );
      })}
      {prop.tickets.length === 0 && (
        <div className="p-7 text-center text-sub">
          No tickets match. Add one with New ticket.
        </div>
      )}
    </div>
  );
}