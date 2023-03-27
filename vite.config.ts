import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
import electron from 'vite-plugin-electron'
import electronRender from 'vite-plugin-electron-renderer'

// https://vitejs.dev/config/
export default defineConfig({
  envDir:'./environments',
  plugins: [
    vue(),
    electron({
      entry: "./electron/index.ts"
    }),
    electronRender({
      nodeIntegration: true,
    }),
  ],
  build:{
    emptyOutDir: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
  },
  server:{
    host:"0.0.0.0",
    port:3012,
    proxy: {
      '/ajax': 'http://localhost:7336',
    },
  }
})
