import type { ReactNode, TextareaHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  description?: string;
  error?: string;
  suffix?: ReactNode;
};

export function Textarea({
  label,
  description,
  error,
  className,
  suffix,
  id,
  ...props
}: TextareaProps) {
  const inputId = id ?? props.name ?? label ?? undefined;

  return (
    <label className={cn("ui-field", className)} htmlFor={inputId}>
      {label ? <span className="ui-field__label">{label}</span> : null}
      {description ? <span className="ui-field__description">{description}</span> : null}
      <span className={cn("ui-input-wrap", error && "ui-input-wrap--error")}>
        <textarea id={inputId} className="ui-input ui-textarea" {...props} />
        {suffix ? <span className="ui-input-wrap__suffix">{suffix}</span> : null}
      </span>
      {error ? <span className="ui-field__error">{error}</span> : null}
    </label>
  );
}
