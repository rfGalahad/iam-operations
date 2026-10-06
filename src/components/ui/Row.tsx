import type { ReactNode } from "react";

export function Row({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-line py-2.5 text-[13px]">
      {children}
    </div>
  );
}