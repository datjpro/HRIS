import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

type BadgeVariant = "neutral" | "info" | "success" | "warning" | "danger";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

export function Badge({ className, variant = "neutral", ...props }: BadgeProps) {
  return <span className={cn("ui-badge", `ui-badge--${variant}`, className)} {...props} />;
}
