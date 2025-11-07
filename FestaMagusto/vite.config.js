import { defineConfig } from 'vite'

export default defineConfig({
  base: '/FestaMagusto/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true
  }
})
