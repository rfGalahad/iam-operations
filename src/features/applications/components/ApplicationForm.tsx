import { useState, type FormEvent } from "react";
import { Button, DialogActions, Field, Hint, Section, TextArea, TextInput } from "@/components/ui/index";
import { CATEGORIES } from "@/features/tickets/constants";
import type { Application, ApplicationDraft } from "../types";
import { formatContacts, formatCredentials, parseContacts, parseCredentials, splitLines } from "../utils";

interface ApplicationFormProps {
  application?: Application;
  onSave: (draft: ApplicationDraft) => void;
  onCancel: () => void;
}

export function ApplicationForm({ application, onSave, onCancel }: ApplicationFormProps) {

  const [name, setName] = useState(application?.name ?? "");
  const [processText, setProcessText] = useState(application?.process ?? "");
  const [contactsText, setContactsText] = useState(() => formatContacts(application?.contacts ?? []));
  const [credentialsText, setCredentialsText] = useState(() => formatCredentials(application?.creds ?? []));
  const [checklistTexts, setChecklistTexts] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      CATEGORIES.map(category => [category, (application?.checklist[category] ?? []).join("\n")]),
    ),
  );
  const [error, setError] = useState("");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) return setError("Name is required.");

    onSave({
      name: trimmedName,
      process: processText.trim(),
      contacts: parseContacts(contactsText),
      creds: parseCredentials(credentialsText),
      checklist: Object.fromEntries(
        CATEGORIES.map(category => [category, splitLines(checklistTexts[category])]),
      ),
      categories: CATEGORIES.map(category => ({
        name: category,
        steps: splitLines(checklistTexts[category]),
      })),
    });
  };

  return (
    <form onSubmit={submit} className="space-y-2.5">
      <Field label="Name">
        <TextInput autoFocus value={name} onChange={event => { setName(event.target.value); setError(""); }} />
      </Field>
      <Field label="Process (steps for the analyst)">
        <TextArea className="min-h-25" value={processText} onChange={event => setProcessText(event.target.value)} />
      </Field>
      <Field label="Support contacts, one per line: Name | Role | Email or phone">
        <TextArea value={contactsText} onChange={event => setContactsText(event.target.value)} />
      </Field>
      <Field label="Credentials, one per line: Label | Username | Password or vault path">
        <TextArea value={credentialsText} onChange={event => setCredentialsText(event.target.value)} />
      </Field>
      <Hint>
        Saved in this browser behind your lock screen, not encrypted. For sensitive accounts, store the vault
        path instead of the password.
      </Hint>

      <Section title="Checklist templates (one item per line)">
        <div className="space-y-2.5">
          {CATEGORIES.map(category => (
            <Field key={category} label={category}>
              <TextArea
                value={checklistTexts[category]}
                onChange={event => setChecklistTexts(current => ({ ...current, [category]: event.target.value }))}
              />
            </Field>
          ))}
        </div>
      </Section>

      {error && <div role="alert" className="text-xs text-danger">{error}</div>}
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="primary">Save application</Button>
      </DialogActions>
    </form>
  );
}