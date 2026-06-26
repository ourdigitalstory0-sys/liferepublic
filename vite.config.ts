import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression'
import { VitePWA } from 'vite-plugin-pwa'

/**
 * Sovereign Performance Synthesis v6.0
 * Optimized for <1.5s Load Time & 60fps Velocity
 */

export default defineConfig((env: any) => {
  const isSsr = env.ssrBuild || env.isSsrBuild || (env.command === 'build' && process.argv.includes('--ssr'));
  
  return {
    plugins: [
      react(),
      // Brotli Compression for maximum spatial efficiency
      compression({
        algorithm: 'brotliCompress',
        ext: '.br',
        threshold: 512,
        deleteOriginFile: false
      }),
      // Gzip Fallback for legacy protocol support
      compression({
        algorithm: 'gzip',
        ext: '.gz',
        threshold: 512,
        deleteOriginFile: false
      }),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
        manifest: {
          name: 'Kolte Patil Life Republic Sovereign',
          short_name: 'Life Republic',
          description: 'The definitive architectural monograph of Kolte Patil Life Republic Hinjewadi.',
          theme_color: '#1a1a1a',
          background_color: '#ffffff',
          display: 'standalone',
          icons: [
            { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
            { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' }
          ]
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,avif}'],
          runtimeCaching: [
            {
              // Level 1: Sovereign Spatial Assets (Images) - CacheFirst
              urlPattern: /^https:\/\/tjgrjtdudzupmzkmjfiu\.supabase\.co\/storage\/v1\/object\/public\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'sovereign-spatial-assets',
                expiration: {
                  maxEntries: 400,
                  maxAgeSeconds: 60 * 60 * 24 * 180 // 180 days
                },
                cacheableResponse: { statuses: [0, 200] }
              }
            },
            {
              // Level 2: Dynamic Sector Metadata - StaleWhileRevalidate
              urlPattern: /\/api\/.*\/sectors/i,
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'sovereign-data-registry',
                expiration: {
                  maxEntries: 100,
                  maxAgeSeconds: 60 * 60 * 24 // 24 hours
                }
              }
            },
            {
              // Level 3: Global Font Assets (Google Fonts)
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'sovereign-typography-cache',
                expiration: {
                  maxEntries: 15,
                  maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
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
      cssCodeSplit: true,
      sourcemap: false,
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.info', 'console.debug']
        },
      },
      rollupOptions: {
        output: isSsr ? {} : {
          // Rely on Vite's default chunking strategy to prevent React ESM interop issues
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        },
      },
      chunkSizeWarningLimit: 1500,
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'framer-motion', 'lucide-react']
    }
  };
})
