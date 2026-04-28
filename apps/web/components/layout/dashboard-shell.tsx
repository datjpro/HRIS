"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Button } from "../ui";

type NavigationItem = {
  href: string;
  label: string;
  icon: string;
};

const navigationItems: NavigationItem[] = [
  {
    href: "/me",
    label: "My Space",
    icon: "dashboard"
  },
  {
    href: "/manager",
    label: "Manager",
    icon: "group"
  },
  {
    href: "/hr",
    label: "HR",
    icon: "payments"
  },
  {
    href: "/admin",
    label: "Admin",
    icon: "trending_up"
  }
];

type DashboardShellProps = {
  children: ReactNode;
};

export function DashboardShell({ children }: DashboardShellProps) {
  const pathname = usePathname();

  return (
    <div className="fodel-shell">
      <aside className="fodel-sidebar">
        <div className="fodel-sidebar__brand">
          <div className="fodel-sidebar__brand-mark">P</div>
          <div>
            <div className="fodel-sidebar__brand-title">PulseHR</div>
            <div className="fodel-sidebar__brand-copy">People Operations Platform</div>
          </div>
        </div>

        <nav className="fodel-sidebar__nav" aria-label="Dashboard navigation">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className={cn("fodel-sidebar__nav-item", isActive && "fodel-sidebar__nav-item--active")}
                >
                  <span className="material-symbols-outlined fodel-icon">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>

              </div>
            );
          })}
        </nav>

        <div className="fodel-sidebar__footer">
          <Link href="/ui-preview" className="fodel-sidebar__footer-link">
            <Button variant="secondary" size="sm">Review UI</Button>
          </Link>
        </div>
      </aside>

      <div className="fodel-main">
        <header className="fodel-topbar">
          <div className="fodel-topbar__breadcrumbs">
            <span>PulseHR</span>
            <span className="material-symbols-outlined fodel-topbar__crumb-icon">chevron_right</span>
            <span className="fodel-topbar__crumb-current">Dashboard</span>
          </div>

          <div className="fodel-topbar__search">
            <span className="material-symbols-outlined fodel-topbar__search-icon">search</span>
            <input type="text" placeholder="Search employees, documents, settings... (Cmd+K)" />
          </div>

          <div className="fodel-topbar__actions">
            <button className="fodel-icon-button" type="button">
              <span className="material-symbols-outlined">notifications</span>
              <span className="fodel-icon-button__dot" />
            </button>
            <button className="fodel-icon-button" type="button">
              <span className="material-symbols-outlined">chat_bubble_outline</span>
            </button>
            <button className="fodel-topbar__help" type="button">Help</button>
            <button className="fodel-topbar__avatar" type="button">AD</button>
          </div>
        </header>

        <main className="fodel-content">
          <div className="fodel-content__container">{children}</div>
        </main>
      </div>
    </div>
  );
}
