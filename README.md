# Exa Search

一个基于 [Exa API](https://exa.ai) 的 AI 搜索引擎，支持网页搜索和 AI 问答两种模式。

![Exa Search](https://img.shields.io/badge/Next.js-16-black) ![HeroUI](https://img.shields.io/badge/HeroUI-2.8-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

## ✨ 功能特性

- 🔍 **智能搜索** - 使用 Exa API 进行 AI 驱动的网页搜索
- 💬 **AI 问答** - 直接获取 AI 生成的答案，附带引用来源
- 🎨 **现代 UI** - 基于 HeroUI 组件库，支持深色/浅色主题
- 📱 **响应式设计** - 完美适配桌面和移动设备
- ⚡ **快速响应** - 基于 Next.js 14 App Router

## 🛠️ 技术栈

- **框架**: Next.js 14 (App Router)
- **UI 组件**: HeroUI
- **样式**: Tailwind CSS 4
- **动画**: Framer Motion
- **搜索 API**: Exa
- **语言**: TypeScript

## 🚀 快速开始

### 前置要求

- Node.js 18+
- pnpm (推荐) 或 npm/yarn
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

### 生产构建

```bash
pnpm build
pnpm start
```

## 📁 项目结构

```
exa-search/
├── app/
│   ├── api/
│   │   ├── search/route.ts    # 搜索 API
│   │   └── answer/route.ts    # 问答 API
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
└── ...
```

## 🔑 环境变量

| 变量名 | 描述 | 必填 |
|--------|------|------|
| `EXA_API_KEY` | Exa API 密钥 | ✅ |

## 📝 使用说明

### 搜索模式
点击搜索图标 🔍，输入关键词，获取相关网页搜索结果。

### 问答模式
点击闪电图标 ⚡，输入问题，获取 AI 生成的答案及引用来源。

## 📄 License

MIT License

## 🙏 致谢

- [Exa](https://exa.ai) - AI 搜索 API
- [HeroUI](https://heroui.com) - UI 组件库
- [Next.js](https://nextjs.org) - React 框架
