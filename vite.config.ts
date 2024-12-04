import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react']
  },
  server: {
    hmr: true,
    watch: {
      usePolling: true
    }
  },
  resolve: {
    alias: {
      // These modules should be handled by the backend
      'imap-simple': './src/mocks/imap-simple-mock.ts',
      'node-pop3': './src/mocks/pop3-mock.ts',
      'googleapis': './src/mocks/googleapis-mock.ts'
    }
  }
});
