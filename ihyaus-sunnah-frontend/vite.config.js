import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Absolute base: a relative './' breaks deep links such as /admin/staff,
  // which then request /admin/assets/*.js and render a blank page
  // instead of letting the router redirect to /login.
  base: '/',
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'build',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (
              id.includes('react/') ||
              id.includes('react-dom/') ||
              id.includes('react-router-dom/') ||
              id.includes('react-router/')
            ) {
              return 'vendor-react';
            }
            if (id.includes('recharts')) {
              return 'vendor-charts';
            }
            if (
              id.includes('framer-motion') ||
              id.includes('react-icons') ||
              id.includes('react-hot-toast')
            ) {
              return 'vendor-ui';
            }
            return 'vendor-libs';
          }
        },
      },
    },
  },
})
