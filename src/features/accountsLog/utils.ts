import type { Ticket } from "@/features/tickets/types";
import { isActive } from "@/features/tickets/utils";
import type { LogFilter, LogRow } from "./types";

export function buildLogRows(
  tickets: Ticket[],
  applicationNameOf: (applicationId: string) => string,
  logFilter: LogFilter,
): LogRow[] {
  return tickets
    .filter(ticket => {
      if (isActive(ticket)) return false;
      if (logFilter === "All") return true;
      return logFilter === "Not logged" ? !ticket.logged : Boolean(ticket.logged);
    })
    .sort((first, second) => (second.closed ?? "").localeCompare(first.closed ?? ""))
    .flatMap(ticket => {
      const ticketCells = [ticket.no, ticket.sc, applicationNameOf(ticket.appId), ticket.cat, ticket.sub];
      const accounts = ticket.accts.length ? ticket.accts : [null];
      return accounts.map(account => ({
        ticketId: ticket.id,
        cells: [
          ...ticketCells,
          account?.userId ?? "",
          account?.name ?? "",
          account?.roles ?? "",
          account ? (account.isService ? "Yes" : "No") : "",
          ticket.status,
        ],
      }));
    });
}

// No header row, so it pastes straight under an existing Excel log.
export const rowsToClipboardText = (rows: LogRow[]) =>
  rows
    .map(row => row.cells.map(cell => cell.replace(/[\t\r\n]+/g, " ")).join("\t"))
    .join("\n");