import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ChartData, IterationData, IterationMetrics, ProjectHealth, RiskItem, TeamMember } from '../models/iteration-health.model';

@Injectable({
  providedIn: 'root'
})
export class IterationHealthService {
  private mockMetrics: IterationMetrics = {
    totalTasks: 24,
    completedTasks: 18,
    totalStoryPoints: 89,
    completedStoryPoints: 67,
    averageVelocity: 15.2,
    velocityTrend: 8.5,
    capacityUtilization: 78,
    capacityTrend: 3.2,
    riskCount: 3,
    riskTrend: -12.5,
    qualityScore: 87,
    qualityTrend: 2.1,
    teamEfficiency: 82,
    efficiencyTrend: 5.8,
    codeCoverage: 85,
    coverageTrend: 1.2,
    technicalDebt: 24,
    debtTrend: -8.3
  };

  private mockRiskItems: RiskItem[] = [
    {
      id: '1',
      taskName: '用户认证模块重构',
      assignee: '张三',
      priority: 'urgent',
      riskLevel: 'high',
      dueDate: '2024-01-15',
      status: 'in-progress',
      isOverdue: true,
      description: '需要重构整个用户认证系统，涉及多个模块',
      impact: '可能影响用户登录功能',
      mitigation: '分阶段重构，保持向后兼容'
    },
    {
      id: '2',
      taskName: '数据库性能优化',
      assignee: '李四',
      priority: 'high',
      riskLevel: 'medium',
      dueDate: '2024-01-20',
      status: 'in-progress',
      isOverdue: false,
      description: '优化慢查询，提升数据库响应速度',
      impact: '可能影响系统整体性能',
      mitigation: '先在测试环境验证优化效果'
    },
    {
      id: '3',
      taskName: '第三方API集成',
      assignee: '王五',
      priority: 'medium',
      riskLevel: 'low',
      dueDate: '2024-01-25',
      status: 'in-progress',
      isOverdue: false,
      description: '集成新的支付API',
      impact: '可能影响支付流程',
      mitigation: '准备备用方案'
    }
  ];

