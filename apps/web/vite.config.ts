import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
    open: false,
    cors: true,
    // 代理配置示例
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:8080',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ''),
    //   },
    // },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    // 分包配置
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue', 'vue-router', 'pinia'],
        },
      },
    },
  },
  // 定义全局常量
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
})
