import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: process.env.VITE_API_BASE_URL || 'http://localhost:5000', // use a default local server for development
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // rewrite the path
      },
    },
  },
});