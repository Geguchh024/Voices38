import { createRootRoute, HeadContent, Outlet } from '@tanstack/react-router'
import { createPageHead, siteConfig } from '@/lib/seo'

export const Route = createRootRoute({
  head: () =>
    createPageHead({
      title: siteConfig.defaultTitle,
      description: siteConfig.defaultDescription,
      path: '/',
    }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <HeadContent />
      <Outlet />
    </>
  )
}
