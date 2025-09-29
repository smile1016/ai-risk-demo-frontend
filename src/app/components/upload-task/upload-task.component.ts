import { Component, ElementRef, ViewChild } from '@angular/core';
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
  @ViewChild('heatCanvas') heatCanvas!: ElementRef<HTMLCanvasElement>;

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
        // this.renderChart();
        this.renderHeatMap();
      },
      error: (err) => {
        console.error(err);
        this.error = 'AI 调用失败';
        this.loading = false;
      },
    });
  }

  importMock() {
    let url = 'http://localhost:3000/import/pingcode-mock';

    this.http.post<any>(url, {}).subscribe({
      next: (res) => {
        this.tasks = res.tasks;
        // this.renderChart();
        // this.renderHeatMap();
      },
      error: (err) => {
        console.error(err);
        alert('导入失败');
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

  renderHeatMap() {
    if (!this.heatCanvas) return;

    const ctx = this.heatCanvas.nativeElement.getContext('2d');
    if (!ctx) return console.error('无法获取 Canvas 2D 上下文');

    if (this.chart) this.chart.destroy();

    const data = this.tasks.map((t) => ({
      x: t.probability,
      y: t.impact,
      r: t.risk_score * 20,
      label: t.name,
    }));

    this.chart = new Chart(ctx, {
      type: 'bubble',
      data: {
        datasets: [
          {
            label: '任务风险热力图',
            data,
            backgroundColor: 'rgba(255,99,132,0.6)',
          },
        ],
      },
      options: {
        scales: {
          x: { min: 0, max: 1, title: { display: true, text: '概率' } },
          y: { min: 0, max: 1, title: { display: true, text: '影响' } },
        },
      },
    });
  }
}
