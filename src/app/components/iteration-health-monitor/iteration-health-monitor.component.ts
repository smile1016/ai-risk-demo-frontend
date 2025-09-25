import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ThyIconModule } from 'ngx-tethys/icon';
import { ThySelectModule } from 'ngx-tethys/select';
import { ThyTabsModule } from 'ngx-tethys/tabs';
import { ChartData, IterationMetrics, RiskItem } from '../../models/iteration-health.model';
import { IterationHealthService } from '../../services/iteration-health.service';

@Component({
  selector: 'app-iteration-health-monitor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ThySelectModule,
    ThyButtonModule,
    ThyIconModule,
    ThyTabsModule
  ],
  templateUrl: './iteration-health-monitor.component.html',
  styleUrls: ['./iteration-health-monitor.component.scss']
})
export class IterationHealthMonitorComponent implements OnInit {
  // 应用选择
  selectedApp = 'java-delivery-service';
  appOptions = [
    { label: 'java-delivery-service', value: 'java-delivery-service' },
    { label: 'frontend-web-app', value: 'frontend-web-app' },
    { label: 'mobile-app', value: 'mobile-app' }
  ];

  // 实例筛选
  selectedInstance = 'all';
  instanceOptions = [
    { label: '全部实例', value: 'all' },
    { label: '实例1', value: 'instance1' },
    { label: '实例2', value: 'instance2' }
  ];

  activeTab = 'tab1';

  // 指标数据
  metrics: IterationMetrics = {
    totalTasks: 0,
    completedTasks: 0,
    totalStoryPoints: 0,
    completedStoryPoints: 0,
    averageVelocity: 0,
    velocityTrend: 0,
    capacityUtilization: 0,
    capacityTrend: 0,
    riskCount: 0,
    riskTrend: 0,
    qualityScore: 0,
    qualityTrend: 0,
    teamEfficiency: 0,
    efficiencyTrend: 0,
    codeCoverage: 0,
    coverageTrend: 0,
    technicalDebt: 0,
    debtTrend: 0
  };

  // 风险项目
  riskItems: RiskItem[] = [];

  // 图表数据
  progressChartData: ChartData = {
    labels: [],
    datasets: []
  };

  capacityChartData: ChartData = {
    labels: [],
    datasets: []
  };

  private iterationHealthService = inject(IterationHealthService);

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.metrics = this.iterationHealthService.getMetrics();
    this.riskItems = this.iterationHealthService.getRiskItems();
    this.progressChartData = this.iterationHealthService.getProgressChartData();
    this.capacityChartData = this.iterationHealthService.getCapacityChartData();
  }

  onAppChange(app: string) {
    this.selectedApp = app;
    this.loadData();
  }

  onInstanceChange(instance: string) {
    this.selectedInstance = instance;
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  getRiskLevelClass(level: string): string {
    switch (level) {
      case 'high': return 'risk-high';
      case 'medium': return 'risk-medium';
      case 'low': return 'risk-low';
      default: return '';
    }
  }

  getRiskLevelText(level: string): string {
    switch (level) {
      case 'high': return '高风险';
      case 'medium': return '中风险';
      case 'low': return '低风险';
      default: return '未知';
    }
  }

  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'urgent': return 'priority-urgent';
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return '';
    }
  }

  getPriorityText(priority: string): string {
    switch (priority) {
      case 'urgent': return '紧急';
      case 'high': return '高';
      case 'medium': return '中';
      case 'low': return '低';
      default: return '未知';
    }
  }

  // 添加 Math 对象到组件中
  Math = Math;
}
