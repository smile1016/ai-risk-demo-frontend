# 项目健康度智能监控系统

## 🌟 项目简介

这是一个基于 Angular 18 最新语法和 ngx-tethys 组件库构建的现代化项目健康度智能监控系统。系统集成了多维度AI评估、异常模式识别和优化建议自动生成功能，并使用了 Angular 18 的新特性如 signals、computed、effect 等。

## ✨ 核心特性

### 🎯 多维度健康评分
- **进度评估**: 任务完成率、团队速度监控
- **质量评估**: 代码覆盖率、缺陷密度分析
- **风险评估**: 高风险任务识别、风险等级评估
- **团队评估**: 团队绩效、协作效率分析
- **资源评估**: 预算使用率、资源配置优化

### 🔍 AI异常模式识别
- **实时监控**: 每15秒自动检测异常模式
- **智能分析**: 基于机器学习的异常检测算法
- **多类型识别**: 支持趋势、峰值、下降、周期、异常值检测
- **置信度评估**: AI置信度评分，确保检测准确性
- **预警机制**: 分级预警系统，及时发现问题

### 💡 智能优化建议
- **智能分析**: 基于项目数据的深度分析
- **个性化建议**: 针对不同维度的优化建议
- **优先级排序**: 根据影响度和实施难度智能排序
- **实施指导**: 详细的实施步骤和预期效果
- **效果追踪**: 建议应用后的效果监控

### 📊 实时监控仪表板
- **核心指标**: 整体健康度、活跃警报、AI建议、团队绩效
- **系统状态**: CPU、内存、磁盘、网络等系统指标监控
- **活动日志**: 实时活动记录和系统事件追踪
- **可视化展示**: 丰富的图表和进度条展示

## 🛠️ 技术栈

- **前端框架**: Angular 18 (Standalone Components)
- **状态管理**: Angular Signals (最新特性)
- **UI组件库**: ngx-tethys 19.1.3
- **文档生成**: @docgeni/cli 2.5.0
- **图表库**: Chart.js 4.5.0
- **样式**: SCSS
- **构建工具**: Angular CLI

## 🚀 快速开始

### 环境要求
- Node.js 18+
- npm 或 yarn
- Angular CLI 18+

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm start
```

访问 http://localhost:4600 查看应用

### 启动文档服务
```bash
npm run docs:serve
```

访问 http://localhost:4600 查看文档

### 构建生产版本
```bash
npm run build
```

## 📱 功能模块

### 1. 健康概览 (`/overview`)
- 使用 Angular Signals 进行状态管理
- 实时数据更新和计算属性
- 现代化的组件架构

### 2. 实时仪表板 (`/dashboard`)
- 核心指标概览
- 系统状态监控
- 实时活动日志
- 可配置的刷新间隔

### 3. 项目健康监控 (`/health-monitor`)
- 多维度评分展示
- 健康状态可视化
- 异常警报管理
- 优化建议展示

### 4. 异常模式识别 (`/anomaly-detection`)
- 实时异常检测
- 检测规则配置
- 异常详情分析
- 处理状态跟踪

### 5. AI优化建议 (`/ai-optimization`)
- 智能建议生成
- 分类和优先级管理
- 详细实施指导
- 建议应用跟踪

### 6. 任务上传 (`/upload-task`)
- Excel文件上传
- AI风险预测
- 结果可视化
- 数据导出

## 🎨 技术亮点

### Angular 18 新特性应用

#### 1. Signals 状态管理
```typescript
// 使用 signals 进行响应式状态管理
private readonly _metrics = signal<HealthMetric[]>([]);
readonly metrics = this._metrics.asReadonly();

// 计算属性
readonly overallHealth = computed(() => {
  const score = this._healthScore();
  return score.overall;
});
```

#### 2. Standalone Components
```typescript
@Component({
  selector: 'app-health-overview',
  standalone: true,
  imports: [
    CommonModule,
    ThyCardModule,
    ThyButtonModule,
    // ... 其他模块
  ],
  template: `...`,
  styleUrl: './health-overview.component.scss'
})
export class HealthOverviewComponent {}
```

#### 3. 新的生命周期钩子
```typescript
constructor() {
  // 使用 effect 进行副作用处理
  effect(() => {
    if (this.autoRefreshSignal()) {
      this.startAutoRefresh();
    }
  });
}
```

#### 4. 函数式路由配置
```typescript
export const routes: Routes = [
  {
    path: 'overview',
    loadComponent: () => import('./components/health-overview/health-overview.component').then(m => m.HealthOverviewComponent),
    title: '健康概览'
  }
];
```

### 现代化服务架构
```typescript
@Injectable({
  providedIn: 'root'
})
export class HealthMonitorService {
  // 使用 signals 进行状态管理
  private readonly _isLoading = signal(false);
  readonly isLoading = this._isLoading.asReadonly();
  
