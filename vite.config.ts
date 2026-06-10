import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = env.VITE_SITE_URL?.replace(/\/$/, '') ?? ''

  return {
  plugins: [
    TanStackRouterVite({ target: 'react', autoCodeSplitting: true }),
    react(),
    tailwindcss(),
    {
      name: 'html-seo-site-url',
      transformIndexHtml(html) {
        if (!siteUrl) {
          return html
        }

        return html
          .replaceAll('content="/og-preview.svg"', `content="${siteUrl}/og-preview.svg"`)
          .replace('href="/"', `href="${siteUrl}/"`)
      },
    },
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  }
})
