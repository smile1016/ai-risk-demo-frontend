import { CommonModule } from '@angular/common';
import { Component, effect, signal } from '@angular/core';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyCardModule } from 'ngx-tethys/card';
import { ThyListModule } from 'ngx-tethys/list';
import { ThyStatisticModule } from 'ngx-tethys/statistic';
import { interval } from 'rxjs';

interface Metric { key: string; label: string; value: number; unit: string; }

@Component({
  selector: 'app-real-time-dashboard',
  standalone: true,
  imports: [CommonModule, ThyCardModule, ThyListModule, ThyStatisticModule, ThyButtonModule],
  template: `
    <div class="page">
      <thy-card thyTitle="实时监控仪表板">
        <div thyCardContent>
          <div class="actions">
            <button thyButton="primary" (click)="toggle()">{{ running() ? '暂停' : '开始' }}刷新</button>
          </div>
          <div class="grid">
            <thy-statistic *ngFor="let m of metrics()" [thyTitle]="m.label" [thyValue]="m.value" [thySuffix]="m.unit"></thy-statistic>
          </div>
          <thy-list [thyDivided]="true" class="mt">
            <thy-list-item *ngFor="let log of logs()">{{log}}</thy-list-item>
          </thy-list>
        </div>
      </thy-card>
    </div>
  `,
  styles: [
    `
      .page { padding: 16px; }
      .actions { margin-bottom: 12px; }
      .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
      .mt { margin-top: 16px; }
    `
  ]
})
export class RealTimeDashboardComponent {
  private runningSignal = signal(true);
  running = this.runningSignal.asReadonly();

  private metricsSignal = signal<Metric[]>([
    { key: 'cpu', label: 'CPU 使用率', value: 35, unit: '%' },
    { key: 'mem', label: '内存占用', value: 62, unit: '%' },
    { key: 'latency', label: '接口延迟', value: 120, unit: 'ms' }
  ]);
  metrics = this.metricsSignal.asReadonly();

  private logsSignal = signal<string[]>(['系统初始化完成']);
  logs = this.logsSignal.asReadonly();

  constructor() {
    effect(() => {
      if (this.runningSignal()) {
        interval(3000).subscribe(() => this.tick());
      }
    });
  }

  toggle(): void {
    this.runningSignal.set(!this.runningSignal());
  }

  private tick(): void {
    const updated = this.metricsSignal().map(m => ({
      ...m,
      value: Math.max(0, Math.round(m.value + (Math.random() - 0.5) * 10))
    }));
    this.metricsSignal.set(updated);
    this.logsSignal.set([`更新于 ${new Date().toLocaleTimeString()}` , ...this.logsSignal()].slice(0, 10));
  }
}


