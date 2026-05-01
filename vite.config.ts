import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig((env: any) => {
  const isSsr = env.ssrBuild || env.isSsrBuild || (env.command === 'build' && process.argv.includes('--ssr'));
  
  return {
    plugins: [
      react(),
      compression({
        algorithm: 'brotliCompress',
        ext: '.br',
        threshold: 1024,
      }),
      compression({
        algorithm: 'gzip',
        ext: '.gz',
        threshold: 1024,
      }),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
        manifest: {
          name: 'Kolte Patil Life Republic Official',
          short_name: 'Life Republic',
          description: 'Official portal for Kolte Patil Life Republic Hinjewadi Township.',
          theme_color: '#1a1a1a',
          background_color: '#ffffff',
          display: 'standalone',
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,avif}'],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/tjgrjtdudzupmzkmjfiu\.supabase\.co\/storage\/v1\/object\/public\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'supabase-images',
                expiration: {
                  maxEntries: 100,
                  maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            }
          ]
        }
      })
    ],
    ssr: {
      noExternal: ['react-helmet-async', 'react-router-dom', 'react-router', 'lucide-react', 'framer-motion'],
    },
    build: {
      target: 'esnext',
      minify: 'terser' as const,
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      rollupOptions: {
        output: isSsr ? {} : {
          manualChunks: {
            'vendor-react': ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
            'vendor-utils': ['@supabase/supabase-js', 'lucide-react', 'lenis'],
            'animations': ['framer-motion'],
            'ui-components': ['swiper'],
            'vendor-maps': ['@react-google-maps/api'],
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        },
      },
      chunkSizeWarningLimit: 1000,
    },
  };
})
