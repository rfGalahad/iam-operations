import { useState } from "react";
import { Button, Hint, TextInput } from "@/components/ui/index";
import type { CheckItem } from "../types";

//-------------------------------------
// TYPES
//-------------------------------------
interface Props {
  items: CheckItem[];
  onToggle: (i: number) => void;
  onRemove: (i: number) => void;
  onAdd: (text: string) => void;
}

//-------------------------------------
// COMPONENT
//-------------------------------------
export const Checklist = ({ 
  items, 
  onToggle, 
  onRemove, 
  onAdd 
}: Props) => {
  
  const [text, setText] = useState("");
  const add = () => {
    const v = text.trim();
    if (!v) return;
    onAdd(v);
    setText("");
  };

  return (
    <>
      {items.length === 0 && <Hint>No items yet.</Hint>}
      {items.map((c, i) => (
        <div key={i} className="flex items-start gap-2 border-b border-line py-2">
          <input
            type="checkbox"
            id={`c${i}`}
            checked={c.done}
            onChange={() => onToggle(i)}
            className="mt-0.75 accent-accent"
          />
          <label htmlFor={`c${i}`} className={`text-sm ${c.done ? "text-sub line-through" : ""}`}>{c.text}</label>
          <button
            type="button"
            aria-label="Remove item"
            title="Remove"
            onClick={() => onRemove(i)}
            className="ml-auto cursor-pointer border-0 bg-transparent text-base text-sub hover:text-text"
          >
            &times;
          </button>
        </div>
      ))}
      <div className="mt-2 flex gap-1.5">
        <TextInput
          placeholder="Add a checklist item"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === "Enter" && add()}
        />
        <Button onClick={add}>Add</Button>
      </div>
    </>
  );
}