import type { ApplicationsStore } from "../hooks/useApplications";

import CredentialsSection from "./applicationSections/CredentialsSection";
import DosDonts from "./applicationSections/DosDonts";
import ProcessSteps from "./applicationSections/ProcessSteps";
import SupportContacts from "./applicationSections/SupportContacts";

interface Props {
  store: ApplicationsStore;
  onCopy: (label: string, value: string) => void;
}

export default function ApplicationDetail({ store, onCopy }: Props) {
  const app = store.selected;

  if (!app) {
    return <div className="flex-1 p-10 text-sm text-sub">Select an application.</div>;
  }

  const meta = [app.env, app.url].filter(Boolean).join(" · ");

  return (
    <div className="min-h-0 flex-1 overflow-y-auto px-7 py-6">
      <div className="max-w-160">
        <header>
          <h2 className="m-0 mb-0.5 text-lg font-semibold">{app.name}</h2>
          <div className="font-mono text-[12.5px] text-sub">{meta}</div>
          {app.notes && <p className="mb-0 mt-2 text-[13px] text-sub">{app.notes}</p>}
        </header>

        <CredentialsSection key={app.name} app={app} onCopy={onCopy} />

        <ProcessSteps
          categories={app.categories}
          active={store.category}
          onActiveChange={store.setCategory}
          onAdd={store.addStep}
          onRemove={store.removeStep}
        />

        <DosDonts dos={app.dos} donts={app.donts} />

        <SupportContacts
          contacts={app.support}
          onAdd={store.addSupport}
          onRemove={store.removeSupport}
        />
      </div>
    </div>
  );
}