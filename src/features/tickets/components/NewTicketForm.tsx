import { useState, type ChangeEvent, type FormEvent } from "react";
import { Button, DialogActions, Field, Hint, Select, TextInput } from "@/components/ui/index";
import { CATEGORIES, PRIORITIES } from "../constants";

import type { Application } from "@/features/applications/types";
import type { NewTicketDraft } from "../types";

interface Props { 
  apps: Application[]; 
  onCreate: (d: NewTicketDraft) => void; 
  onCancel: () => void 
}

export const NewTicketForm = ({ 
  apps, 
  onCreate, 
  onCancel 
}: Props) => {

  const [d, setD] = useState<NewTicketDraft>({
    no: "", 
    sum: "", 
    appId: apps[0]?.id ?? "", 
    cat: CATEGORIES[0], 
    sc: "", 
    sub: "", 
    req: "", 
    pri: "Medium",
  });
  const [error, setError] = useState("");

  const bind = (k: keyof NewTicketDraft) => ({
    value: d[k],
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setD(p => ({ ...p, [k]: e.target.value })),
  });

  if (!apps.length) {
    return (
      <>
        <Hint>Add an application first.</Hint>
        <DialogActions><Button onClick={onCancel}>Close</Button></DialogActions>
      </>
    );
  }

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const v = { ...d, no: d.no.trim(), sum: d.sum.trim(), sc: d.sc.trim(), sub: d.sub.trim(), req: d.req.trim() };
    if (!v.no || !v.sum) return setError("Ticket number and summary are required.");
    onCreate(v);
  };

  const grid = "grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-2.5";

  return (
    <form onSubmit={submit} className="space-y-2.5">
      <Field label="Ticket number"><TextInput autoFocus placeholder="RITM0000000" {...bind("no")} /></Field>
      <Field label="Summary"><TextInput {...bind("sum")} /></Field>
      <div className={grid}>
        <Field label="Application">
          <Select {...bind("appId")}>{apps.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}</Select>
        </Field>
        <Field label="Category">
          <Select {...bind("cat")}>{CATEGORIES.map(c => <option key={c}>{c}</option>)}</Select>
        </Field>
      </div>
      <div className={grid}>
        <Field label="SCTask number"><TextInput {...bind("sc")} /></Field>
        <Field label="Sub-category"><TextInput {...bind("sub")} /></Field>
      </div>
      <div className={grid}>
        <Field label="Requester"><TextInput {...bind("req")} /></Field>
        <Field label="Priority">
          <Select {...bind("pri")}>{PRIORITIES.map(p => <option key={p}>{p}</option>)}</Select>
        </Field>
      </div>
      <Hint>The checklist is copied from the application's template for this category.</Hint>
      {error && <div role="alert" className="text-xs text-danger">{error}</div>}
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="primary">Create ticket</Button>
      </DialogActions>
    </form>
  );
}