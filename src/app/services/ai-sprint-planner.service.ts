import { Injectable } from '@angular/core';

export interface BacklogItem {
  id: string;
  title: string;
  points: number;
  priority: number; // 1 highest
}

@Injectable({ providedIn: 'root' })
export class AISprintPlannerService {
  generatePlan(backlog: BacklogItem[], capacity: number): BacklogItem[] {
    const sorted = [...backlog].sort((a, b) => a.priority - b.priority || a.points - b.points);
    const plan: BacklogItem[] = [];
    let used = 0;
    for (const item of sorted) {
      if (used + item.points <= capacity) {
        plan.push(item);
        used += item.points;
      }
    }
    return plan;
  }
}