  private mockProgressChartData: ChartData = {
    labels: ['第1周', '第2周', '第3周', '第4周', '第5周', '第6周'],
    datasets: [
      {
        label: '计划进度',
        data: [16.7, 33.3, 50, 66.7, 83.3, 100],
        borderColor: '#1890ff',
        backgroundColor: 'rgba(24, 144, 255, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        label: '实际进度',
        data: [12.5, 25, 45, 62.5, 75, 85],
        borderColor: '#52c41a',
        backgroundColor: 'rgba(82, 196, 26, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  private mockCapacityChartData: ChartData = {
    labels: ['第1周', '第2周', '第3周', '第4周', '第5周', '第6周'],
    datasets: [
      {
        label: '容量利用率',
        data: [65, 72, 78, 82, 75, 78],
        borderColor: '#fa8c16',
        backgroundColor: 'rgba(250, 140, 22, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        label: '目标利用率',
        data: [80, 80, 80, 80, 80, 80],
        borderColor: '#ff4d4f',
        backgroundColor: 'rgba(255, 77, 79, 0.1)',
        fill: false,
        tension: 0
      }
    ]
  };

  private mockTeamMembers: TeamMember[] = [
    {
      id: '1',
      name: '张三',
      role: '高级开发工程师',
      capacity: 40,
      utilization: 85,
      skills: ['Angular', 'Node.js', 'TypeScript'],
      availability: 'busy'
    },
    {
      id: '2',
      name: '李四',
      role: '后端开发工程师',
      capacity: 40,
      utilization: 75,
      skills: ['Java', 'Spring Boot', 'MySQL'],
      availability: 'available'
    },
    {
      id: '3',
      name: '王五',
      role: '前端开发工程师',
      capacity: 40,
      utilization: 70,
      skills: ['React', 'Vue.js', 'JavaScript'],
      availability: 'available'
    }
  ];

  private mockProjectHealth: ProjectHealth = {
    overallScore: 82,
    trend: 'improving',
    criticalIssues: 1,
    warnings: 3,
    recommendations: [
      '建议增加代码审查频率',
      '考虑引入自动化测试',
      '优化团队工作流程'
    ],
    lastUpdated: '2024-01-10 14:30:00'
  };

  constructor() {}

  getMetrics(): IterationMetrics {
    return { ...this.mockMetrics };
  }

  getRiskItems(): RiskItem[] {
    return [...this.mockRiskItems];
  }

  getProgressChartData(): ChartData {
    return { ...this.mockProgressChartData };
  }

  getCapacityChartData(): ChartData {
    return { ...this.mockCapacityChartData };
  }

  getTeamMembers(): TeamMember[] {
    return [...this.mockTeamMembers];
  }

  getProjectHealth(): ProjectHealth {
    return { ...this.mockProjectHealth };
  }

  getIterationData(): Observable<IterationData> {
    const iterationData: IterationData = {
      id: '1',
      name: 'Sprint 2024-01',
      startDate: '2024-01-01',
      endDate: '2024-01-31',
      status: 'active',
      teamMembers: ['张三', '李四', '王五'],
      totalCapacity: 120,
      usedCapacity: 94,
      metrics: this.mockMetrics,
      riskItems: this.mockRiskItems
    };

    return of(iterationData);
  }

  updateMetrics(metrics: Partial<IterationMetrics>): Observable<IterationMetrics> {
    this.mockMetrics = { ...this.mockMetrics, ...metrics };
    return of(this.mockMetrics);
  }

  addRiskItem(riskItem: Omit<RiskItem, 'id'>): Observable<RiskItem> {
    const newRiskItem: RiskItem = {
      ...riskItem,
      id: (this.mockRiskItems.length + 1).toString()
    };
    this.mockRiskItems.push(newRiskItem);
    this.mockMetrics.riskCount = this.mockRiskItems.length;
    return of(newRiskItem);
  }

  updateRiskItem(id: string, updates: Partial<RiskItem>): Observable<RiskItem> {
    const index = this.mockRiskItems.findIndex(item => item.id === id);
    if (index !== -1) {
      this.mockRiskItems[index] = { ...this.mockRiskItems[index], ...updates };
      return of(this.mockRiskItems[index]);
    }
    throw new Error('Risk item not found');
  }

  deleteRiskItem(id: string): Observable<boolean> {
    const index = this.mockRiskItems.findIndex(item => item.id === id);
    if (index !== -1) {
      this.mockRiskItems.splice(index, 1);
      this.mockMetrics.riskCount = this.mockRiskItems.length;
      return of(true);
    }
    return of(false);
  }

  // AI 分析相关方法
  analyzeIterationHealth(): Observable<any> {
    // 模拟 AI 分析结果
    const analysis = {
      completionProbability: 85,
      riskFactors: [
        '用户认证模块重构进度滞后',
        '数据库性能优化存在技术风险',
        '团队容量利用率偏高'
      ],
      recommendations: [
        '增加用户认证模块的开发资源',
        '提前进行数据库优化测试',
        '考虑调整团队工作分配'
      ],
      predictedCompletionDate: '2024-01-28',
      confidence: 0.78
    };

    return of(analysis);
  }

  predictCapacityNeeds(): Observable<any> {
    const prediction = {
      nextSprintCapacity: 95,
      recommendedTeamSize: 4,
      skillGaps: ['DevOps', 'UI/UX Design'],
      capacityTrend: 'increasing'
    };

    return of(prediction);
  }

  detectAnomalies(): Observable<any> {
    const anomalies = [
      {
        type: 'velocity_drop',
        severity: 'medium',
        description: '团队速度较上周下降 15%',
        timestamp: '2024-01-10 09:00:00'
      },
      {
        type: 'high_risk_concentration',
        severity: 'high',
        description: '高风险任务集中在同一开发者',
        timestamp: '2024-01-10 14:30:00'
      }
    ];

    return of(anomalies);
  }
}
