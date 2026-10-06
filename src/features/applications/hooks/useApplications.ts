import { useState } from "react";
import { usePersistentState } from "@/hooks/usePersistentState";
import { uid } from "@/lib/id";
import type { Application, ApplicationDraft } from "../types";

export const APPLICATIONS_KEY = "iam_desk_applications";

// null = closed, { applicationId: null } = adding, { applicationId: "x" } = editing
type Editor = null | { applicationId: string | null };

export function useApplications() {
  const [apps, setApps] = usePersistentState<Application[]>(APPLICATIONS_KEY, []);
  const [editor, setEditor] = useState<Editor>(null);

  const save = (draft: ApplicationDraft) => {
    const editingId = editor?.applicationId ?? null;
    setApps(current =>
      editingId
        ? current.map(application => (application.id === editingId ? { ...draft, id: editingId } : application))
        : [...current, { ...draft, id: uid() }],
    );
    setEditor(null);
  };

  const remove = (applicationId: string) => {
    if (!confirm("Delete this application? Existing tickets keep their checklists.")) return;
    setApps(current => current.filter(application => application.id !== applicationId));
  };

  return {
    apps,
    editor,
    editingApplication: apps.find(application => application.id === editor?.applicationId),
    save,
    remove,
    addMany: (list: Application[]) => setApps(current => [...current, ...list]),
    openNew: () => setEditor({ applicationId: null }),
    openEdit: (applicationId: string) => setEditor({ applicationId }),
    closeEditor: () => setEditor(null),
  };
}

export type ApplicationsStore = ReturnType<typeof useApplications>;