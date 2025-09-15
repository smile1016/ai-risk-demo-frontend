import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-risk-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './risk-table.component.html',
})
export class RiskTableComponent {
  @Input() riskData: any[] = [];
}