  // 计算属性
  readonly activeAlerts = computed(() => {
    return this._alerts().filter(alert => !alert.resolved);
  });
}
```

## 📊 项目结构

```
src/
├── app/
│   ├── components/           # 组件目录
│   │   ├── health-overview/         # 健康概览 (使用 Signals)
│   │   ├── real-time-dashboard/     # 实时仪表板
│   │   ├── project-health-monitor/  # 项目健康监控
│   │   ├── anomaly-detection/       # 异常检测
│   │   ├── ai-optimization/         # AI优化建议
│   │   └── upload-task/             # 任务上传
│   ├── services/             # 服务目录
│   │   ├── health-monitor.service.ts # 健康监控服务
│   │   └── ai.service.ts            # AI服务
│   ├── app.config.ts         # 应用配置
│   └── app.routes.ts         # 路由配置
├── styles.scss               # 全局样式
└── main.ts                   # 应用入口

docs/                        # 文档目录
├── guide/                   # 指南文档
├── components/              # 组件文档
├── examples/                # 示例文档
└── api/                     # API文档
```

## 🎯 商业价值

### 核心优势
1. **减少项目失败率**: 提前识别风险，及时采取应对措施
2. **提升团队效率**: 基于数据的优化建议，提高工作效率
3. **降低管理成本**: 自动化监控和分析，减少人工成本
4. **改善决策质量**: 基于AI的智能分析，提供决策支持

### 适用场景
- **软件开发项目**: 代码质量、进度、风险监控
- **产品开发**: 产品健康度、团队绩效评估
- **项目管理**: 项目状态、资源使用优化
- **团队管理**: 团队协作、技能发展建议

## 🔧 配置说明

### 路由配置
系统使用懒加载路由，支持按需加载组件：
- `/overview` - 健康概览 (默认首页)
- `/dashboard` - 实时仪表板
- `/health-monitor` - 项目健康监控
- `/anomaly-detection` - 异常模式识别
- `/ai-optimization` - AI优化建议
- `/upload-task` - 任务上传

### 文档配置
使用 @docgeni/cli 生成文档：
- 自动生成组件文档
- 支持 Markdown 编写
- 集成 API 文档
- 支持多语言

## 🎨 界面特色

### 设计理念
- **现代化UI**: 采用ngx-tethys组件库，界面简洁美观
- **响应式设计**: 支持桌面端和移动端适配
- **实时更新**: 数据实时刷新，动态展示
- **交互友好**: 丰富的交互效果和用户反馈

### 视觉特点
- **渐变色彩**: 使用现代化的渐变色彩方案
- **卡片布局**: 清晰的信息层次和布局结构
- **图标系统**: 丰富的图标系统，提升用户体验
- **动画效果**: 平滑的过渡动画和加载效果

## 📝 开发指南

### 代码规范
- 使用 TypeScript 严格模式
- 遵循 Angular 代码风格指南
- 组件命名采用 kebab-case
- 服务使用 providedIn: 'root'

### 组件开发
- 优先使用 Standalone 组件
- 使用 Angular Signals 进行状态管理
- 组件职责单一，易于测试
- 使用 rxjs 进行数据流管理

### 样式规范
- 使用 SCSS 预处理器
- 采用 BEM 命名规范
- 响应式设计优先
- 主题色彩统一

## 🔮 未来规划

### 功能扩展
- **机器学习模型**: 集成真实的ML模型进行预测
- **数据可视化**: 更丰富的图表和仪表板
- **通知系统**: 邮件、短信等通知机制
- **权限管理**: 基于角色的访问控制

### 技术优化
- **性能优化**: 虚拟滚动、懒加载等优化
- **国际化**: 多语言支持
- **PWA**: 渐进式Web应用支持
- **微前端**: 微前端架构改造

## 🤝 贡献指南

欢迎贡献代码、报告问题或提出建议！

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 📄 许可证

MIT License

---

**项目健康度智能监控系统** - 基于 Angular 18 最新特性的现代化项目监控解决方案！ 🚀
