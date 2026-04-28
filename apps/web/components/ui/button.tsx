import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";
type ButtonSize = "md" | "sm";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  leadingIcon,
  trailingIcon,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "ui-button",
        `ui-button--${variant}`,
        `ui-button--${size}`,
        className
      )}
      {...props}
    >
      {leadingIcon ? <span className="ui-button__icon">{leadingIcon}</span> : null}
      <span>{children}</span>
      {trailingIcon ? <span className="ui-button__icon">{trailingIcon}</span> : null}
    </button>
  );
}
