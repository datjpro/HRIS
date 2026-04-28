import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  description?: string;
  error?: string;
  inputClassName?: string;
  suffix?: ReactNode;
};

export function Input({
  label,
  description,
  error,
  className,
  inputClassName,
  suffix,
  id,
  ...props
}: InputProps) {
  const inputId = id ?? props.name ?? label ?? undefined;

  return (
    <label className={cn("ui-field", className)} htmlFor={inputId}>
      {label ? <span className="ui-field__label">{label}</span> : null}
      {description ? <span className="ui-field__description">{description}</span> : null}
      <span className={cn("ui-input-wrap", error && "ui-input-wrap--error")}>
        <input id={inputId} className={cn("ui-input", inputClassName)} {...props} />
        {suffix ? <span className="ui-input-wrap__suffix">{suffix}</span> : null}
      </span>
      {error ? <span className="ui-field__error">{error}</span> : null}
    </label>
  );
}
