import type { ButtonHTMLAttributes } from "react";
import { focus } from "./styles";

export const Chip = ({ active, className = "", ...p }: ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) => (
  <button
    type="button"
    aria-pressed={active}
    className={`cursor-pointer rounded-full border px-2.5 py-1.25 text-[11.5px] ${focus} ${
      active ? "border-accent bg-accent font-semibold text-on-accent" : "border-line bg-transparent text-sub"
    } ${className}`}
    {...p}
  />
);