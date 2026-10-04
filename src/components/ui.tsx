import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";

const focus = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-[22px]">
      <h3 className="mb-2.5 text-xs font-semibold uppercase tracking-[0.5px] text-sub">{title}</h3>
      {children}
    </section>
  );
}

export function Row({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-line py-2.5 text-[13px]">
      {children}
    </div>
  );
}

export function RowButton({ className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`shrink-0 cursor-pointer rounded-[5px] border border-line bg-transparent px-[9px] py-[3px] text-[11px] text-sub hover:text-text ${focus} ${className}`}
      {...props}
    />
  );
}

export function PrimaryButton({ className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`cursor-pointer rounded-md border border-accent bg-accent px-4 py-[9px] text-[13px] font-semibold text-on-accent disabled:cursor-not-allowed disabled:border-disabled disabled:bg-disabled disabled:text-sub ${focus} ${className}`}
      {...props}
    />
  );
}

export function GhostButton({ className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`cursor-pointer rounded-md border border-line bg-transparent px-4 py-[9px] text-[13px] font-semibold text-text ${focus} ${className}`}
      {...props}
    />
  );
}

export function TextInput({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full rounded-md border border-line bg-panel2 px-2.5 py-[7px] text-[13px] text-text placeholder:text-sub ${focus} ${className}`}
      {...props}
    />
  );
}