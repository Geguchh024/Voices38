import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { ConvexReactClient } from 'convex/react'
import { ConvexAuthProvider } from '@convex-dev/auth/react'
import { routeTree } from './routeTree.gen'
import './index.css'

const convexUrl = import.meta.env.VITE_CONVEX_URL

if (!convexUrl) {
  throw new Error(
    'Missing VITE_CONVEX_URL. For production, set it in .env.production before building. ' +
      'For local dev, run `npx convex dev` to populate .env.local. ' +
      'See https://docs.convex.dev/production/hosting/',
  )
}

const convex = new ConvexReactClient(convexUrl)

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConvexAuthProvider client={convex}>
      <RouterProvider router={router} />
    </ConvexAuthProvider>
  </StrictMode>,
)
