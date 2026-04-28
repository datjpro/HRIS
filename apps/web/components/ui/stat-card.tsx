import type { ReactNode } from "react";
import { Badge } from "./badge";
import { Card, CardContent } from "./card";

type StatCardProps = {
  title: string;
  value: string;
  helperText?: string;
  trendLabel?: string;
  trendVariant?: "neutral" | "info" | "success" | "warning" | "danger";
  icon?: ReactNode;
};

export function StatCard({ title, value, helperText, trendLabel, trendVariant = "neutral", icon }: StatCardProps) {
  return (
    <Card>
      <CardContent className="ui-stat-card">
        <div className="ui-stat-card__top">
          <div>
            <div className="ui-stat-card__title">{title}</div>
            <div className="ui-stat-card__value">{value}</div>
          </div>
          {icon ? <div className="ui-stat-card__icon">{icon}</div> : null}
        </div>
        <div className="ui-stat-card__bottom">
          {helperText ? <p className="ui-stat-card__helper">{helperText}</p> : <span />}
          {trendLabel ? <Badge variant={trendVariant}>{trendLabel}</Badge> : null}
        </div>
      </CardContent>
    </Card>
  );
}
