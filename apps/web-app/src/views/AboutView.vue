<script setup lang="ts">
/**
 * 关于页面
 */
</script>

<template>
  <div class="about-view">
    <h1 class="page-title">关于项目</h1>

    <section class="about-section">
      <h2 class="section-title">📦 项目介绍</h2>
      <p class="section-content">
        这是一个基于 Vue 3 + TypeScript + Vite 的 Monorepo 项目模板。
        使用 pnpm workspaces 管理多个包，实现代码复用和统一管理。
      </p>
    </section>

    <section class="about-section">
      <h2 class="section-title">🏗️ 项目结构</h2>
      <pre class="code-block">
├── apps/
│   └── web-app/              # 主应用
├── packages/
│   ├── shared/
│   │   ├── utils/            # @mono/utils 工具函数库
│   │   ├── hooks/            # @mono/hooks 组合式函数库
│   │   └── components/       # @mono/components 组件库
│   └── configs/
│       ├── eslint-config/    # @mono/eslint-config ESLint 配置
│       └── tsconfig/         # @mono/tsconfig TypeScript 配置
├── package.json
├── pnpm-workspace.yaml
└── tsconfig.json</pre>
    </section>

    <section class="about-section">
      <h2 class="section-title">🛠️ 技术栈</h2>
      <ul class="tech-list">
        <li><span class="tech-badge">Vue 3</span> 渐进式 JavaScript 框架</li>
        <li><span class="tech-badge">TypeScript</span> JavaScript 的超集</li>
        <li><span class="tech-badge">Vite</span> 下一代前端构建工具</li>
        <li><span class="tech-badge">pnpm</span> 快速、节省空间的包管理器</li>
        <li><span class="tech-badge">Vue Router</span> Vue.js 官方路由</li>
        <li><span class="tech-badge">Pinia</span> Vue 状态管理库</li>
        <li><span class="tech-badge">ESLint</span> 代码检查工具</li>
        <li><span class="tech-badge">Prettier</span> 代码格式化工具</li>
      </ul>
    </section>

    <section class="about-section">
      <h2 class="section-title">📝 常用命令</h2>
      <div class="command-list">
        <div class="command-item">
          <code>pnpm install</code>
          <span>安装依赖</span>
        </div>
        <div class="command-item">
          <code>pnpm dev</code>
          <span>启动开发服务器</span>
        </div>
        <div class="command-item">
          <code>pnpm build</code>
          <span>构建所有包</span>
        </div>
        <div class="command-item">
          <code>pnpm lint</code>
          <span>运行代码检查</span>
        </div>
        <div class="command-item">
          <code>pnpm format</code>
          <span>格式化代码</span>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-view {
  max-width: 800px;
  margin: 0 auto;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 32px;
}

.about-section {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
}

.section-content {
  color: #666;
  line-height: 1.8;
}

.code-block {
  background-color: #1e1e1e;
  color: #d4d4d4;
  padding: 20px;
  border-radius: 8px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 13px;
  line-height: 1.6;
  overflow-x: auto;
}

.tech-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.tech-list li {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #666;
}

.tech-badge {
  display: inline-block;
  padding: 4px 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  min-width: 100px;
  text-align: center;
}

.command-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.command-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  background-color: #f5f7fa;
  border-radius: 8px;
}

.command-item code {
  background-color: #1e1e1e;
  color: #d4d4d4;
  padding: 4px 12px;
  border-radius: 4px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 13px;
  min-width: 180px;
}

.command-item span {
  color: #666;
  font-size: 14px;
}
</style>
