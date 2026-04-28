import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "../ui";

type QuickLink = {
  href: string;
  label: string;
};

type ModulePlaceholderProps = {
  eyebrow: string;
  title: string;
  description: string;
  stats: Array<{
    title: string;
    value: string;
    helperText: string;
    trendLabel?: string;
    trendVariant?: "neutral" | "info" | "success" | "warning" | "danger";
  }>;
  bullets: string[];
  quickLinks?: QuickLink[];
  emptyTitle: string;
  emptyDescription: string;
  reviewLabel?: string;
  actions?: ReactNode;
};

export function ModulePlaceholder({
  eyebrow,
  title,
  description,
  stats,
  bullets,
  quickLinks = [],
  emptyTitle,
  emptyDescription,
  reviewLabel = "Foundation review",
  actions
}: ModulePlaceholderProps) {
  return (
    <div className="fodel-page">
      <div className="fodel-page__header">
        <div>
          <h1 className="fodel-page__title">{title}</h1>
          <p className="fodel-page__description">{description}</p>
        </div>
        <div className="fodel-page__header-actions">
          {actions ?? (
            <>
              <button className="fodel-secondary-button" type="button">
                <span className="material-symbols-outlined">download</span>
                Export Report
              </button>
              <button className="fodel-primary-button" type="button">
                <span className="material-symbols-outlined">person_add</span>
                Primary Action
              </button>
            </>
          )}
        </div>
      </div>

      <div className="fodel-kpi-grid">
        {stats.map((stat) => (
          <div key={stat.title} className="fodel-kpi-card">
            <div className="fodel-kpi-card__top">
              <span className="fodel-kpi-card__label">{stat.title}</span>
              <div className="fodel-kpi-card__icon">
                <span className="material-symbols-outlined">monitoring</span>
              </div>
            </div>
            <div>
              <div className="fodel-kpi-card__value">{stat.value}</div>
              <div className="fodel-kpi-card__meta">
                {stat.trendLabel ? <span className="fodel-kpi-card__trend">{stat.trendLabel}</span> : null}
                <span>{stat.helperText}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="fodel-bento-grid">
        <div className="fodel-main-widget fodel-main-widget--wide">
          <div className="fodel-widget__header">
            <div>
              <h3 className="fodel-widget__title">{eyebrow} Workspace</h3>
              <p className="fodel-widget__copy">{reviewLabel}. This module now uses the shared dashboard composition from `docs/UI/code.html`.</p>
            </div>
            <button className="fodel-widget__link" type="button">View All</button>
          </div>
          <div className="fodel-list-shell">
            <ul className="ui-bullet-list">
                {bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
          </div>
        </div>

        <div className="fodel-main-widget">
          <div className="fodel-widget__header">
            <div>
              <h3 className="fodel-widget__title">Recent Onboarding</h3>
              <p className="fodel-widget__copy">Preview table pattern for operational workflows.</p>
            </div>
            <button className="fodel-widget__link" type="button">View All</button>
          </div>
          <div className="fodel-table-shell">
            <div className="fodel-table-shell__head">
              <div className="fodel-table-shell__span-2">Employee</div>
              <div>Role</div>
              <div className="fodel-table-shell__right">Status</div>
            </div>
            {[
              ["Jane Doe", "jane.doe@company.com", "Senior Engineer", "In Progress (60%)"],
              ["Alex Smith", "alex.smith@company.com", "Product Manager", "Completed"],
              [title, emptyDescription, "Workspace module", emptyTitle]
            ].map((row) => (
              <div key={row[0]} className="fodel-table-shell__row">
                <div className="fodel-table-shell__span-2">
                  <div className="fodel-table-shell__avatar">{row[0].slice(0, 2).toUpperCase()}</div>
                  <div>
                    <div className="fodel-table-shell__name">{row[0]}</div>
                    <div className="fodel-table-shell__subcopy">{row[1]}</div>
                  </div>
                </div>
                <div className="fodel-table-shell__subcopy">{row[2]}</div>
                <div className="fodel-table-shell__right">
                  <span className="fodel-table-shell__badge">{row[3]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="fodel-side-widget">
          <h3 className="fodel-widget__title">Quick Links</h3>
          <div className="fodel-side-widget__links">
            {quickLinks.map((link) => (
              <Link key={link.href} href={link.href} className="fodel-side-widget__link">
                <div className="fodel-side-widget__link-left">
                  <span className="material-symbols-outlined fodel-side-widget__link-icon">arrow_outward</span>
                  <span>{link.label}</span>
                </div>
                <span className="material-symbols-outlined fodel-side-widget__link-arrow">arrow_forward</span>
              </Link>
            ))}
            <div className="fodel-promo-card">
              <div className="fodel-promo-card__orb fodel-promo-card__orb--top" />
              <div className="fodel-promo-card__orb fodel-promo-card__orb--bottom" />
              <div className="fodel-promo-card__content">
                <span className="material-symbols-outlined fodel-promo-card__icon">new_releases</span>
                <h4>{emptyTitle}</h4>
                <p>{emptyDescription}</p>
                <Button variant="ghost" size="sm">Learn More</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
