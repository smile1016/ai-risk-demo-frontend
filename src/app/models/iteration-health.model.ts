export interface IterationMetrics {
  totalTasks: number;
  completedTasks: number;
  totalStoryPoints: number;
  completedStoryPoints: number;
  averageVelocity: number;
  velocityTrend: number;
  capacityUtilization: number;
  capacityTrend: number;
  riskCount: number;
  riskTrend: number;
  qualityScore: number;
  qualityTrend: number;
  teamEfficiency: number;
  efficiencyTrend: number;
  codeCoverage: number;
  coverageTrend: number;
  technicalDebt: number;
  debtTrend: number;
}

export interface RiskItem {
  id: string;
  taskName: string;
  assignee: string;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  riskLevel: 'high' | 'medium' | 'low';
  dueDate: string;
  status: 'completed' | 'in-progress' | 'blocked';
  isOverdue: boolean;
  description: string;
  impact: string;
  mitigation: string;
}

export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

export interface ChartDataset {
  label: string;
  data: number[];
  borderColor?: string;
  backgroundColor?: string;
  fill?: boolean;
  tension?: number;
}

export interface IterationData {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: 'planning' | 'active' | 'completed' | 'cancelled';
  teamMembers: string[];
  totalCapacity: number;
  usedCapacity: number;
  metrics: IterationMetrics;
  riskItems: RiskItem[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  capacity: number;
  utilization: number;
  skills: string[];
  availability: 'available' | 'busy' | 'unavailable';
}

export interface ProjectHealth {
  overallScore: number;
  trend: 'improving' | 'stable' | 'declining';
  criticalIssues: number;
  warnings: number;
  recommendations: string[];
  lastUpdated: string;
}
