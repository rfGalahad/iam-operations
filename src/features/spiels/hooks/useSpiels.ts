import { useState } from "react";
import { usePersistentState } from "@/hooks/usePersistentState";
import { uid } from "@/lib/id";
import { ANALYST_KEY, SEED_SPIELS, SPIELS_KEY } from "../constants";
import type { Spiel, SpielDraft } from "../types";

// null = closed, { spielId: null } = adding, { spielId: "x" } = editing
type Editor = null | { spielId: string | null };

export function useSpiels() {
  const [spiels, setSpiels] = usePersistentState<Spiel[]>(SPIELS_KEY, SEED_SPIELS);
  const [analystName, setAnalystName] = usePersistentState<string>(ANALYST_KEY, "");
  const [editor, setEditor] = useState<Editor>(null);

  const save = (draft: SpielDraft) => {
    const editingId = editor?.spielId ?? null;
    setSpiels(current =>
      editingId
        ? current.map(spiel => (spiel.id === editingId ? { ...draft, id: editingId } : spiel))
        : [...current, { ...draft, id: uid() }],
    );
    setEditor(null);
  };

  const remove = (spielId: string) => {
    if (!confirm("Delete this spiel?")) return;
    setSpiels(current => current.filter(spiel => spiel.id !== spielId));
  };

  return {
    spiels,
    analystName,
    setAnalystName,
    editor,
    editingSpiel: spiels.find(spiel => spiel.id === editor?.spielId),
    save,
    remove,
    openNew: () => setEditor({ spielId: null }),
    openEdit: (spielId: string) => setEditor({ spielId }),
    closeEditor: () => setEditor(null),
  };
}

export type SpielsStore = ReturnType<typeof useSpiels>;