import { useState, type FormEvent } from "react";
import { Button, DialogActions, Field, TextInput } from "@/components/ui/index";

interface ChangePasswordFormProps {
  onSubmit: (current: string, next: string, confirmation: string) => Promise<string | null>;
  onDone: () => void;
  onCancel: () => void;
}

export function ChangePasswordForm({ onSubmit, onDone, onCancel }: ChangePasswordFormProps) {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const problem = await onSubmit(current, next, confirmation);
    if (problem) setError(problem);
    else onDone();
  };

  return (
    <form onSubmit={submit} className="space-y-2.5">
      <Field label="Current password">
        <TextInput type="password" autoFocus value={current} onChange={event => { setCurrent(event.target.value); setError(""); }} />
      </Field>
      <Field label="New password">
        <TextInput type="password" value={next} onChange={event => { setNext(event.target.value); setError(""); }} />
      </Field>
      <Field label="Confirm new password">
        <TextInput type="password" value={confirmation} onChange={event => { setConfirmation(event.target.value); setError(""); }} />
      </Field>
      <div role="alert" className="min-h-4.5 text-xs font-semibold text-danger">{error}</div>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="primary">Save password</Button>
      </DialogActions>
    </form>
  );
}