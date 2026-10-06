import { Button, Dialog, Hint } from "@/components/ui/index";
import { ApplicationCard } from "../components/ApplicationCard";
import { ApplicationForm } from "../components/ApplicationForm";
import type { ApplicationsStore } from "../hooks/useApplications";

interface ApplicationsPageProps {
  store: ApplicationsStore;
  onCopy: (text: string, message: string) => void;
}

export const ApplicationsPage = ({ 
  store, 
  onCopy 
}: ApplicationsPageProps) => (
  <main className="mx-auto max-w-7xl px-5 py-4">
    <div className="mb-4 flex items-center justify-between gap-3">
      <div>
        <b>Application library</b>
        <Hint>Tickets pull their checklist, process, contacts and credential locations from here.</Hint>
      </div>
      <Button 
        variant="primary" 
        onClick={store.openNew}>
          Add application
        </Button>
    </div>

    {store.apps.length ? (
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-3.5">
        {store.apps.map(application => (
          <ApplicationCard
            key={application.id}
            application={application}
            onEdit={() => store.openEdit(application.id)}
            onDelete={() => store.remove(application.id)}
            onCopy={onCopy}
          />
        ))}
      </div>
    ) : (
      <div className="p-7 text-center text-sub">No applications yet.</div>
    )}

    <Dialog
      open={store.editor !== null}
      title={store.editingApplication ? "Edit application" : "Add application"}
      onClose={store.closeEditor}
    >
      <ApplicationForm
        application={store.editingApplication}
        onSave={store.save}
        onCancel={store.closeEditor}
      />
    </Dialog>
  </main>
);

export default ApplicationsPage;