import type { ReactNode, SelectHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  description?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
  suffix?: ReactNode;
};

export function Select({
  label,
  description,
  error,
  className,
  options,
  placeholder,
  suffix,
  id,
  ...props
}: SelectProps) {
  const inputId = id ?? props.name ?? label ?? undefined;

  return (
    <label className={cn("ui-field", className)} htmlFor={inputId}>
      {label ? <span className="ui-field__label">{label}</span> : null}
      {description ? <span className="ui-field__description">{description}</span> : null}
      <span className={cn("ui-input-wrap", error && "ui-input-wrap--error")}>
        <select id={inputId} className="ui-input ui-select" {...props}>
          {placeholder ? <option value="">{placeholder}</option> : null}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {suffix ? <span className="ui-input-wrap__suffix">{suffix}</span> : null}
      </span>
      {error ? <span className="ui-field__error">{error}</span> : null}
    </label>
  );
}
