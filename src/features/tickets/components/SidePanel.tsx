import { useState, type ReactNode } from "react";
import { Box, Button, Hint, RowButton } from "@/components/ui/index";
import type { Application, Spiel, Ticket } from "../types";

function ValueRow({ text, onCopy, children }: { text: string; onCopy: () => void; children?: ReactNode }) {
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

function Credential({ c, onCopy }: { c: Application["creds"][number]; onCopy: (t: string, msg: string) => void }) {
  const [show, setShow] = useState(false);
  return (
    <div className="border-b border-line py-1.5 last:border-b-0">
      <b>{c.l}</b>
      {c.u && <ValueRow text={c.u} onCopy={() => onCopy(c.u, "Username copied")} />}
      {c.r && (
        <ValueRow text={show ? c.r : "••••••••"} onCopy={() => onCopy(c.r, "Password copied")}>
          <RowButton onClick={() => setShow(s => !s)}>{show ? "Hide" : "Show"}</RowButton>
        </ValueRow>
      )}
    </div>
  );
}

interface Props {
  app?: Application;
  ticket: Ticket;
  spiels: Spiel[];
  onCopy: (text: string, msg: string) => void;
  onUseSpiel: (id: string) => void;
}

export function SidePanel({ app, ticket, spiels, onCopy, onUseSpiel }: Props) {
  const fits = spiels
    .filter(s => !s.appId || s.appId === ticket.appId)
    .sort((a, b) => Number(b.when === ticket.status) - Number(a.when === ticket.status));

  return (
    <div>
      <Box title="Credentials">
        {app?.creds.length ? app.creds.map((c, i) => <Credential key={i} c={c} onCopy={onCopy} />)
          : <Hint>None listed. Add them under Applications.</Hint>}
      </Box>

      <Box title="Spiels">
        {fits.length ? fits.map(s => (
          <Button
            key={s.id}
            size="sm"
            variant={s.when === ticket.status ? "primary" : "ghost"}
            className="mb-1.5 mr-1.5 text-left"
            onClick={() => onUseSpiel(s.id)}
          >
            {s.name}
          </Button>
        )) : <Hint>No spiels yet. Add them in the Spiels tab.</Hint>}
        <Hint>Highlighted spiels fit the current status.</Hint>
      </Box>

      <Box title="Process">
        {app?.process ? <div className="whitespace-pre-wrap">{app.process}</div> : <Hint>No process documented.</Hint>}
      </Box>

      <Box title="Support contacts">
        {app?.contacts.length ? app.contacts.map((c, i) => (
          <div key={i} className="border-b border-line py-1.5 last:border-b-0">
            <b>{c.n}</b>
            <small className="block text-sub">{c.r}</small>
            {c.c}
          </div>
        )) : <Hint>None listed.</Hint>}
      </Box>
    </div>
  );
}