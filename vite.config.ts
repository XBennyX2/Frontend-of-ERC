import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({

  plugins: [react()],
  base: '/static/',
  server: {
    port: 5173,
    proxy:{
      '/api':{
        target: 'http://localhost:8000',
        changeOrigin: true,
      }
    }

  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
