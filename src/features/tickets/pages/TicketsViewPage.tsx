import { TicketDetail } from "../components/TicketDetail";
import { TicketList } from "../components/TicketList";
import { TicketDialogs } from "../components/TicketsDialog";
import type { TicketsStore } from "../hooks/useTickets";

interface TicketsViewPageProps {
  store: TicketsStore;
  analyst: string;
}

export const TicketsViewPage = ({ store, analyst  }: TicketsViewPageProps) => (
  <main className="mx-auto max-w-7xl px-5 py-4">
    <div className="grid items-start gap-4 min-[821px]:grid-cols-[minmax(280px,380px)_1fr]">
      <TicketList
        tickets={store.visible}
        counts={store.counts}
        appName={store.appName}
        selectedId={store.selId}
        filter={store.filter}
        query={store.query}
        onQuery={store.setQuery}
        onFilter={store.setFilter}
        onSelect={store.select}
        onNew={store.openNewForm}
        onImport={store.openImport}
      />
      <TicketDetail
        ticket={store.selected}
        app={store.selectedApp}
        spiels={store.spiels}
        subOptions={store.subOptions}
        actions={store.actions}
        onUseSpiel={store.openSpiel}
        onPasteAccounts={store.openPasteAccounts}
        onCopy={store.copy}
      />

      <TicketDialogs store={store} analyst={analyst} />
    </div>
  </main>
);