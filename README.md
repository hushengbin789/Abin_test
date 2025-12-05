# Vue 3 + TypeScript + Vite Monorepo 项目

这是一个基于 Vue 3 + TypeScript + Vite 的 Monorepo 项目模板，使用 pnpm workspaces 管理多个包。

## ✨ 特性

- 🚀 **Vue 3** - 使用 Composition API 和 `<script setup>` 语法
- 📦 **TypeScript** - 完整的类型支持
- ⚡ **Vite** - 极速的开发体验
- 🎯 **Monorepo** - pnpm workspaces 管理多包
- 🧩 **组件库** - 可复用的 UI 组件
- 🪝 **Hooks 库** - 实用的组合式函数
- 🔧 **工具库** - 常用的工具函数
- 📏 **代码规范** - ESLint + Prettier + Commitlint

## 📁 项目结构

```
├── apps/
│   └── web-app/              # 主应用
│       ├── src/
│       │   ├── components/   # 应用组件
│       │   ├── views/        # 页面视图
│       │   ├── router/       # 路由配置
│       │   ├── stores/       # 状态管理
│       │   ├── styles/       # 样式文件
│       │   └── main.ts       # 入口文件
│       └── package.json
│
├── packages/
│   ├── shared/
│   │   ├── utils/            # @mono/utils 工具函数库
│   │   ├── hooks/            # @mono/hooks 组合式函数库
│   │   └── components/       # @mono/components 组件库
│   └── configs/
│       ├── eslint-config/    # @mono/eslint-config ESLint 配置
│       └── tsconfig/         # @mono/tsconfig TypeScript 配置
│
├── package.json              # 根目录配置
├── pnpm-workspace.yaml       # pnpm 工作空间配置
└── tsconfig.json             # TypeScript 配置
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
# 启动开发服务器
pnpm dev

# 构建所有包
pnpm build

# 仅构建主应用
pnpm build:app
```

### 代码规范

```bash
# 运行 ESLint 检查
pnpm lint

# 格式化代码
pnpm format

# 类型检查
pnpm type-check
```

## 📦 包说明

### @mono/utils

共享工具函数库，包含：

- 类型工具（Nullable, Optional, DeepPartial 等）
- 通用函数（debounce, throttle, deepClone 等）
- 存储工具（localStorage 封装）
- 格式化工具（日期、金额、文件大小等）
- 验证工具（手机号、邮箱、身份证等）

### @mono/hooks

Vue 3 组合式函数库，包含：

- `useLoading` - 加载状态管理
- `useRequest` - 请求管理
- `useToggle` - 状态切换
- `useDebounce` - 防抖
- `useThrottle` - 节流
- `useLocalStorage` - 本地存储
- `useEventListener` - 事件监听
- `useClickOutside` - 点击外部

### @mono/components

Vue 3 组件库，包含：

- `MButton` - 按钮组件
- `MInput` - 输入框组件
- `MModal` - 模态框组件
- `MLoading` - 加载组件
- `MMessage` - 消息提示组件

## 🔧 配置说明

### TypeScript 配置

项目使用 `@mono/tsconfig` 包管理 TypeScript 配置，提供了多种预设：

- `base.json` - 基础配置
- `vue-app.json` - Vue 应用配置
- `vue-lib.json` - Vue 组件库配置
- `node-lib.json` - Node 库配置

### ESLint 配置

项目使用 `@mono/eslint-config` 包管理 ESLint 配置，已预配置：

- TypeScript 支持
- Vue 3 支持
- Prettier 集成

## 📝 Git 提交规范

项目使用 Commitlint 规范提交信息，格式如下：

```
<type>(<scope>): <subject>
```

支持的类型：

- `feat` - 新功能
- `fix` - 修复 Bug
- `docs` - 文档更新
- `style` - 样式调整
- `refactor` - 代码重构
- `perf` - 性能优化
- `test` - 测试相关
- `build` - 构建相关
- `ci` - CI 配置
- `chore` - 其他更改
- `revert` - 回滚

## 📄 许可证

MIT License
