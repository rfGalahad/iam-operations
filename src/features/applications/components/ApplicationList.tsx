import { useState } from "react";
import type { Application } from "../types";
import { GhostButton, PrimaryButton, TextInput } from "../../../components/ui";

interface Props {
  apps: Application[];
  selectedName: string;
  onSelect: (name: string) => void;
  onAdd: (name: string) => boolean;
}

export default function ApplicationList({ apps, selectedName, onSelect, onAdd }: Props) {
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const close = () => { setAdding(false); setName(""); setError(""); };
  const submit = () => {
    if (onAdd(name)) close();
    else setError("Enter a name that isn't already in the list.");
  };

  return (
    <nav
      aria-label="Applications"
      className="max-h-[30vh] w-full shrink-0 overflow-y-auto border-b border-line bg-panel md:max-h-none md:w-[280px] md:border-b-0 md:border-r"
    >
      {apps.map(a => {
        const active = a.name === selectedName;
        return (
          <button
            key={a.name}
            type="button"
            aria-current={active}
            onClick={() => onSelect(a.name)}
            className={[
              "block w-full cursor-pointer border-b border-line px-3.5 py-3 text-left text-[13.5px] font-semibold text-text",
              "hover:bg-panel2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent",
              active ? "bg-panel2 shadow-[inset_3px_0_0_var(--accent)]" : "",
            ].join(" ")}
          >
            {a.name}
            <span className="mt-0.5 block text-[11px] font-normal text-sub">{a.env}</span>
          </button>
        );
      })}

      {!adding ? (
        <button
          type="button"
          onClick={() => setAdding(true)}
          className="block w-full cursor-pointer px-3.5 py-3 text-left text-[13.5px] font-semibold text-accent hover:bg-panel2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
        >
          + Add application
        </button>
      ) : (
        <div className="flex flex-col gap-2 px-3.5 py-2.5">
          <TextInput
            autoFocus
            placeholder="Application name"
            value={name}
            onChange={e => { setName(e.target.value); setError(""); }}
            onKeyDown={e => { if (e.key === "Enter") submit(); if (e.key === "Escape") close(); }}
          />
          {error && <p className="m-0 text-xs text-danger">{error}</p>}
          <div className="flex gap-2.5">
            <PrimaryButton className="px-3 py-1.5" onClick={submit}>Add</PrimaryButton>
            <GhostButton className="px-3 py-1.5" onClick={close}>Cancel</GhostButton>
          </div>
        </div>
      )}
    </nav>
  );
}