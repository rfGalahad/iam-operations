import { useState } from "react";
import { Row, RowButton, Section } from "@/components/ui";
import type { Application } from "../../types";

interface Props {
  app: Application;
  onCopy: (label: string, value: string) => void;
}

const MASK = "••••••••••";

/** Render with key={app.name} so the password re-hides when switching apps. */
export default function CredentialsSection({ app, onCopy }: Props) {
  const [revealed, setRevealed] = useState(false);

  return (
    <Section title="Credentials">
      <Row>
        <span className="w-30 shrink-0 text-sub">Username</span>
        <span className="flex-1 break-all font-mono">{app.username || "—"}</span>
        <RowButton onClick={() => onCopy("Username", app.username)} disabled={!app.username}>Copy</RowButton>
      </Row>
      <Row>
        <span className="w-30 shrink-0 text-sub">Password</span>
        <span className="flex-1 break-all font-mono">{app.password ? (revealed ? app.password : MASK) : "—"}</span>
        <div className="flex gap-1.5">
          <RowButton onClick={() => setRevealed(r => !r)} disabled={!app.password}>
            {revealed ? "Hide" : "Reveal"}
          </RowButton>
          <RowButton onClick={() => onCopy("Password", app.password)} disabled={!app.password}>Copy</RowButton>
        </div>
      </Row>
      <p className="mt-1.5 text-xs text-sub">
        Demo values shown. In production, pull credentials from a vault or secrets manager, not client-side storage.
      </p>
    </Section>
  );
}