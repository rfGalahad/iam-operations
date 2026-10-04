import ApplicationDetail from "../components/ApplicationDetail";
import ApplicationList from "../components/ApplicationList";

import { useCopyToast } from "../hooks/useCopyToast";
import type { ApplicationsStore } from "../hooks/useApplications";

interface Props {
  store: ApplicationsStore;
}

export const ApplicationsPage = ({ store }: Props) => {

  const { toast, copy } = useCopyToast();

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden md:flex-row">
      <ApplicationList
        apps={store.apps}
        selectedName={store.selectedName}
        onSelect={store.select}
        onAdd={store.add}
      />
      <ApplicationDetail store={store} onCopy={copy} />

      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-17.5 right-5 rounded-md bg-accent px-3.5 py-2 text-[12.5px] font-semibold text-on-accent"
        >
          {toast}
        </div>
      )}
    </div>
  );
}

export default ApplicationsPage;