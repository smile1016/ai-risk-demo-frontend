import { Injectable } from '@angular/core';

export interface SprintCapacityInput {
  teamMembers: number;
  sprintDuration: number; // days
  historicalData: Array<{ completedPoints: number; carriedOverPoints: number }>;
}

@Injectable({ providedIn: 'root' })
export class AICapacityPredictorService {
  predict(input: SprintCapacityInput): number {
    const historicalCompleted = input.historicalData.map(i => i.completedPoints);
    const avgCompleted = historicalCompleted.length
      ? historicalCompleted.reduce((a, b) => a + b, 0) / historicalCompleted.length
      : 0;

    const durationFactor = input.sprintDuration / 14; // baseline: 2 weeks
    const teamFactor = Math.max(1, input.teamMembers) / 6; // baseline: 6 people

    const predicted = avgCompleted * durationFactor * teamFactor;
    return Math.max(5, Math.round(predicted));
  }
}


