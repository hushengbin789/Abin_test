# Vue3 + TypeScript + Vite Monorepo

一个基于 pnpm workspaces 构建的 Vue 3 Monorepo 全生态项目模板。

## ✨ 特性

- 📦 **Monorepo 架构** - 使用 pnpm workspaces 管理多包项目
- ⚡ **Vite 构建** - 极速的开发服务器和构建工具
- 🎨 **Vue 3** - 使用 Composition API 和 `<script setup>` 语法
- 📘 **TypeScript** - 完整的类型支持
- 🧩 **组件库** - 内置共享组件库
- 🪝 **Hooks** - 丰富的 Composition API Hooks
- 🛠 **工具库** - 通用工具函数、类型定义、常量等
- 🔍 **ESLint + Prettier** - 代码质量和格式化保证
- 🐶 **Husky + lint-staged** - Git Hooks 自动化

## 📁 项目结构

```
├── apps/                    # 应用层
│   ├── web/                 # 主应用 (端口 3000)
│   └── admin/               # 管理后台 (端口 3001)
├── packages/                # 共享包
│   ├── shared/              # 共享工具库
│   │   ├── utils/           # 工具函数
│   │   ├── types/           # 类型定义
│   │   ├── constants/       # 常量
│   │   ├── storage/         # 存储工具
│   │   └── request/         # 请求工具
│   ├── components/          # 共享组件库
│   │   ├── Button/          # 按钮组件
│   │   ├── Input/           # 输入框组件
│   │   ├── Modal/           # 模态框组件
│   │   └── Loading/         # 加载组件
│   └── hooks/               # 共享 Hooks
│       ├── useLoading       # 加载状态
│       ├── useBoolean       # 布尔状态
│       ├── useDebounce      # 防抖
│       ├── useThrottle      # 节流
│       └── ...
├── .husky/                  # Git Hooks
├── .vscode/                 # VS Code 配置
├── package.json             # 根配置
├── pnpm-workspace.yaml      # pnpm 工作区配置
├── tsconfig.json            # TypeScript 配置
├── .eslintrc.cjs            # ESLint 配置
└── .prettierrc              # Prettier 配置
```

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### 安装依赖

```bash
# 安装 pnpm（如果尚未安装）
npm install -g pnpm

# 安装项目依赖
pnpm install
```

### 开发

```bash
# 启动所有应用
pnpm dev

# 仅启动主应用
pnpm dev:web

# 仅启动管理后台
pnpm dev:admin
```

### 构建

```bash
# 构建所有应用
pnpm build

# 仅构建主应用
pnpm build:web

# 仅构建管理后台
pnpm build:admin
```

### 其他命令

```bash
# 代码检查
pnpm lint

# 代码格式化
pnpm format

# 类型检查
pnpm type-check

# 清理依赖和构建产物
pnpm clean
```

## 📦 共享包使用

### 在应用中使用共享包

```typescript
// 使用工具函数
import { formatDate, debounce, deepClone } from '@monorepo/shared'

// 使用常量
import { STORAGE_KEYS, HTTP_STATUS } from '@monorepo/shared'

// 使用类型
import type { ApiResponse, UserInfo } from '@monorepo/shared'

// 使用组件
import { MButton, MInput, MModal } from '@monorepo/components'

// 使用 Hooks
import { useLoading, useBoolean, useDebounce } from '@monorepo/hooks'
```

### 全局注册组件库

```typescript
// main.ts
import MonorepoComponents from '@monorepo/components'

app.use(MonorepoComponents)
```

## 🛠 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Vue | ^3.3.11 | 渐进式 JavaScript 框架 |
| TypeScript | ^5.3.2 | JavaScript 的超集 |
| Vite | ^5.0.5 | 下一代前端构建工具 |
| Pinia | ^2.1.7 | Vue 状态管理库 |
| Vue Router | ^4.2.5 | Vue 官方路由 |
| pnpm | ^8.0.0 | 快速、节省磁盘空间的包管理器 |
| ESLint | ^8.55.0 | 代码质量检查工具 |
| Prettier | ^3.1.0 | 代码格式化工具 |

## 📄 许可证

MIT License
