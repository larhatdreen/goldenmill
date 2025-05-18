import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import viteCompression from 'vite-plugin-compression';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode, command }) => ({
  plugins: [
    react(),
    viteCompression({
      verbose: true,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }),
    viteCompression({
      verbose: true,
      threshold: 10240,
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico',
        'apple-touch-icon.png',
        'masked-icon.svg',
        'robots.txt',
        'sitemap.xml',
        'site.webmanifest',
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
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
        navigateFallback: 'index.html',
        navigateFallbackDenylist: [/^\/robots\.txt$/, /^\/sitemap\.xml$/],
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
        runtimeCaching: [
          {
            urlPattern: /^\/robots\.txt$/,
            handler: 'NetworkOnly',
          },
          {
            urlPattern: /^\/sitemap\.xml$/,
            handler: 'NetworkOnly',
          },
          {
            urlPattern: /^https:\/\/api\./i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 24 * 60 * 60 // 24 hours
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ],
      },
    }),
  ],
  css: {
    postcss: './postcss.config.cjs',
  },
  assetsInclude: ['**/*.webp'],
  build: {
    target: 'esnext',
    minify: 'terser',
    sourcemap: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        ...(process.env.SSR && {
          server: path.resolve(__dirname, 'src/entry-server.tsx'),
        }),
      },
      output: {
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || '';
          if (/\.(png|jpe?g|gif|svg|webp)$/i.test(name)) {
            return `assets/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        ...(!(command === 'build' && process.argv.includes('--ssr')) && {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
            ui: ['@mui/material', '@emotion/react'],
            i18n: ['i18next', 'react-i18next'],
          }
        })
      },
    },
  },
  server: {
    host: '0.0.0.0',
    open: true,
    cors: true,
    port: 3000,
    proxy: {
      '/': {
        target: process.env.NODE_ENV === 'production' ? 'https://goldenmill.de' : 'http://localhost:3005',
        changeOrigin: true,
        secure: false
      },
      '/api': {
        target: process.env.NODE_ENV === 'production' ? 'https://goldenmill.de' : 'http://localhost:3002',
        changeOrigin: true,
        secure: false
      },
      '/img': {
        target: process.env.NODE_ENV === 'production' ? 'https://goldenmill.de' : 'http://localhost:3002',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/img/, '/img/products')
      },
    },
    allowedHosts: ['goldenmill.de']
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
      include: ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
    },
  },
}));