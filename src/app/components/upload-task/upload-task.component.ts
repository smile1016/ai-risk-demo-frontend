import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { Chart } from 'chart.js/auto';
import { RiskTableComponent } from '../risk-table/risk-table.component';

@Component({
  selector: 'app-upload-task',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RiskTableComponent],
  templateUrl: './upload-task.component.html',
})
export class UploadTaskComponent {
  tasks: any[] = [];
  riskResult: any[] = [];
  loading = false;
  error = '';
  chart: any = null;

  private apiUrl = 'http://localhost:3000/predict-risk';

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      this.tasks = XLSX.utils.sheet_to_json(sheet);
    };
    reader.readAsArrayBuffer(file);
  }

  analyzeTasks() {
    if (!this.tasks.length) {
      this.error = '请先上传 Excel 文件';
      return;
    }
    this.error = '';
    this.loading = true;

    this.http.post<any>(this.apiUrl, { tasks: this.tasks }).subscribe({
      next: (res) => {
        this.riskResult = res;
        this.loading = false;
        this.renderChart();
      },
      error: (err) => {
        console.error(err);
        this.error = 'AI 调用失败';
        this.loading = false;
      },
    });
  }

  renderChart() {
    const counts: any = { 高: 0, 中: 0, 低: 0, 正常: 0 };
    this.riskResult.forEach((r) => {
      const lvl = r.level || '低';
      counts[lvl] = (counts[lvl] || 0) + 1;
    });

    const data = [counts['高'], counts['中'], counts['低'], counts['正常']];
    const labels = ['高', '中', '低', '正常'];

    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = new Chart('riskChart', {
      type: 'pie',
      data: {
        labels,
        datasets: [
          {
            data,
            backgroundColor: ['#FF4C4C', '#FFC107', '#4CAF50', '#9E9E9E'],
          },
        ],
      },
    });
  }
}
