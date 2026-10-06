import { Button } from "@/components/ui/index";
import { StatusBadge } from "@/features/tickets/components/StatusBadge";
import type { Spiel } from "../types";

interface SpielCardProps {
  spiel: Spiel;
  applicationName: string;
  onEdit: () => void;
  onDelete: () => void;
}

export function SpielCard({ spiel, applicationName, onEdit, onDelete }: SpielCardProps) {


  return (
    <article className="rounded-[10px] border border-line bg-panel p-3.5">
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-bold">{spiel.name}</h2>
        <span className="flex gap-1.5 whitespace-nowrap">
          <Button size="sm" onClick={onEdit}>Edit</Button>
          <Button size="sm" variant="danger" onClick={onDelete}>Delete</Button>
        </span>
      </div>

      <div className="mt-0.5 flex flex-wrap items-center gap-2.5 text-xs text-sub">
        <StatusBadge
          status={spiel.when === "Any" ? "Closed" : spiel.when}
          label={spiel.when === "Any" ? "Any status" : undefined}
        />
        <span>{applicationName}</span>
      </div>

      <div className="mt-2 max-h-37.5 overflow-auto whitespace-pre-wrap">{spiel.body}</div>
    </article>
  );
}