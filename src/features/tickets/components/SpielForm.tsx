import { useState } from "react";
import { Button, DialogActions, Hint, TextArea } from "@/components/ui/index";
import type { Spiel } from "@/features/spiels/types";
import type { Ticket } from "../types";
import { fillSpiel } from "../utils";

interface Props {
  ticket: Ticket;
  spiel: Spiel;
  appName: string;
  analyst: string;
  onCopy: (text: string) => void;
  onClose: () => void;
}

export function SpielForm({ ticket, spiel, appName, analyst, onCopy, onClose }: Props) {
  const [text, setText] = useState(() => fillSpiel(ticket, spiel.body, { appName, analyst }));
  const left = [...new Set([...text.matchAll(/\{\{(\w+)\}\}/g)].map(m => m[1]))];

  return (
    <>
      <TextArea className="min-h-[260px]" value={text} onChange={e => setText(e.target.value)} />
      <Hint>
        {left.length ? (
          <>
            Still to fill in:{" "}
            {left.map(k => <code key={k} className="mr-1 rounded bg-panel2 px-1">{`{{${k}}}`}</code>)}
            Add the missing detail on the ticket or edit the text here.
          </>
        ) : "Ready to send. You can edit the text before copying."}
      </Hint>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button variant="primary" onClick={() => onCopy(text)}>Copy and log in notes</Button>
      </DialogActions>
    </>
  );
}