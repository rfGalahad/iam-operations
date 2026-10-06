import type { InputHTMLAttributes } from "react";

export function TextInput({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full rounded-md border border-line bg-panel2 px-2.5 py-1.75 text-[13px] text-text placeholder:text-sub ${focus} ${className}`}
      {...props}
    />
  );
}