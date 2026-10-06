import { useState, type ChangeEvent } from "react";
import { Button, DialogActions, Hint } from "@/components/ui/index";
import { downloadTemplate, parseRows, readRows, type ImportRow } from "../importParser";

type State =
  | { kind: "idle" }
  | { kind: "reading" }
  | { kind: "error"; msg: string }
  | { kind: "ready"; rows: ImportRow[]; missing: string[] };

interface Props {
  existingNos: Set<string>;
  appNames: string[];
  onImport: (rows: ImportRow[]) => void;
  onCancel: () => void;
}

export function ImportForm({ existingNos, appNames, onImport, onCancel }: Props) {
  const [state, setState] = useState<State>({ kind: "idle" });

  const onFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setState({ kind: "reading" });
    try {
      const res = parseRows(await readRows(file));
      setState("error" in res ? { kind: "error", msg: res.error } : { kind: "ready", ...res });
    } catch {
      setState({ kind: "error", msg: "Could not read that file. Save it as CSV and try again." });
    }
  };

  const ready = state.kind === "ready" ? state : null;
  const dup = ready ? ready.rows.filter(r => existingNos.has(r.no)).length : 0;
  const fresh = ready ? ready.rows.length - dup : 0;
  const newApps = ready
    ? [...new Set(ready.rows.map(r => r.app || "(Unassigned)"))].filter(
        n => !appNames.some(a => a.toLowerCase() === n.toLowerCase()),
      )
    : [];

  return (
    <>
      <Hint>
        Excel (.xlsx) or CSV, one row per ticket. Columns: Ticket Number, Application, Category, Sub-Category,
        Requester, Priority. Add the users, SCTask and roles on each ticket afterwards. Tickets that already
        exist are skipped.
      </Hint>
      <input type="file" accept=".csv,.txt,.xlsx,.xls" onChange={onFile} className="mt-2.5 text-[13px]" />

      <div className="mt-2.5 text-xs text-sub" aria-live="polite">
        {state.kind === "reading" && "Reading..."}
        {state.kind === "error" && <span className="text-danger">{state.msg}</span>}
        {ready && (
          <>
            Found <b>{fresh}</b> new tickets.
            {dup > 0 && <><br />{dup} already exist and will be skipped.</>}
            {newApps.length > 0 && <><br />New applications will be created: {newApps.join(", ")}.</>}
            {ready.missing.length > 0 && <><br />Columns not found (left blank): {ready.missing.join(", ")}.</>}
          </>
        )}
      </div>

      <DialogActions>
        <Button size="sm" onClick={downloadTemplate}>Download CSV template</Button>
        <span className="flex-1" />
        <Button onClick={onCancel}>Cancel</Button>
        <Button variant="primary" disabled={!ready || fresh === 0} onClick={() => ready && onImport(ready.rows)}>
          Import
        </Button>
      </DialogActions>
    </>
  );
}