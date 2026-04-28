import Link from "next/link";

type Metric = {
  icon: string;
  value: string;
  label: string;
  detail: string;
  accentClass: "codeui-metric__icon--blue" | "codeui-metric__icon--green" | "codeui-metric__icon--amber";
};

type TableColumn = {
  key: string;
  label: string;
  align?: "left" | "right";
};

type TableRow = {
  id: string;
  avatar?: string;
  avatarClass?: "codeui-table__avatar--blue" | "codeui-table__avatar--neutral" | "codeui-table__avatar--danger";
  primary: string;
  secondary: string;
  values: string[];
  status?: string;
  statusClass?: "codeui-status--info" | "codeui-status--success" | "codeui-status--warning";
};

type QuickLink = {
  href: string;
  icon: string;
  label: string;
};

export type DashboardDetailPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryActionLabel: string;
  secondaryActionLabel: string;
  metrics: Metric[];
  tableTitle: string;
  tableSubtitle: string;
  columns: TableColumn[];
  rows: TableRow[];
  quickLinks: QuickLink[];
  promoTitle: string;
  promoDescription: string;
};

export function DashboardDetailPage({
  eyebrow,
  title,
  description,
  primaryActionLabel,
  secondaryActionLabel,
  metrics,
  tableTitle,
  tableSubtitle,
  columns,
  rows,
  quickLinks,
  promoTitle,
  promoDescription
}: DashboardDetailPageProps) {
  return (
    <section className="codeui-dashboard codeui-dashboard--detail">
      <div className="codeui-dashboard__header">
        <div>
          <div className="codeui-dashboard__eyebrow">{eyebrow}</div>
          <h1 className="codeui-dashboard__title">{title}</h1>
          <p className="codeui-dashboard__summary">{description}</p>
        </div>

        <div className="codeui-dashboard__header-actions">
          <button className="codeui-button codeui-button--secondary" type="button">
            <span className="material-symbols-outlined">download</span>
            <span>{secondaryActionLabel}</span>
          </button>
          <button className="codeui-button codeui-button--primary" type="button">
            <span className="material-symbols-outlined">add_task</span>
            <span>{primaryActionLabel}</span>
          </button>
        </div>
      </div>

      <div className="codeui-metrics">
        {metrics.map((metric) => (
          <article key={metric.label} className="codeui-metric">
            <div className={`codeui-metric__icon ${metric.accentClass}`}>
              <span className="material-symbols-outlined">{metric.icon}</span>
            </div>
            <div className="codeui-metric__body">
              <div className="codeui-metric__value">{metric.value}</div>
              <div className="codeui-metric__label">{metric.label}</div>
              <div className="codeui-metric__detail">{metric.detail}</div>
            </div>
          </article>
        ))}
      </div>

      <div className="codeui-dashboard__grid">
        <section className="codeui-card codeui-card--table">
          <div className="codeui-card__header">
            <div>
              <h3 className="codeui-card__title">{tableTitle}</h3>
              <p className="codeui-card__subtitle">{tableSubtitle}</p>
            </div>
            <button className="codeui-card__link" type="button">
              View All
            </button>
          </div>

          <div className="codeui-table">
            <div className="codeui-table__head codeui-table__head--dynamic">
              {columns.map((column, index) => (
                <div
                  key={column.key}
                  className={index === 0 ? "codeui-table__employee" : column.align === "right" ? "codeui-table__status-head" : undefined}
                >
                  {column.label}
                </div>
              ))}
            </div>

            {rows.map((row) => (
              <div key={row.id} className="codeui-table__row codeui-table__row--dynamic">
                <div className="codeui-table__employee">
                  <div className={`codeui-table__avatar ${row.avatarClass ?? "codeui-table__avatar--blue"}`}>{row.avatar ?? row.primary.slice(0, 2).toUpperCase()}</div>
                  <div>
                    <div className="codeui-table__name">{row.primary}</div>
                    <div className="codeui-table__email">{row.secondary}</div>
                  </div>
                </div>

                {row.values.map((value, index) => (
                  <div key={`${row.id}-${columns[index + 1]?.key ?? index}`} className={index === row.values.length - 1 && row.status ? "codeui-table__status" : "codeui-table__role"}>
                    {index === row.values.length - 1 && row.status ? (
                      <span className={`codeui-status ${row.statusClass ?? "codeui-status--info"}`}>{row.status}</span>
                    ) : (
                      value
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        <aside className="codeui-card codeui-card--links">
          <h3 className="codeui-card__title codeui-card__title--tight">Quick Links</h3>

          <div className="codeui-quick-links">
            {quickLinks.map((item) => (
              <Link key={item.href} href={item.href} className="codeui-quick-link">
                <div className="codeui-quick-link__left">
                  <span className="material-symbols-outlined">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                <span className="material-symbols-outlined codeui-quick-link__arrow">arrow_forward</span>
              </Link>
            ))}

            <div className="codeui-promo">
              <div className="codeui-promo__orb codeui-promo__orb--top" />
              <div className="codeui-promo__orb codeui-promo__orb--bottom" />
              <div className="codeui-promo__content">
                <span className="material-symbols-outlined codeui-promo__icon">new_releases</span>
                <h4>{promoTitle}</h4>
                <p>{promoDescription}</p>
                <button className="codeui-promo__button" type="button">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
