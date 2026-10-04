export type View = "Tickets" | "Applications";

export interface TicketCounts {
  Open: number;
  Pending: number;
  Execution: number;
}

export interface HeaderProps {
  title?: string;
  view: View;
  onViewChange: (view: View) => void;
  counts: TicketCounts;
  views?: View[];
}

const DEFAULT_VIEWS: View[] = ["Tickets", "Applications"];
const STAT_KEYS: (keyof TicketCounts)[] = ["Open", "Pending", "Execution"];

export const Header = ({
  title = "IAM Ticket Ops",
  view,
  onViewChange,
  counts,
  views = DEFAULT_VIEWS,
}: HeaderProps) => {
  return (
    <header className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-panel px-5 py-3.5 text-text">
      <h1 className="m-0 text-[17px] font-semibold tracking-[0.2px]">{title}</h1>

      <div role="tablist" aria-label="Views" className="flex gap-1">
        {views.map((v) => {
          const active = v === view;
          return (
            <button
              key={v}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onViewChange(v)}
              className={[
                "cursor-pointer rounded-md border px-3.5 py-1.75 text-[13px] font-semibold",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                active
                  ? "border-line bg-panel2 text-text"
                  : "border-transparent bg-transparent text-sub hover:text-text",
              ].join(" ")}
            >
              {v}
            </button>
          );
        })}
      </div>

      <div className="flex gap-4 text-[12.5px] text-sub">
        {STAT_KEYS.map((key) => (
          <span key={key}>
            <b className="font-semibold text-text">{counts[key]}</b> {key}
          </span>
        ))}
      </div>
    </header>
  );
};

export default Header;