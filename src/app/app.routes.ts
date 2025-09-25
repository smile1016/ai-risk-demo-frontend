import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/iteration-monitor',
    pathMatch: 'full'
  },
  {
    path: 'iteration-monitor',
    loadComponent: () => import('./components/iteration-health-monitor/iteration-health-monitor.component').then(m => m.IterationHealthMonitorComponent),
    title: '迭代健康度智能监控'
  }
];
