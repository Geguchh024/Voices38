import { createFileRoute, Outlet } from '@tanstack/react-router'
import { createPageHead } from '@/lib/seo'

export const Route = createFileRoute('/admin')({
  head: () =>
    createPageHead({
      title: 'ADMIN',
      description: 'VOICES38 admin panel.',
      path: '/admin',
      robots: 'noindex, nofollow',
    }),
  component: AdminLayoutRoute,
})

function AdminLayoutRoute() {
  return <Outlet />
}
