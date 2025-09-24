import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ThyBadgeModule } from 'ngx-tethys/badge';
import { ThyCardModule } from 'ngx-tethys/card';
import { ThyListModule } from 'ngx-tethys/list';
import { ThyProgressModule } from 'ngx-tethys/progress';

interface HealthItem { name: string; score: number; status: 'excellent'|'good'|'warning'|'danger'; }

@Component({
  selector: 'app-project-health-monitor',
  standalone: true,
  imports: [CommonModule, ThyCardModule, ThyProgressModule, ThyBadgeModule, ThyListModule],
  template: `
    <div class="page">
      <thy-card thyTitle="项目健康监控">
        <div thyCardContent>
          <div class="grid">
            <div class="metric" *ngFor="let m of health()">
              <div class="row">
                <span>{{m.name}}</span>
                <thy-badge [thyType]="map(m.status)">{{m.status}}</thy-badge>
              </div>
              <thy-progress [thyValue]="m.score"></thy-progress>
            </div>
          </div>
          <thy-card class="mt" thyTitle="健康警报">
            <div thyCardContent>
              <thy-list [thyDivided]="true">
                <thy-list-item *ngFor="let a of alerts()">{{a}}</thy-list-item>
              </thy-list>
            </div>
          </thy-card>
        </div>
      </thy-card>
    </div>
  `,
  styles: [
    `
      .page { padding: 16px; }
      .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
      .row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
      .mt { margin-top: 16px; }
    `
  ]
})
export class ProjectHealthMonitorComponent {
  private healthSignal = signal<HealthItem[]>([
    { name: '需求进度', score: 80, status: 'good' },
    { name: '质量指标', score: 65, status: 'warning' },
    { name: '里程碑完成', score: 92, status: 'excellent' },
    { name: '风险暴露', score: 40, status: 'danger' }
  ]);
  health = this.healthSignal.asReadonly();

  private alertsSignal = signal<string[]>([
    '质量波动：缺陷增长 8%',
    '风险提示：关键人力紧缺'
  ]);
  alerts = this.alertsSignal.asReadonly();

  map(status: HealthItem['status']): string {
    switch (status) {
      case 'excellent': return 'success';
      case 'good': return 'primary';
      case 'warning': return 'warning';
      default: return 'danger';
    }
  }
}


