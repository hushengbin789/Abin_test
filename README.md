# Vue 3 + TypeScript + Vite Monorepo

一个现代化的前端 Monorepo 项目脚手架，集成 Vue 3、TypeScript、Vite 等主流技术栈。

## ✨ 特性

- 📦 **Monorepo 架构** - 使用 pnpm workspaces 实现代码共享和依赖管理
- ⚡ **Vite 5** - 极速的开发服务器和构建工具
- 🔷 **TypeScript 5** - 全面的类型支持
- 🎨 **Vue 3.4** - 使用 Composition API 和 script setup 语法
- 🧩 **组件库** - 内置可复用的 UI 组件库
- 🛠️ **工具库** - 常用的工具函数集合
- 🎨 **Tailwind CSS** - 原子化 CSS 框架
- 📝 **ESLint + Prettier** - 代码规范和格式化
- 🔄 **Pinia** - Vue 3 状态管理
- 🚀 **Vue Router** - 路由管理

## 📁 项目结构

```
vue3-monorepo/
├── apps/
│   └── web/                    # 主应用
│       ├── src/
│       │   ├── views/          # 页面组件
│       │   ├── layouts/        # 布局组件
│       │   ├── router/         # 路由配置
│       │   ├── stores/         # 状态管理
│       │   └── styles/         # 全局样式
│       ├── public/             # 静态资源
│       └── vite.config.ts      # Vite 配置
├── packages/
│   ├── components/             # 共享组件库
│   │   ├── src/
│   │   │   ├── components/     # 组件
│   │   │   ├── composables/    # 组合式函数
│   │   │   └── types/          # 类型定义
│   │   └── vite.config.ts
│   ├── utils/                  # 工具函数库
│   │   └── src/
│   │       ├── storage.ts      # 存储工具
│   │       ├── date.ts         # 日期处理
│   │       ├── validate.ts     # 数据验证
│   │       ├── format.ts       # 格式化工具
│   │       ├── common.ts       # 通用工具
│   │       └── debounce.ts     # 防抖节流
│   └── types/                  # 共享类型定义
│       └── src/
│           ├── user.ts         # 用户类型
│           ├── api.ts          # API 类型
│           └── common.ts       # 通用类型
├── .eslintrc.cjs               # ESLint 配置
├── .prettierrc                 # Prettier 配置
├── pnpm-workspace.yaml         # 工作空间配置
├── package.json                # 根 package.json
└── tsconfig.json               # TypeScript 配置
```

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### 安装依赖

```bash
# 安装 pnpm（如果还没安装）
npm install -g pnpm

# 安装项目依赖
pnpm install
```

### 开发

```bash
# 启动开发服务器
pnpm dev

# 启动指定应用
pnpm -F @apps/web dev
```

### 构建

```bash
# 构建所有包
pnpm build

# 构建指定应用
pnpm -F @apps/web build
```

### 代码检查

```bash
# ESLint 检查并修复
pnpm lint

# Prettier 格式化
pnpm format

# 类型检查
pnpm typecheck
```

## 📦 包说明

### @packages/types

共享类型定义包，包含：

- 用户相关类型（UserInfo, LoginParams 等）
- API 响应类型（ApiResponse, PaginationResult 等）
- 通用工具类型（Nullable, DeepPartial 等）

**使用方式：**

```typescript
import type { UserInfo, ApiResponse } from '@packages/types'
```

### @packages/utils

工具函数库，包含：

- 存储工具（setStorage, getStorage 等）
- 日期处理（formatDate, getRelativeTime 等）
- 数据验证（isEmail, isMobile 等）
- 格式化工具（formatMoney, formatFileSize 等）
- 防抖节流（debounce, throttle 等）

**使用方式：**

```typescript
import { formatDate, debounce, isEmail } from '@packages/utils'
```

### @packages/components

Vue 3 组件库，包含：

- BaseButton - 按钮组件
- BaseInput - 输入框组件
- BaseModal - 模态框组件
- BaseLoading - 加载组件
- BaseCard - 卡片组件
- useModal - 模态框状态管理
- useLoading - 加载状态管理

**使用方式：**

```typescript
// 按需导入
import { BaseButton, BaseModal, useModal } from '@packages/components'

// 全局注册
import MonorepoComponents from '@packages/components'
app.use(MonorepoComponents)
```

## 🔧 配置说明

### 添加新的工作空间包

1. 在 `packages/` 或 `apps/` 下创建新目录
2. 添加 `package.json`，设置合适的包名（如 `@packages/xxx` 或 `@apps/xxx`）
3. 运行 `pnpm install` 更新依赖

### 包之间的依赖

在 `package.json` 中使用 `workspace:*` 引用工作空间内的其他包：

```json
{
  "dependencies": {
    "@packages/utils": "workspace:*",
    "@packages/types": "workspace:*"
  }
}
```

### 路径别名

TypeScript 路径别名配置在根目录的 `tsconfig.json` 中：

```json
{
  "compilerOptions": {
    "paths": {
      "@packages/*": ["packages/*/src"],
      "@apps/*": ["apps/*/src"]
    }
  }
}
```

## 📝 开发规范

### 代码风格

- 使用 ESLint + Prettier 进行代码规范检查和格式化
- 使用 TypeScript 严格模式
- 避免使用 `any` 类型
- 组件使用 `<script setup>` 语法
- 使用中文注释

### 提交规范

建议使用约定式提交规范：

```
feat: 新功能
fix: 修复 Bug
docs: 文档更新
style: 代码格式调整
refactor: 代码重构
perf: 性能优化
test: 测试相关
chore: 构建/工具相关
```

## 📄 License

MIT
