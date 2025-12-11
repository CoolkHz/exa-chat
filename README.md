# Exa Chat

一个基于 [Exa API](https://exa.ai) 的 AI 搜索引擎，支持网页搜索、AI 问答和代码助手三种模式。

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/CoolkHz/exa-chat&env=EXA_API_KEY&envDescription=Exa%20API%20Key%20for%20search%20functionality&envLink=https://exa.ai)

![Exa Chat](https://img.shields.io/badge/Next.js-15-black) ![HeroUI](https://img.shields.io/badge/HeroUI-2.8-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![Vercel](https://img.shields.io/badge/Vercel-Deploy-black)

## ✨ 功能特性

- 🔍 **智能搜索** - 使用 Exa API 进行 AI 驱动的网页搜索，支持关键词高亮
- 💬 **AI 问答** - 直接获取 AI 生成的答案，附带引用来源
- 💻 **代码助手** - 专业编程问答模式，支持上下文对话
- 🎨 **现代 UI** - 基于 HeroUI 组件库，支持深色/浅色主题
- 📱 **响应式设计** - 完美适配桌面和移动设备
- ⚡ **极速部署** - 一键部署到 Vercel
- 🖼️ **代码高亮** - 支持多语言代码语法高亮，主题自适应

## 🛠️ 技术栈

- **框架**: Next.js 15 (App Router)
- **UI 组件**: HeroUI
- **样式**: Tailwind CSS 4
- **动画**: Framer Motion
- **搜索 API**: Exa
- **部署**: Vercel
- **语言**: TypeScript

## 🚀 快速开始

### 一键部署到 Vercel

点击下方按钮，一键部署到 Vercel：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/CoolkHz/exa-chat&env=EXA_API_KEY&envDescription=Exa%20API%20Key%20for%20search%20functionality&envLink=https://exa.ai)

部署时会提示你输入 `EXA_API_KEY`，填入你的 Exa API Key 即可。

### 本地开发

#### 前置要求

- Node.js 20+
- pnpm (推荐)
- Exa API Key ([获取地址](https://exa.ai))

#### 安装步骤

1. 克隆项目

```bash
git clone https://github.com/CoolkHz/exa-chat.git
cd exa-chat
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

## 📁 项目结构

```
exa-chat/
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
└── lib/
    └── types.ts               # 类型定义
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
- [Vercel](https://vercel.com) - 部署平台
