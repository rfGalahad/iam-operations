import type { Status } from "../types";

const STYLES: Record<Status, string> = {
  Open: "bg-badge-open-bg text-badge-open-fg",
  Pending: "bg-badge-pending-bg text-badge-pending-fg",
  Execution: "bg-badge-exec-bg text-badge-exec-fg",
  Closed: "bg-badge-closed-bg text-badge-closed-fg",
  Cancelled: "bg-badge-cancel-bg text-badge-cancel-fg",
};

interface StatusBadgeProps {
  status: Status;
  label?: string;
}

export const StatusBadge = ({
  status,
  label,
}: StatusBadgeProps) => (
  <span
    className={`rounded px-1.75 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.3px] ${STYLES[status]}`}
  >
    {label ?? status}
  </span>
);