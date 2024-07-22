import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // vite.config.js

  // vite.config.js

  server: {
    proxy: {
      '/api': {
        target: 'https://auth-full-stak-app.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },



})
