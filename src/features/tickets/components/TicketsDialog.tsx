import { Dialog } from "@/components/ui/index";
import type { TicketsStore } from "../hooks/useTickets";
import { today } from "../utils";
import { ImportForm } from "./ImportForm";
import { NewTicketForm } from "./NewTicketForm";
import { PasteAccountsForm } from "./PasteAccountsForm";
import { SpielForm } from "./SpielForm";

const TITLES = { new: "New ticket", import: "Import tickets", paste: "Paste accounts" };

export function TicketDialogs({ store, analyst }: { store: TicketsStore; analyst: string }) {
  const d = store.dialog;
  const t = store.selected;
  const spiel = d?.kind === "spiel" ? store.spiels.find(s => s.id === d.id) : undefined;
  const title = d?.kind === "spiel" ? (spiel?.name ?? "") : d ? TITLES[d.kind] : "";

  return (
    <Dialog open={!!d} title={title} onClose={store.closeDialog}>
      {d?.kind === "new" && (
        <NewTicketForm
          apps={store.apps}
          onCancel={store.closeDialog}
          onCreate={draft => { store.create(draft); store.closeDialog(); }}
        />
      )}
      {d?.kind === "import" && (
        <ImportForm
          existingNos={new Set(store.tickets.map(x => x.no))}
          appNames={store.apps.map(a => a.name)}
          onCancel={store.closeDialog}
          onImport={rows => { store.importTickets(rows); store.closeDialog(); }}
        />
      )}
      {d?.kind === "paste" && (
        <PasteAccountsForm
          onCancel={store.closeDialog}
          onAdd={a => { store.actions.addAccounts(a); store.closeDialog(); }}
        />
      )}
      {d?.kind === "spiel" && t && spiel && (
        <SpielForm
          ticket={t}
          spiel={spiel}
          appName={store.appName(t.appId)}
          analyst={analyst}
          onClose={store.closeDialog}
          onCopy={async text => {
            await store.copy(text, "Spiel copied");
            store.actions.update("notes", `${t.notes ? t.notes + "\n" : ""}[${today()}] Sent spiel: ${spiel.name}`);
            store.closeDialog();
          }}
        />
      )}
    </Dialog>
  );
}