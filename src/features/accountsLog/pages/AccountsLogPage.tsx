import { useState } from "react";
import { Button, Chip, Hint } from "@/components/ui/index";
import { downloadCsv } from "@/lib/csv";
import { today } from "@/lib/id";
import type { Ticket } from "@/features/tickets/types";
import { LOG_FILTERS, LOG_HEADERS } from "../constants";
import type { LogFilter } from "../types";
import { buildLogRows, rowsToClipboardText } from "../utils";

interface AccountsLogPageProps {
  tickets: Ticket[];
  applicationNameOf: (applicationId: string) => string;
  onOpenTicket: (ticketId: string) => void;
  onMarkLogged: (ticketIds: string[]) => void;
  onCopy: (text: string, message: string) => void;
}

const headerCell = "whitespace-nowrap px-2.5 py-2 text-left text-[11px] font-semibold uppercase tracking-[0.4px] text-sub";

export const AccountsLogPage = ({
  tickets,
  applicationNameOf,
  onOpenTicket,
  onMarkLogged,
  onCopy,
}: AccountsLogPageProps) => {
  const [logFilter, setLogFilter] = useState<LogFilter>("Not logged");
  const rows = buildLogRows(tickets, applicationNameOf, logFilter);
  const ticketIds = [...new Set(rows.map(row => row.ticketId))];

  const copyRows = () => onCopy(rowsToClipboardText(rows), "Rows copied. Paste into Excel");
  const downloadRows = () =>
    downloadCsv(`accounts-log-${today()}.csv`, [LOG_HEADERS, ...rows.map(row => row.cells)]);
  const markLogged = () => {
    if (!confirm("Mark these tickets as logged? They will move to the Logged list.")) return;
    onMarkLogged(ticketIds);
  };

  return (
    <main className="mx-auto max-w-7xl px-5 py-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <b>Accounts log</b>
          <Hint>
            One row per account for closed and cancelled tickets: {rows.length} rows from {ticketIds.length}{" "}
            tickets. Copy rows has no header, so you can paste straight under your Excel log.
          </Hint>
        </div>
        <span className="flex gap-2">
          <Button size="sm" onClick={copyRows} disabled={!rows.length}>Copy rows</Button>
          <Button size="sm" onClick={downloadRows} disabled={!rows.length}>Download CSV</Button>
          {logFilter === "Not logged" && (
            <Button size="sm" variant="primary" onClick={markLogged} disabled={!rows.length}>
              Mark as logged
            </Button>
          )}
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5 pb-2.5">
        {LOG_FILTERS.map(option => (
          <Chip key={option} active={option === logFilter} onClick={() => setLogFilter(option)}>
            {option}
          </Chip>
        ))}
      </div>

      <div className="overflow-x-auto rounded-[10px] border border-line bg-panel">
        <table className="w-full border-collapse">
          <thead>
            <tr>{LOG_HEADERS.map(header => <th key={header} className={headerCell}>{header}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={index}
                tabIndex={0}
                onClick={() => onOpenTicket(row.ticketId)}
                onKeyDown={event => event.key === "Enter" && onOpenTicket(row.ticketId)}
                className="cursor-pointer border-t border-line hover:bg-panel2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
              >
                {row.cells.map((cell, cellIndex) => <td key={cellIndex} className="px-2.5 py-2">{cell}</td>)}
              </tr>
            ))}
            {!rows.length && (
              <tr>
                <td colSpan={LOG_HEADERS.length} className="p-7 text-center text-sub">
                  Nothing to log. Closed and cancelled tickets appear here.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default AccountsLogPage;