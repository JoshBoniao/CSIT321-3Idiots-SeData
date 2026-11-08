import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/course': 'http://localhost:8080',
      '/assessment': 'http://localhost:8080'
    }
  }
});
