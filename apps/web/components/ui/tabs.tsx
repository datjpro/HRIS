"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { cn } from "../../lib/cn";

export type TabItem = {
  label: string;
  value: string;
  content: ReactNode;
};

type TabsProps = {
  items: TabItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
};

export function Tabs({ items, defaultValue, value, onValueChange }: TabsProps) {
  const fallbackValue = useMemo(() => defaultValue ?? items[0]?.value ?? "", [defaultValue, items]);
  const [internalValue, setInternalValue] = useState(fallbackValue);
  const activeValue = value ?? internalValue;
  const activeItem = items.find((item) => item.value === activeValue) ?? items[0];

  const setValue = (nextValue: string) => {
    if (value === undefined) {
      setInternalValue(nextValue);
    }

    onValueChange?.(nextValue);
  };

  return (
    <div className="ui-tabs">
      <div className="ui-tabs__list" role="tablist">
        {items.map((item) => (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={activeItem?.value === item.value}
            className={cn("ui-tabs__trigger", activeItem?.value === item.value && "ui-tabs__trigger--active")}
            onClick={() => setValue(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="ui-tabs__content">{activeItem?.content}</div>
    </div>
  );
}
