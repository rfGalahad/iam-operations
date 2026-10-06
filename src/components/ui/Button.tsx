import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "ghost" | "danger";
type Size = "md" | "sm";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const BASE =
  "cursor-pointer rounded-md border text-[13px] font-semibold " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent " +
  "disabled:cursor-not-allowed";

const VARIANTS: Record<Variant, string> = {
  primary:
    "border-accent bg-accent text-on-accent hover:border-accent2 hover:bg-accent2 " +
    "disabled:border-disabled disabled:bg-disabled disabled:text-sub",
  ghost: "border-line bg-transparent text-text",
  danger: "border-danger-line bg-transparent text-danger",
};

const SIZES: Record<Size, string> = {
  md: "px-4 py-2.25", // 9px 16px
  sm: "px-3 py-1.5",  // 6px 12px
};

export const Button = ({
  variant = "ghost",
  size = "md",
  type = "button",
  className = "",
  ...props
}: ButtonProps) => (
  <button
    type={type}
    className={`${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
    {...props}
  />
);

export const PrimaryButton = (props: Omit<ButtonProps, "variant">) => (
  <Button variant="primary" {...props} />
);