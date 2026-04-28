"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

type NavigationItem = {
  href: string;
  label: string;
  icon: string;
};

const mainNavigation: NavigationItem[] = [
  { href: "/me", label: "Dashboard", icon: "dashboard" },
  { href: "/hr/employees", label: "Employees", icon: "group" },
  { href: "/hr/compensation/salary-bands", label: "Payroll", icon: "payments" },
  { href: "/me/onboarding", label: "Time & Attendance", icon: "schedule" },
  { href: "/me/kpi", label: "Performance", icon: "trending_up" },
  { href: "/hr/onboarding", label: "Benefits", icon: "medical_services" }
];

const footerNavigation: NavigationItem[] = [
  { href: "/admin", label: "Settings", icon: "settings" },
  { href: "/ui-preview", label: "Support", icon: "help_outline" }
];

type DashboardShellProps = {
  children: ReactNode;
};

export function DashboardShell({ children }: DashboardShellProps) {
  const pathname = usePathname();

  return (
    <div className="codeui-shell">
      <aside className="codeui-sidebar">
        <div className="codeui-sidebar__brand">
          <div className="codeui-sidebar__brand-mark">
            <span className="material-symbols-outlined codeui-sidebar__brand-icon">monitor_heart</span>
          </div>
          <div className="codeui-sidebar__brand-copy">
            <span className="codeui-sidebar__brand-title">PulseHR</span>
            <span className="codeui-sidebar__brand-subtitle">Enterprise Admin</span>
          </div>
        </div>

        <button className="codeui-sidebar__cta" type="button">
          <span className="material-symbols-outlined">add</span>
          <span>Quick Action</span>
        </button>

        <nav className="codeui-sidebar__nav" aria-label="Primary navigation">
          {mainNavigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn("codeui-sidebar__nav-item", isActive && "codeui-sidebar__nav-item--active")}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="codeui-sidebar__footer">
          {footerNavigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn("codeui-sidebar__nav-item", isActive && "codeui-sidebar__nav-item--active")}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </aside>

      <div className="codeui-workspace">
        <header className="codeui-topbar">
          <div className="codeui-topbar__breadcrumbs">
            <span>Pages</span>
            <span className="material-symbols-outlined">chevron_right</span>
            <span className="codeui-topbar__breadcrumbs-current">Dashboard</span>
          </div>

          <label className="codeui-topbar__search" aria-label="Search workspace">
            <span className="material-symbols-outlined">search</span>
            <input type="text" placeholder="Search employees, payroll, requests..." />
          </label>

          <div className="codeui-topbar__actions">
            <button className="codeui-topbar__icon-button" type="button" aria-label="Notifications">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="codeui-topbar__icon-button" type="button" aria-label="Messages">
              <span className="material-symbols-outlined">chat</span>
            </button>
            <button className="codeui-topbar__help" type="button">Help</button>
            <button className="codeui-topbar__avatar" type="button" aria-label="Admin profile">
              <span className="material-symbols-outlined">person</span>
            </button>
          </div>
        </header>

        <main className="codeui-content">{children}</main>
      </div>
    </div>
  );
}
