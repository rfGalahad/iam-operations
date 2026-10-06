import { Button, Dialog, Field, Hint, TextInput } from "@/components/ui/index";
import type { Application } from "@/features/applications/types";
import { PlaceholderCodes } from "../components/PlaceholderCodes";
import { SpielCard } from "../components/SpielCard";
import { SpielEditorForm } from "../components/SpielEditorForm";
import type { SpielsStore } from "../hooks/useSpiels";

interface SpielsPageProps {
  store: SpielsStore;
  applications: Application[];
}

export const SpielsPage = ({ store, applications }: SpielsPageProps) => {
  const applicationNameOf = (appId: string) => {
    if (!appId) return "All applications";
    return applications.find(application => application.id === appId)?.name ?? "(deleted app)";
  };

  return (
    <main className="mx-auto max-w-7xl px-5 py-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <b>Spiel library</b>
          <Hint>Message templates you send from a ticket. Placeholders: <PlaceholderCodes /></Hint>
        </div>
        <Button variant="primary" onClick={store.openNew}>Add spiel</Button>
      </div>

      <div className="mb-3 max-w-xs">
        <Field label="Your name (fills {{analyst}})">
          <TextInput value={store.analystName} onChange={event => store.setAnalystName(event.target.value)} />
        </Field>
      </div>

      {store.spiels.length ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-3.5">
          {store.spiels.map(spiel => (
            <SpielCard
              key={spiel.id}
              spiel={spiel}
              applicationName={applicationNameOf(spiel.appId)}
              onEdit={() => store.openEdit(spiel.id)}
              onDelete={() => store.remove(spiel.id)}
            />
          ))}
        </div>
      ) : (
        <div className="p-7 text-center text-sub">No spiels yet. Add your first one.</div>
      )}

      <Dialog
        open={store.editor !== null}
        title={store.editingSpiel ? "Edit spiel" : "Add spiel"}
        onClose={store.closeEditor}
      >
        <SpielEditorForm
          spiel={store.editingSpiel}
          applications={applications}
          onSave={store.save}
          onCancel={store.closeEditor}
        />
      </Dialog>
    </main>
  );
};

export default SpielsPage;