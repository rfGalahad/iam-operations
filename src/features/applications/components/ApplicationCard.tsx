import { Box, Button } from "@/components/ui/index";
import type { Application } from "../types";
import { CredentialList } from "./CredentialList";

interface ApplicationCardProps {
  application: Application;
  onEdit: () => void;
  onDelete: () => void;
  onCopy: (text: string, message: string) => void;
}

export const ApplicationCard = ({ 
  application, 
  onEdit, 
  onDelete, 
  onCopy 
}: ApplicationCardProps) => {

  return (
    <article className="rounded-[10px] border border-line bg-panel p-3.5">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-base font-bold">{application.name}</h2>
        <span className="flex gap-1.5">
          <Button size="sm" onClick={onEdit}>Edit</Button>
          <Button size="sm" variant="danger" onClick={onDelete}>Delete</Button>
        </span>
      </div>

      <div className="mt-3 [&>div]:mb-0">
        <Box title="Credentials">
          <CredentialList credentials={application.creds} onCopy={onCopy} />
        </Box>
      </div>
    </article>
  );
}