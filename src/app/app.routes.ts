import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/overview',
    pathMatch: 'full'
  },
  {
    path: 'overview',
    loadComponent: () => import('./components/ai-iteration-planning/ai-iteration-planning.component').then(m => m.AIIterationPlanningComponent),
    title: '迭代概览'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./components/real-time-dashboard/real-time-dashboard.component').then(m => m.RealTimeDashboardComponent),
    title: '实时监控仪表板'
  },
  {
    path: 'health-monitor',
    loadComponent: () => import('./components/project-health-monitor/project-health-monitor.component').then(m => m.ProjectHealthMonitorComponent),
    title: '项目健康监控'
  },

];
