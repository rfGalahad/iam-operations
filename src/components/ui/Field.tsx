import type { ReactNode } from "react";

export const Field = ({ label, children }: { label: string; children: ReactNode }) => (
  <label className="block">
    <span className="mb-0.75 block text-xs text-sub">{label}</span>
    {children}
  </label>
);