import type { SelectHTMLAttributes } from "react";
import { inputStyles } from "./styles";

export const Select = ({ className = "", ...p }: SelectHTMLAttributes<HTMLSelectElement>) => (
  <select className={`${inputStyles} ${className}`} {...p} />
);