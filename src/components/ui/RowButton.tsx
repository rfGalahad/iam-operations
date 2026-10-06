import type { ButtonHTMLAttributes } from "react";

export const RowButton = ({ 
  className = "", 
  ...props 
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      type="button"
      className={`shrink-0 cursor-pointer rounded-[5px] border border-line bg-transparent px-2.25 py-0.75 text-[11px] text-sub hover:text-text ${focus} ${className}`}
      {...props}
    />
  );
}