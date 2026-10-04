import { useState } from "react";
import type { ProcessCategory } from "../../types";
import { PrimaryButton, Row, RowButton, Section, TextInput } from "@/components/ui";

interface Props {
  categories: ProcessCategory[];
  active: string;
  onActiveChange: (name: string) => void;
  onAdd: (step: string) => void;
  onRemove: (idx: number) => void;
}

export default function ProcessSteps({ categories, active, onActiveChange, onAdd, onRemove }: Props) {
  const [draft, setDraft] = useState("");
  const current = categories.find(c => c.name === active);

  const submit = () => {
    if (!draft.trim()) return;
    onAdd(draft);
    setDraft("");
  };

  return (
    <Section title="Process steps">
      <div role="tablist" aria-label="Process" className="flex flex-wrap gap-1">
        {categories.map(c => {
          const isActive = c.name === active;
          return (
            <button
              key={c.name}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onActiveChange(c.name)}
              className={[
                "cursor-pointer rounded-md border px-3.5 py-[7px] text-[13px] font-semibold",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                isActive
                  ? "border-line bg-panel2 text-text"
                  : "border-transparent bg-transparent text-sub hover:text-text",
              ].join(" ")}
            >
              {c.name}
            </button>
          );
        })}
      </div>

      {current && (
        <div className="mt-2.5">
          {current.steps.map((s, i) => (
            <Row key={`${i}-${s}`}>
              <span className="flex-1">{i + 1}. {s}</span>
              <RowButton onClick={() => onRemove(i)} aria-label={`Remove step ${i + 1}`}>Remove</RowButton>
            </Row>
          ))}
          {current.steps.length === 0 && <p className="mt-2 text-xs text-sub">No steps yet.</p>}
          <div className="mt-2.5 flex gap-2">
            <TextInput
              placeholder={`Add step for ${active}…`}
              value={draft}
              onChange={e => setDraft(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") submit(); }}
            />
            <PrimaryButton onClick={submit}>Add</PrimaryButton>
          </div>
        </div>
      )}
    </Section>
  );
}