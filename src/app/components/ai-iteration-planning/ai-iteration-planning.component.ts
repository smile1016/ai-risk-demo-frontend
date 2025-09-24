import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyCardModule } from 'ngx-tethys/card';
import { ThyFormModule } from 'ngx-tethys/form';
import { ThyInputModule } from 'ngx-tethys/input';
import { ThyListModule } from 'ngx-tethys/list';
import { ThySelectModule } from 'ngx-tethys/select';
import { ThyStatisticModule } from 'ngx-tethys/statistic';
import { AICapacityPredictorService } from '../../services/ai-capacity-predictor.service';
import { AISprintPlannerService, BacklogItem } from '../../services/ai-sprint-planner.service';

@Component({
  selector: 'app-ai-iteration-planning',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ThyButtonModule,
    ThyFormModule,
    ThyInputModule,
    ThySelectModule,
    ThyListModule,
    ThyCardModule,
    ThyStatisticModule
  ],
  template: `
    <div class="container">
      <thy-card thyTitle="AI 智能迭代规划" thySize="lg">
        <div thyCardContent>
          <form thyForm class="form-grid">
            <div class="form-row">
              <label class="form-label">团队人数</label>
              <input thyInput type="number" [(ngModel)]="teamMembers" name="teamMembers" />
            </div>
            <div class="form-row">
              <label class="form-label">迭代时长(天)</label>
              <input thyInput type="number" [(ngModel)]="sprintDuration" name="sprintDuration" />
            </div>
            <div class="form-row actions">
              <button thyButton="primary" (click)="onPredict()">容量预测</button>
              <button thyButton="info" (click)="onPlan()" [disabled]="predictedCapacity()===0">生成计划</button>
            </div>
          </form>

          <div class="statistics">
            <thy-statistic [thyValue]="predictedCapacity()" thyTitle="预计可完成故事点"></thy-statistic>
          </div>

          <thy-card thyTitle="待办事项" class="mt">
            <div thyCardContent>
              <div class="add-row">
                <input thyInput placeholder="标题" [(ngModel)]="draftTitle" name="draftTitle" />
                <input thyInput type="number" placeholder="点数" [(ngModel)]="draftPoints" name="draftPoints" />
                <select thySelect [(ngModel)]="draftPriority" name="draftPriority">
                  <option [ngValue]="1">P1</option>
                  <option [ngValue]="2">P2</option>
                  <option [ngValue]="3">P3</option>
                </select>
                <button thyButton="success" (click)="addBacklog()">添加</button>
              </div>

              <thy-list [thyDivided]="true">
                <thy-list-item *ngFor="let item of backlog()">
                  <div thyListItemMeta>
                    <div thyListItemMetaTitle>{{item.title}}</div>
                    <div thyListItemMetaDescription>点数: {{item.points}} | 优先级: P{{item.priority}}</div>
                  </div>
                  <button thyButton="danger" thySize="xs" (click)="remove(item.id)">删除</button>
                </thy-list-item>
              </thy-list>
            </div>
          </thy-card>

          <thy-card thyTitle="AI 建议的迭代计划" class="mt">
            <div thyCardContent>
              <thy-list [thyDivided]="true" *ngIf="plan().length; else empty">
                <thy-list-item *ngFor="let item of plan()">
                  <div thyListItemMeta>
                    <div thyListItemMetaTitle>{{item.title}}</div>
                    <div thyListItemMetaDescription>点数: {{item.points}} | 优先级: P{{item.priority}}</div>
                  </div>
                </thy-list-item>
              </thy-list>
              <ng-template #empty>
                <div class="empty">暂无计划，请先生成。</div>
              </ng-template>
            </div>
          </thy-card>
        </div>
      </thy-card>
    </div>
  `,
  styles: [
    `
    .container { padding: 16px; }
    .form-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; align-items: end; }
    .form-row.actions { display: flex; gap: 12px; }
    .statistics { margin-top: 12px; }
    .add-row { display: grid; grid-template-columns: 2fr 1fr 1fr auto; gap: 12px; align-items: center; }
    .mt { margin-top: 16px; }
    .empty { color: #999; padding: 12px; }
    `
  ]
})
export class AIIterationPlanningComponent {
  private aiCapacityPredictor = inject(AICapacityPredictorService);
  private aiSprintPlanner = inject(AISprintPlannerService);

  teamMembers = 6;
  sprintDuration = 14;

  private backlogSignal = signal<BacklogItem[]>([
    { id: '1', title: '登录鉴权重构', points: 8, priority: 1 },
    { id: '2', title: 'Dashboard 性能优化', points: 5, priority: 2 },
    { id: '3', title: '异常监控报警', points: 3, priority: 1 }
  ]);
  backlog = this.backlogSignal.asReadonly();

  private capacitySignal = signal(0);
  predictedCapacity = this.capacitySignal.asReadonly();

  private planSignal = signal<BacklogItem[]>([]);
  plan = this.planSignal.asReadonly();

  draftTitle = '';
  draftPoints = 3;
  draftPriority = 2;

  onPredict(): void {
    const historicalData = [
      { completedPoints: 22, carriedOverPoints: 3 },
      { completedPoints: 18, carriedOverPoints: 5 },
      { completedPoints: 20, carriedOverPoints: 2 }
    ];
    const capacity = this.aiCapacityPredictor.predict({
      teamMembers: this.teamMembers,
      sprintDuration: this.sprintDuration,
      historicalData
    });
    this.capacitySignal.set(capacity);
  }

  onPlan(): void {
    const plan = this.aiSprintPlanner.generatePlan(this.backlogSignal(), this.capacitySignal());
    this.planSignal.set(plan);
  }

  addBacklog(): void {
    if (!this.draftTitle.trim()) return;
    const item: BacklogItem = {
      id: Math.random().toString(36).slice(2),
      title: this.draftTitle.trim(),
      points: Number(this.draftPoints) || 1,
      priority: Number(this.draftPriority) || 3
    };
    this.backlogSignal.set([item, ...this.backlogSignal()]);
    this.draftTitle = '';
    this.draftPoints = 3;
    this.draftPriority = 2;
  }

  remove(id: string): void {
    this.backlogSignal.set(this.backlogSignal().filter(i => i.id !== id));
  }
}


