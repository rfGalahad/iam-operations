import { useState } from "react";
import type { SupportContact } from "../../types";
import { PrimaryButton, Row, RowButton, Section, TextInput } from "@/components/ui";

interface Props {
  contacts: SupportContact[];
  onAdd: (c: SupportContact) => void;
  onRemove: (idx: number) => void;
}

export default function SupportContacts({ contacts, onAdd, onRemove }: Props) {
  const [draft, setDraft] = useState<SupportContact>({ name: "", contact: "" });

  const submit = () => {
    if (!draft.name.trim()) return;
    onAdd(draft);
    setDraft({ name: "", contact: "" });
  };

  return (
    <Section title="Support contacts">
      {contacts.map((s, i) => (
        <Row key={`${i}-${s.name}`}>
          <span className="shrink-0 text-sub">{s.name}</span>
          <span className="flex-1 break-all font-mono">{s.contact}</span>
          <RowButton onClick={() => onRemove(i)} aria-label={`Remove ${s.name}`}>Remove</RowButton>
        </Row>
      ))}
      {contacts.length === 0 && <p className="text-xs text-sub">No support contacts yet.</p>}
      <div className="mt-2.5 flex flex-wrap gap-2">
        <TextInput
          className="min-w-[140px] flex-1"
          placeholder="Team or person"
          value={draft.name}
          onChange={e => setDraft(d => ({ ...d, name: e.target.value }))}
        />
        <TextInput
          className="min-w-[140px] flex-1"
          placeholder="Email or Slack"
          value={draft.contact}
          onChange={e => setDraft(d => ({ ...d, contact: e.target.value }))}
          onKeyDown={e => { if (e.key === "Enter") submit(); }}
        />
        <PrimaryButton onClick={submit}>Add</PrimaryButton>
      </div>
    </Section>
  );
}