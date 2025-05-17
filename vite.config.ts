import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import viteCompression from 'vite-plugin-compression'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico', 
        'apple-touch-icon.png', 
        'masked-icon.svg',
        'robots.txt',
        'sitemap.xml',
        'site.webmanifest'
      ],
      manifest: {
        name: 'GoldenMill',
        short_name: 'GoldenMill',
        description: 'GoldenMill Application',
        theme_color: '#ffffff',
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
        maximumFileSizeToCacheInBytes: 7 * 1024 * 1024, // 7MB
        // Исключаем robots.txt и sitemap.xml из кэширования Service Worker
        navigateFallbackDenylist: [/^\/robots\.txt$/, /^\/sitemap\.xml$/],
        // Не перехватываем запросы к статическим файлам
        navigateFallback: null,
        // Дополнительные настройки для статических файлов
        runtimeCaching: [
          {
            urlPattern: /^\/robots\.txt$/,
            handler: 'NetworkOnly',
          },
          {
            urlPattern: /^\/sitemap\.xml$/,
            handler: 'NetworkOnly',
          }
        ]
      }
    })
  ],
  css: {
    postcss: './postcss.config.cjs'
  },
  // Добавляем WebP в список ассетов для обработки
  assetsInclude: ['**/*.webp'],
  build: {
    target: 'esnext',
    minify: 'terser',
    cssMinify: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        server: path.resolve(__dirname, 'src/entry-server.tsx')
      },
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@mui/material', '@emotion/react'],
        },
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || '';
          const info = name.split('.');
          const ext = info[info.length - 1];
          if (/\.(png|jpe?g|gif|svg|webp)$/i.test(name)) {
            return `assets/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: true,
  },
  server: {
    host: '0.0.0.0',
    open: true,
    cors: true,
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3002',
        changeOrigin: true,
      },
      '/img': {
        target: 'http://localhost:3002',
        changeOrigin: true,
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  ssr: {
    noExternal: ['react-helmet-async'],
    target: 'node',
    format: 'esm',
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom', 'react-helmet-async']
    }
  },
})
