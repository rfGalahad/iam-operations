import type { TextareaHTMLAttributes } from "react";
import { inputStyles } from "./styles";

export const TextArea = ({ className = "", ...p }: TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea className={`${inputStyles} min-h-17.5 resize-y ${className}`} {...p} />
);