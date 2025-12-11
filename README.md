# Exa Chat

一个基于 [Exa API](https://exa.ai) 的 AI 搜索引擎，支持网页搜索、AI 问答和代码助手三种模式。

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/your-username/exa-chat)

![Exa Chat](https://img.shields.io/badge/Next.js-15-black) ![HeroUI](https://img.shields.io/badge/HeroUI-2.8-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-orange)

## ✨ 功能特性

- 🔍 **智能搜索** - 使用 Exa API 进行 AI 驱动的网页搜索，支持关键词高亮
- 💬 **AI 问答** - 直接获取 AI 生成的答案，附带引用来源
- 💻 **代码助手** - 专业编程问答模式，支持上下文对话
- 🎨 **现代 UI** - 基于 HeroUI 组件库，支持深色/浅色主题
- 📱 **响应式设计** - 完美适配桌面和移动设备
- ⚡ **Edge Runtime** - 部署在 Cloudflare Workers，全球边缘节点加速
- 🖼️ **代码高亮** - 支持多语言代码语法高亮，主题自适应

## 🛠️ 技术栈

- **框架**: Next.js 15 (App Router)
- **UI 组件**: HeroUI
- **样式**: Tailwind CSS 4
- **动画**: Framer Motion
- **搜索 API**: Exa
- **部署**: Cloudflare Workers (OpenNext)
- **语言**: TypeScript

## 🚀 快速开始

### 前置要求

- Node.js 20+
- pnpm (推荐)
- Exa API Key ([获取地址](https://exa.ai))

### 安装步骤

1. 克隆项目

```bash
git clone https://github.com/your-username/exa-search.git
cd exa-search
```

2. 安装依赖

```bash
pnpm install
```

3. 配置环境变量

```bash
cp .env.example .env
```

编辑 `.env` 文件，添加你的 Exa API Key：

```env
EXA_API_KEY=your_exa_api_key_here
```

4. 启动开发服务器

```bash
pnpm dev
```

5. 打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## ☁️ 部署到 Cloudflare Workers

### 方式一：GitHub Actions 自动部署（推荐）

1. Fork 本项目到你的 GitHub

2. 在 GitHub 仓库 Settings → Secrets and variables → Actions 添加：
   - `CLOUDFLARE_API_TOKEN` - Cloudflare API Token
   - `CLOUDFLARE_ACCOUNT_ID` - Cloudflare Account ID

3. 在 Cloudflare Dashboard 设置 Worker 环境变量：
   - Workers & Pages → 你的 Worker → Settings → Variables
   - 添加 `EXA_API_KEY`

4. 推送代码到 main 分支，自动触发部署

### 方式二：本地部署

```bash
# 设置 API Key
pnpm wrangler secret put EXA_API_KEY

# 构建并部署
pnpm cf:deploy
```

> ⚠️ Windows 用户可能遇到符号链接问题，建议使用 GitHub Actions 部署

## 📁 项目结构

```
exa-search/
├── app/
│   ├── api/
│   │   ├── search/route.ts    # 搜索 API
│   │   ├── answer/route.ts    # 问答 API
│   │   ├── code/route.ts      # 代码助手 API
│   │   └── contents/route.ts  # 内容详情 API
│   ├── page.tsx               # 主页面
│   ├── layout.tsx             # 布局
│   └── globals.css            # 全局样式
├── components/
│   ├── AnswerCard.tsx         # AI 回答卡片
│   ├── SearchResultCard.tsx   # 搜索结果卡片
│   ├── PromptInput.tsx        # 输入框组件
│   ├── SuggestionCards.tsx    # 建议卡片
│   └── Header.tsx             # 头部导航
├── lib/
│   └── types.ts               # 类型定义
├── .github/
│   └── workflows/
│       └── deploy.yml         # GitHub Actions 部署
├── wrangler.toml              # Cloudflare Workers 配置
└── open-next.config.ts        # OpenNext 配置
```

## 🔑 环境变量

| 变量名 | 描述 | 必填 |
|--------|------|------|
| `EXA_API_KEY` | Exa API 密钥 | ✅ |

## 📝 使用说明

### 搜索模式 🔍
输入关键词，获取相关网页搜索结果，支持卡片式展示和详情弹窗。

### 问答模式 ⚡
输入问题，获取 AI 生成的答案及引用来源，支持 Markdown 渲染。

### 代码模式 💻
专业编程助手，支持多轮对话上下文，代码语法高亮显示。

## 📄 License

MIT License

## 🙏 致谢

- [Exa](https://exa.ai) - AI 搜索 API
- [HeroUI](https://heroui.com) - UI 组件库
- [Next.js](https://nextjs.org) - React 框架
- [OpenNext](https://opennext.js.org) - Cloudflare 部署适配
