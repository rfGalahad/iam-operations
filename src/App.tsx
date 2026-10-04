import { useMemo, useState } from "react";
import Header, { type View } from "./components/Header";
import { ApplicationsPage, useApplications } from "./features/applications";
import { TicketsViewPage, useTickets } from "./features/tickets";

export default function App() {

  const [view, setView] = useState<View>("Tickets");
  
  const tickets = useTickets();
  const appsStore = useApplications();

  const applicationNames = useMemo(
    () => appsStore.apps.map(a => a.name),
    [appsStore.apps],
  );

  return (
    <div className="flex h-full flex-col">
      <Header 
        view={view} 
        onViewChange={setView} 
        counts={tickets.counts} 
      />

      {view === "Applications" ? (
        <ApplicationsPage store={appsStore} />
      ) : (
        <TicketsViewPage 
          store={tickets} 
          applicationNames={applicationNames} 
        />
      )}
    </div>
  );
}