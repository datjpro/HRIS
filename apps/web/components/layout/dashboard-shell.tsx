"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Badge, Button } from "../ui";

type NavigationItem = {
  href: string;
  label: string;
  description: string;
  children?: Array<{ href: string; label: string }>;
};

const navigationItems: NavigationItem[] = [
  {
    href: "/me",
    label: "My Space",
    description: "Self-service",
    children: [
      { href: "/me/profile", label: "Profile" },
      { href: "/me/payslips", label: "Payslips" },
      { href: "/me/kpi", label: "KPI" },
      { href: "/me/idp", label: "IDP" },
      { href: "/me/onboarding", label: "Onboarding" }
    ]
  },
  {
    href: "/manager",
    label: "Manager",
    description: "Team ops",
    children: [
      { href: "/manager/team", label: "Team" },
      { href: "/manager/recruitment-requests", label: "Requests" },
      { href: "/manager/interviews", label: "Interviews" }
    ]
  },
  {
    href: "/hr",
    label: "HR",
    description: "People ops",
    children: [
      { href: "/hr/departments", label: "Departments" },
      { href: "/hr/employees", label: "Employees" },
      { href: "/hr/recruitment/requests", label: "Recruitment" },
      { href: "/hr/onboarding", label: "Onboarding" },
      { href: "/hr/compensation/salary-bands", label: "Compensation" },
      { href: "/hr/analytics", label: "Analytics" }
    ]
  },
  {
    href: "/admin",
    label: "Admin",
    description: "Platform",
    children: [{ href: "/admin/users", label: "Users" }]
  }
];

type DashboardShellProps = {
  children: ReactNode;
};

export function DashboardShell({ children }: DashboardShellProps) {
  const pathname = usePathname();

  return (
    <div className="dashboard-shell">
      <aside className="dashboard-shell__sidebar">
        <div className="dashboard-shell__brand">
          <div className="dashboard-shell__brand-mark">HR</div>
          <div>
            <div className="dashboard-shell__brand-title">HRIS Workspace</div>
            <div className="dashboard-shell__brand-copy">Modern enterprise operations</div>
          </div>
        </div>

        <nav className="dashboard-shell__nav" aria-label="Dashboard navigation">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className={cn("dashboard-shell__nav-item", isActive && "dashboard-shell__nav-item--active")}
                >
                  <div>
                    <div className="dashboard-shell__nav-label">{item.label}</div>
                    <div className="dashboard-shell__nav-description">{item.description}</div>
                  </div>
                  {isActive ? <Badge variant="info">Active</Badge> : null}
                </Link>

                {item.children?.length ? (
                  <div className="dashboard-shell__subnav">
                    {item.children.map((child) => {
                      const isChildActive = pathname === child.href || pathname.startsWith(`${child.href}/`);

                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn("dashboard-shell__subnav-item", isChildActive && "dashboard-shell__subnav-item--active")}
                        >
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>

        <div className="dashboard-shell__promo surface-card">
          <div className="dashboard-shell__promo-title">Foundation phase</div>
          <p className="dashboard-shell__promo-copy">Shared shell and component primitives are ready for the next business pages.</p>
          <Link href="/ui-preview" className="dashboard-shell__promo-link">
            <Button variant="secondary">Review UI</Button>
          </Link>
        </div>
      </aside>

      <div className="dashboard-shell__content-wrap">
        <header className="dashboard-shell__topbar">
          <div>
            <div className="dashboard-shell__eyebrow">Enterprise Precision</div>
            <div className="dashboard-shell__topbar-title">Dashboard shell</div>
          </div>

          <div className="dashboard-shell__topbar-actions">
            <Button variant="ghost" size="sm">
              Search
            </Button>
            <Button variant="secondary" size="sm">
              Quick action
            </Button>
          </div>
        </header>

        <main className="dashboard-shell__main">
          <div className="container dashboard-shell__container">{children}</div>
        </main>
      </div>
    </div>
  );
}
