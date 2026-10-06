import type { ReactNode } from "react";


export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-5.5">
      <h3 className="mb-2.5 text-xs font-semibold uppercase tracking-[0.5px] text-sub">{title}</h3>
      {children}
    </section>
  );
}