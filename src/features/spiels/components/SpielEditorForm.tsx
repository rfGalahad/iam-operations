import { useState, type FormEvent } from "react";
import { Button, DialogActions, Field, Hint, Select, TextArea, TextInput } from "@/components/ui/index";
import type { Application } from "@/features/applications/types";
import { STATUSES } from "@/features/tickets/constants";
import type { Spiel, SpielDraft, SpielWhen } from "../types";
import { PlaceholderCodes } from "./PlaceholderCodes";

interface SpielEditorFormProps {
  spiel?: Spiel;
  applications: Application[];
  onSave: (draft: SpielDraft) => void;
  onCancel: () => void;
}

export function SpielEditorForm({ spiel, applications, onSave, onCancel }: SpielEditorFormProps) {
  const [name, setName] = useState(spiel?.name ?? "");
  const [when, setWhen] = useState<SpielWhen>(spiel?.when ?? "Any");
  const [appId, setAppId] = useState(spiel?.appId ?? "");
  const [body, setBody] = useState(spiel?.body ?? "");
  const [error, setError] = useState("");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !body.trim()) return setError("Name and message are required.");
    onSave({ name: name.trim(), when, appId, body });
  };

  return (
    <form onSubmit={submit} className="space-y-2.5">
      <Field label="Name">
        <TextInput
          autoFocus
          placeholder="Cancellation: 3-strike rule"
          value={name}
          onChange={event => { setName(event.target.value); setError(""); }}
        />
      </Field>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-2.5">
        <Field label="Suggest when ticket is">
          <Select value={when} onChange={event => setWhen(event.target.value as SpielWhen)}>
            {["Any", ...STATUSES].map(option => <option key={option}>{option}</option>)}
          </Select>
        </Field>
        <Field label="Applies to">
          <Select value={appId} onChange={event => setAppId(event.target.value)}>
            <option value="">All applications</option>
            {applications.map(application => (
              <option key={application.id} value={application.id}>{application.name}</option>
            ))}
          </Select>
        </Field>
      </div>

      <Field label="Message">
        <TextArea
          className="min-h-55"
          value={body}
          onChange={event => { setBody(event.target.value); setError(""); }}
        />
      </Field>
      <Hint>Placeholders: <PlaceholderCodes /></Hint>

      {error && <div role="alert" className="text-xs text-danger">{error}</div>}
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="primary">Save spiel</Button>
      </DialogActions>
    </form>
  );
}