import type { HTMLAttributes, ReactNode, TableHTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

type TableContainerProps = HTMLAttributes<HTMLDivElement> & {
  isEmpty?: boolean;
  emptyState?: ReactNode;
};

export function TableContainer({ className, isEmpty, emptyState, children, ...props }: TableContainerProps) {
  if (isEmpty) {
    return <div className={cn("ui-table-container", className)} {...props}>{emptyState}</div>;
  }

  return <div className={cn("ui-table-container", className)} {...props}>{children}</div>;
}

export function Table({ className, ...props }: TableHTMLAttributes<HTMLTableElement>) {
  return <table className={cn("ui-table", className)} {...props} />;
}

export function TableHead({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={cn("ui-table__head", className)} {...props} />;
}

export function TableBody({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={cn("ui-table__body", className)} {...props} />;
}

export function TableRow({ className, ...props }: HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={cn("ui-table__row", className)} {...props} />;
}

export function TableHeaderCell({ className, ...props }: ThHTMLAttributes<HTMLTableCellElement>) {
  return <th className={cn("ui-table__header-cell", className)} {...props} />;
}

export function TableCell({ className, ...props }: TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={cn("ui-table__cell", className)} {...props} />;
}
