import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import { copyFileSync, existsSync } from 'fs'
import { join } from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: '/gego-analytics/',
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    tailwindcss(),
    {
      name: 'copy-404',
      closeBundle() {
        const distDir = join(process.cwd(), 'dist')
        const indexPath = join(distDir, 'index.html')
        const notFoundPath = join(distDir, '404.html')
        if (existsSync(indexPath)) {
          copyFileSync(indexPath, notFoundPath)
        }
      },
    },
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
