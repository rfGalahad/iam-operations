import { Button, Field, Section, Select, TextArea, TextInput } from "@/components/ui/index";
import { PRIORITIES, STATUSES } from "../constants";
import type { Application } from "@/features/applications/types";
import type { Spiel } from "@/features/spiels/types";
import type { Ticket, TicketActions } from "../types";
import { progress } from "../utils";
import { AccountsTable } from "./AccountsTable";
import { Checklist } from "./Checklist";
import { SidePanel } from "./SidePanel";

interface Props {
  ticket?: Ticket;
  app?: Application;
  spiels: Spiel[];
  subOptions: string[];
  actions: TicketActions;
  onUseSpiel: (id: string) => void;
  onPasteAccounts: () => void;
  onCopy: (text: string, msg: string) => void;
}

export const TicketDetail = ({ 
  ticket, 
  app, 
  spiels, 
  subOptions, 
  actions, 
  onUseSpiel, 
  onPasteAccounts, 
  onCopy 
}: Props) => {

  if (!ticket) {
    return (
      <div className="rounded-[10px] border border-line bg-panel p-7 text-center text-sub">
        Select a ticket to see its checklist and support details.
      </div>
    );
  }

  const { done, total, pct } = progress(ticket);

  return (
    <div className="rounded-[10px] border border-line bg-panel p-4">
      <h2 className="mb-0.5 text-lg font-semibold">
        <span className="font-mono">{ticket.no}</span>: {ticket.sum}
      </h2>
      <div className="flex flex-wrap gap-2.5 text-xs text-sub">
        <span>{app?.name ?? "(deleted app)"}</span>
        <span>{ticket.cat}</span>
        <span>Requester: {ticket.req}</span>
      </div>

      <div className="my-3.5 grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-2.5">
        <Field label="Status">
          <Select 
            value={ticket.status} 
            onChange={e => actions.update("status", e.target.value as Ticket["status"])}
          >
            {STATUSES.map(s => <option key={s}>{s}</option>)}
          </Select>
        </Field>
        <Field label="Priority">
          <Select value={ticket.pri} onChange={e => actions.update("pri", e.target.value as Ticket["pri"])}>
            {PRIORITIES.map(p => <option key={p}>{p}</option>)}
          </Select>
        </Field>
        <Field label="SCTask number">
          <TextInput className="font-mono" value={ticket.sc} onChange={e => actions.update("sc", e.target.value)} />
        </Field>
        <Field label="Sub-category">
          <TextInput list="subs" value={ticket.sub} onChange={e => actions.update("sub", e.target.value)} />
          <datalist id="subs">{subOptions.map(s => <option key={s} value={s} />)}</datalist>
        </Field>
      </div>

      {ticket.status === "Pending" && (
        <div className="mb-2.5">
          <Field label="Pending on">
            <TextInput
              placeholder="Who or what are you waiting for?"
              value={ticket.pend}
              onChange={e => actions.update("pend", e.target.value)}
            />
          </Field>
        </div>
      )}

      <div className="grid gap-4.5 min-[1001px]:grid-cols-[1fr_300px]">
        <div>
          <Section title={`Checklist (${done}/${total}, ${pct}%)`}>
            <Checklist 
              items={ticket.checks} 
              onToggle={actions.toggleCheck} 
              onRemove={actions.removeCheck} 
              onAdd={actions.addCheck} 
            />
          </Section>

          <Section title={`Accounts (${ticket.accts.length})`}>
            <AccountsTable
              accounts={ticket.accts}
              onAdd={actions.addAccount}
              onPaste={onPasteAccounts}
              onChange={actions.updateAccount}
              onRemove={actions.removeAccount}
            />
          </Section>

          <Section title="Notes">
            <TextArea
              placeholder="Work notes, evidence links, account IDs"
              value={ticket.notes}
              onChange={e => actions.update("notes", e.target.value)}
            />
          </Section>

          <div className="mt-3.5 flex gap-2">
            <Button size="sm" onClick={actions.resetChecklist}>Reload checklist from template</Button>
            <Button size="sm" variant="danger" onClick={actions.remove}>Delete ticket</Button>
          </div>
        </div>

        <SidePanel 
          app={app} 
          ticket={ticket} 
          spiels={spiels} 
          onCopy={onCopy} 
          onUseSpiel={onUseSpiel} 
        />
      </div>
    </div>
  );
}