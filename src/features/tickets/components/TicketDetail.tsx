import { CANCEL_REASONS, PENDING_REASONS } from "../constants";
import type { Ticket } from "../types";
import { Badge } from "./Badge";

interface Props {
  ticket: Ticket | undefined;
  onToggleCheck: (idx: number) => void;
  onExecute: () => void;
  onPending: (reason: string) => void;
  onResume: () => void;
  onCancel: (reason: string) => void;
  onComplete: () => void;
}

function ReasonSelect({ title, options, onPick }: { title: string; options: string[]; onPick: (r: string) => void }) {
  return (
    <div className="mt-2.5">
      <h3 className="section-title">{title}</h3>
      <select className="field" defaultValue="" onChange={e => e.target.value && onPick(e.target.value)}>
        <option value="" disabled>Choose reason…</option>
        {options.map(r => <option key={r} value={r}>{r}</option>)}
      </select>
    </div>
  );
}

export function TicketDetail({ 
  ticket: t, 
  onToggleCheck, 
  onExecute, 
  onPending, 
  onResume, 
  onCancel, 
  onComplete 
}: Props) {

  if (!t) return <div className="flex-1 p-10 text-sm text-sub">Select a ticket.</div>;

  const done = t.checklist.filter(c => c.checked).length;
  const allChecked = t.checklist.every(c => c.checked);
  const validating = t.state === "Open" || t.state === "Pending";

  return (
    <div className="flex-1 overflow-y-auto px-7 py-6 max-w-full md:max-w-[640px]">
      <h2 className="m-0 mb-0.5 text-lg">{t.application} — {t.category}</h2>
      <div className="font-mono text-[12.5px] text-sub">{t.number} · {t.sub} · <Badge state={t.state} /></div>

      {validating && (
        <section className="mt-[22px]">
          <h3 className="section-title">Validation Checklist</h3>
          <div className="h-1.5 bg-panel2 rounded-[3px] overflow-hidden mt-2 mb-1">
            <div className="h-full bg-accent transition-[width] duration-200" style={{ width: `${(100 * done) / t.checklist.length}%` }} />
          </div>
          <div className="text-[11.5px] text-sub">{done} of {t.checklist.length} complete</div>
          {t.checklist.map((c, i) => (
            <div key={i} className="flex items-start gap-2.5 py-[9px] border-b border-line">
              <input type="checkbox" id={`c${i}`} checked={c.checked} onChange={() => onToggleCheck(i)} className="mt-0.5 size-4 accent-accent" />
              <label htmlFor={`c${i}`} className="text-[13.5px] leading-snug">{c.label}</label>
            </div>
          ))}
          <div className="mt-[18px]">
            <button className="btn btn-primary" disabled={!allChecked} onClick={onExecute}>
              {allChecked ? "Move to Execution" : "Complete checklist to proceed"}
            </button>
          </div>
          <ReasonSelect title="Set Pending" options={PENDING_REASONS} onPick={onPending} />
          <ReasonSelect title="Cancel Ticket" options={CANCEL_REASONS} onPick={onCancel} />
        </section>
      )}

      {t.state === "Pending" && (
        <section className="mt-[22px]">
          <h3 className="section-title">Pending Status</h3>
          <div className="hint">Reason: {t.pendingReason}. Follow up, then resume validation once resolved.</div>
          <div className="mt-[18px]"><button className="btn" onClick={onResume}>Resume Validation</button></div>
        </section>
      )}

      {t.state === "Execution" && (
        <section className="mt-[22px]">
          <h3 className="section-title">Execution</h3>
          <div className="hint">All validations were confirmed before entering this stage. Pending/Cancel are locked here — execute the request in the target application, then mark complete.</div>
          <div className="mt-[18px]"><button className="btn btn-primary" onClick={onComplete}>Mark Complete</button></div>
        </section>
      )}

      {(t.state === "Closed" || t.state === "Cancelled") && (
        <section className="mt-[22px]">
          <h3 className="section-title">{t.state}</h3>
          <div className="hint">This ticket is finalized and logged below.</div>
        </section>
      )}
    </div>
  );
}