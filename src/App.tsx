import { useState } from "react";
import Header, { type View } from "./components/Header";
import { useCopyText } from "./hooks/useCopyText";
import { useToast } from "./hooks/useToast";
import { AccountsLogPage } from "./features/accountsLog";
import { ApplicationsPage, useApplications } from "./features/applications";
import { ChangePasswordForm, LockScreen, useLock } from "./features/auth";
import { useSpiels, SpielsPage } from "./features/spiels";
import { TicketsViewPage, useTickets } from "./features/tickets";
import { Dialog, Toast } from "@/components/ui/index";

export default function App() {

  const [view, setView] = useState<View>("Tickets");
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);

  const toast = useToast();
  const copyText = useCopyText(toast.show);

  const appsStore = useApplications();
  const spielsStore = useSpiels();
  const tickets = useTickets(appsStore.apps, spielsStore.spiels, {
    notify: toast.show,
    addApps: appsStore.addMany,
  });

  const lock = useLock(() => {
    tickets.closeDialog();
    appsStore.closeEditor();
    spielsStore.closeEditor();
    setIsPasswordDialogOpen(false);
  });

  if (lock.isLocked) {
    return (
      <LockScreen
        hasPassword={lock.hasPassword}
        onUnlock={lock.unlock}
        onCreatePassword={lock.createPassword}
        onForgot={lock.forgotPassword}
      />
    );
  }

  const openTicket = (ticketId: string) => {
    tickets.select(ticketId);
    tickets.setFilter("All");
    setView("Tickets");
  };

  return (
    <div className="flex h-full flex-col">
      <Header
        view={view}
        onViewChange={setView}
        onChangePassword={() => setIsPasswordDialogOpen(true)}
        onLock={lock.lock}
      />

      <div className="min-h-0 flex-1 overflow-y-auto">
        {view === "Tickets" && <TicketsViewPage store={tickets} analyst={spielsStore.analystName} />}
        {view === "Applications" && (
          <ApplicationsPage 
            store={appsStore} 
            onCopy={copyText} 
          />
        )}
        {view === "Spiels" && <SpielsPage store={spielsStore} applications={appsStore.apps} />}
        {view === "Accounts Log" && (
          <AccountsLogPage
            tickets={tickets.tickets}
            applicationNameOf={tickets.appName}
            onOpenTicket={openTicket}
            onMarkLogged={tickets.markLogged}
            onCopy={copyText}
          />
        )}
      </div>

      <Dialog
        open={isPasswordDialogOpen}
        title="Change password"
        onClose={() => setIsPasswordDialogOpen(false)}
      >
        <ChangePasswordForm
          onSubmit={lock.changePassword}
          onCancel={() => setIsPasswordDialogOpen(false)}
          onDone={() => { setIsPasswordDialogOpen(false); toast.show("Password changed"); }}
        />
      </Dialog>

      <Toast message={toast.msg} />
    </div>
  );
}