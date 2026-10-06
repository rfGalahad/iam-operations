import { useState } from "react";
import { Button, DialogActions, Hint, TextArea } from "@/components/ui/index";
import type { Account } from "../types";
import { parseAccounts } from "../utils";

export function PasteAccountsForm({ onAdd, onCancel }: { onAdd: (a: Account[]) => void; onCancel: () => void }) {
  const [text, setText] = useState("");
  const parsed = parseAccounts(text);

  return (
    <>
      <Hint>
        One account per line. Columns: User ID, Name, Roles / profile, Service account (Y or N). Copy the cells
        from Excel and paste; tab or | both work.
      </Hint>
      <TextArea className="mt-2 min-h-50" autoFocus value={text} onChange={e => setText(e.target.value)} />
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button variant="primary" disabled={!parsed.length} onClick={() => onAdd(parsed)}>Add accounts</Button>
      </DialogActions>
    </>
  );
}