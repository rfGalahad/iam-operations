import type { ReactNode } from "react";
export const Box = ({ title, children }: { title: string; children: ReactNode }) => (
  <div className="mb-3 rounded-lg border border-line bg-panel2 px-3 py-2.5">
    <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.5px] text-sub">{title}</h3>
    {children}
  </div>
);