# NewsSphere · 新闻星球

> AI 新闻推送应用 — 星辰为器，资讯为仪

基于 Next.js 14 + Three.js + Framer Motion 打造的沉浸式新闻阅读体验。将 9 大新闻领域映射为宇宙星座象征物，融入星降仪式动画与 3D 交互。

## 技术栈

- **框架**: Next.js 14 (App Router, TypeScript Strict)
- **样式**: Tailwind CSS 3.4 + 深空矿石色板
- **动画**: Framer Motion (页面过渡 + 微交互)
- **3D**: Three.js + React Three Fiber (9 个低多边形象征物)
- **状态管理**: Zustand (含 persist 中间件)
- **数据**: NewsAPI 集成 + LLM AI 摘要 + Mock 降级方案

## 快速开始

```bash
# 安装依赖
npm install

# 配置环境变量
cp .env.example .env.local
# 编辑 .env.local 填入 API Key

# 启动开发服务器
npm run dev
```

## 项目结构

```
src/
├── app/                    # Next.js App Router 页面
│   ├── page.tsx            # 星空大厅首页
│   ├── [domain]/page.tsx   # 领域详情页
│   ├── article/[id]/page.tsx # 文章阅读页
│   └── api/                # API 路由
├── components/
│   ├── star-hall/          # 星空大厅组件
│   ├── domain/             # 领域详情组件
│   ├── article/            # 文章阅读组件
│   ├── three-d/            # 3D 象征物
│   └── shared/             # 共享组件
├── lib/                    # 类型、常量、工具
├── services/               # 新闻服务、AI 服务
└── stores/                 # Zustand 状态管理
```

## License

MIT
