import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Voss Taxi',
        short_name: 'Voss Taxi',
        description: 'Voss Taxi SA - Transport og sightseeing',
        theme_color: '#0b0b09',
        background_color: '#0b0b09',
        display: 'standalone',
        icons: [
          {
            src: '/favicon.svg',
            sizes: '192x192 512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          },
          {
            src: '/favicon.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/portal/, /^\/mrs/, /^\/fliser/],
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,mp4}'],
        maximumFileSizeToCacheInBytes: 5000000
      }
    })
  ],
})
