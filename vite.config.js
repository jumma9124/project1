import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/project1/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/finlifeapi': {
        target: 'https://finlife.fss.or.kr',
        changeOrigin: true,
        secure: true,
      },
      '/api/yahoo': {
        target: 'https://query1.finance.yahoo.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/yahoo/, ''),
      },
    },
  },
});
