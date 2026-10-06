import { Button } from "@/components/ui/Button";

export type View = "Tickets" | "Applications" | "Spiels" | "Accounts Log";

export interface HeaderProps {
  view: View;
  onViewChange: (view: View) => void;
  onChangePassword: () => void;
  onLock: () => void;
  views?: View[];
}

const DEFAULT_VIEWS: View[] = ["Tickets", "Applications", "Spiels", "Accounts Log"];

export const Header = ({
  view,
  onViewChange,
  onChangePassword,
  onLock,
  views = DEFAULT_VIEWS,
}: HeaderProps) => (
  <header className="flex flex-wrap items-center gap-3 border-b border-line bg-panel px-5 py-3 text-text">
    {/* TABS */}
    <nav aria-label="Views" className="flex gap-1">
      {views.map((v) => {
        const active = v === view;
        return (
          <button
            key={v}
            type="button"
            aria-current={active ? "page" : undefined}
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
    </nav>

    {/* SECURITY */}
    <div className="ml-auto flex gap-3">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onChangePassword}
      >
        Change password
      </Button>
      <Button 
        variant="primary" 
        size="sm" 
        onClick={onLock}
      >
        Lock
      </Button>
    </div>
  </header>
);

export default Header;