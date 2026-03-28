import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig((env: any) => {
  const isSsr = env.ssrBuild || env.isSsrBuild || (env.command === 'build' && process.argv.includes('--ssr'));
  
  return {
    plugins: [react()],
    ssr: {
      // Force non-externalization of these packages during SSR build 
      // to avoid ESM/CJS naming export issues in Node.js
      noExternal: ['react-helmet-async', 'react-router-dom', 'react-router'],
    },
    build: {
      rollupOptions: {
        output: isSsr ? {} : {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
            animations: ['framer-motion'],
            ui: ['lucide-react', 'swiper'],
          },
        },
      },
      chunkSizeWarningLimit: 1000,
    },
  };
})
