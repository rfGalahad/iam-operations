import type { ReactNode } from "react";
export const Hint = ({ children }: { children: ReactNode }) => (
  <div className="mt-1 text-xs text-sub">{children}</div>
);