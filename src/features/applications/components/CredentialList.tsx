import { useState, type ReactNode } from "react";
import { Hint, RowButton } from "@/components/ui/index";
import type { Credential } from "../types";

interface ValueRowProps { text: string; onCopy: () => void; children?: ReactNode }

function ValueRow({ text, onCopy, children }: ValueRowProps) {
  return (
    <div className="mt-1.25 flex items-center gap-1.5">
      <button
        type="button"
        title="Click to copy"
        onClick={onCopy}
        className="flex-1 cursor-pointer wrap-break-word rounded border border-line bg-bg px-1.75 py-0.75 text-left font-mono text-xs hover:border-accent"
      >
        {text}
      </button>
      {children}
      <RowButton onClick={onCopy}>Copy</RowButton>
    </div>
  );
}

interface CredentialItemProps {
  credential: Credential;
  onCopy: (text: string, message: string) => void;
}

function CredentialItem({ credential, onCopy }: CredentialItemProps) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="border-b border-line py-1.5 last:border-b-0">
      <b>{credential.label}</b>
      {credential.username && (
        <ValueRow text={credential.username} onCopy={() => onCopy(credential.username, "Username copied")} />
      )}
      {credential.password && (
        <ValueRow
          text={showPassword ? credential.password : "••••••••"}
          onCopy={() => onCopy(credential.password, "Password copied")}
        >
          <RowButton onClick={() => setShowPassword(current => !current)}>
            {showPassword ? "Hide" : "Show"}
          </RowButton>
        </ValueRow>
      )}
    </div>
  );
}

interface CredentialListProps {
  credentials: Credential[];
  onCopy: (text: string, message: string) => void;
}

export function CredentialList({ credentials, onCopy }: CredentialListProps) {
  if (!credentials.length) return <Hint>None listed. Add them under Applications.</Hint>;
  return (
    <>
      {credentials.map((credential, index) => (
        <CredentialItem key={index} credential={credential} onCopy={onCopy} />
      ))}
    </>
  );
}