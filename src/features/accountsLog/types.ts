export type LogFilter = "Not logged" | "Logged" | "All";
export interface LogRow { ticketId: string; cells: string[] }