import Link from "next/link";

type DashboardHomeProps = {
  roleLabel: string;
  greetingName: string;
  summary: string;
  primaryActionLabel?: string;
};

const metrics = [
  {
    icon: "group",
    value: "1,284",
    label: "Total Employees",
    detail: "+12 from last month",
    accentClass: "codeui-metric__icon--blue"
  },
  {
    icon: "person_add",
    value: "24",
    label: "New Hires",
    detail: "This month",
    accentClass: "codeui-metric__icon--green"
  },
  {
    icon: "trending_up",
    value: "92%",
    label: "Retention Rate",
    detail: "+2.1% vs last quarter",
    accentClass: "codeui-metric__icon--amber"
  }
] as const;

const onboardingRows = [
  {
    initials: "JD",
    initialsClass: "codeui-table__avatar--blue",
    name: "Jane Doe",
    email: "jane.doe@company.com",
    role: "Senior Engineer",
    status: "In Progress (60%)",
    statusClass: "codeui-status codeui-status--info"
  },
  {
    initials: "AS",
    initialsClass: "codeui-table__avatar--neutral",
    name: "Alex Smith",
    email: "alex.smith@company.com",
    role: "Product Manager",
    status: "Completed",
    statusClass: "codeui-status codeui-status--success"
  },
  {
    initials: "MJ",
    initialsClass: "codeui-table__avatar--danger",
    name: "Michael Johnson",
    email: "mjohnson@company.com",
    role: "Sales Rep",
    status: "Action Required",
    statusClass: "codeui-status codeui-status--warning"
  }
] as const;

const quickLinks = [
  { href: "/hr/departments", icon: "description", label: "Company Policies" },
  { href: "/me/onboarding", icon: "date_range", label: "Holiday Calendar" },
  { href: "/hr/employees", icon: "support_agent", label: "IT Helpdesk" }
] as const;

export function DashboardHome({ roleLabel, greetingName, summary, primaryActionLabel = "Onboard Employee" }: DashboardHomeProps) {
  return (
    <section className="codeui-dashboard">
      <div className="codeui-dashboard__header">
        <div>
          <div className="codeui-dashboard__eyebrow">{roleLabel}</div>
          <h1 className="codeui-dashboard__title">Good Morning, {greetingName}</h1>
          <p className="codeui-dashboard__summary">{summary}</p>
        </div>

        <div className="codeui-dashboard__header-actions">
          <button className="codeui-button codeui-button--secondary" type="button">
            <span className="material-symbols-outlined">download</span>
            <span>Export Report</span>
          </button>
          <button className="codeui-button codeui-button--primary" type="button">
            <span className="material-symbols-outlined">person_add</span>
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
              <h3 className="codeui-card__title">Recent Onboarding</h3>
              <p className="codeui-card__subtitle">Track progress for new hires entering the organization.</p>
            </div>
            <button className="codeui-card__link" type="button">View All</button>
          </div>

          <div className="codeui-table">
            <div className="codeui-table__head">
              <div className="codeui-table__employee">Employee</div>
              <div>Role</div>
              <div className="codeui-table__status-head">Status</div>
            </div>

            {onboardingRows.map((row) => (
              <div key={row.email} className="codeui-table__row">
                <div className="codeui-table__employee">
                  <div className={`codeui-table__avatar ${row.initialsClass}`}>{row.initials}</div>
                  <div>
                    <div className="codeui-table__name">{row.name}</div>
                    <div className="codeui-table__email">{row.email}</div>
                  </div>
                </div>
                <div className="codeui-table__role">{row.role}</div>
                <div className="codeui-table__status">
                  <span className={row.statusClass}>{row.status}</span>
                </div>
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
                <h4>New Performance Module</h4>
                <p>Check out the updated review cycle tools.</p>
                <button className="codeui-promo__button" type="button">Learn More</button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
