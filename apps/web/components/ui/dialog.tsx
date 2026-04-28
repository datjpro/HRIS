"use client";

import type { ReactNode } from "react";
import { Button } from "./button";
import { cn } from "../../lib/cn";

type DialogProps = {
  open: boolean;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  onClose: () => void;
};

export function Dialog({ open, title, description, children, footer, onClose }: DialogProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="ui-dialog-backdrop" role="presentation" onClick={onClose}>
      <div
        className="ui-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="ui-dialog__header">
          <div>
            <h2 id="dialog-title" className="ui-dialog__title">
              {title}
            </h2>
            {description ? <p className="ui-dialog__description">{description}</p> : null}
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close dialog">
            ✕
          </Button>
        </div>
        <div className="ui-dialog__content">{children}</div>
        <div className={cn("ui-dialog__footer", !footer && "ui-dialog__footer--end")}>{footer ?? <Button onClick={onClose}>Close</Button>}</div>
      </div>
    </div>
  );
}
