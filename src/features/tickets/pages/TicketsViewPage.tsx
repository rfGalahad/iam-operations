import { TicketDetail } from "../components/TicketDetail";
import { TicketList } from "../components/TicketList";
import type { TicketsStore } from "../hooks/useTickets";

interface Props { 
  store: TicketsStore; 
  applicationNames: string[] 
}

export function TicketsViewPage({ store: s, applicationNames }: Props) {
  return (
    <div className="flex flex-1 min-h-0 overflow-hidden flex-col md:flex-row">
      <TicketList
        tickets={s.visible} applicationNames={applicationNames}
        selectedId={s.selId} filter={s.filter}
        onFilter={s.setFilter} onSelect={s.select} onCreate={s.create}
      />
      <TicketDetail
        ticket={s.selected}
        onToggleCheck={s.toggleCheck} onExecute={s.moveToExecution}
        onPending={s.setPending} onResume={s.resume}
        onCancel={s.cancel} onComplete={s.complete}
      />
    </div>
  );
}