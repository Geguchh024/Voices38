import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useConvexAuth, useQuery } from 'convex/react'
import { useEffect } from 'react'
import { api } from '../../../convex/_generated/api'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { StatCard } from '@/components/admin/StatCard'

export const Route = createFileRoute('/admin/')({
  component: AdminDashboard,
})

function AdminDashboard() {
  const { isAuthenticated, isLoading } = useConvexAuth()
  const navigate = useNavigate()
  const stats = useQuery(api.portfolio.getStats)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate({ to: '/admin/login' })
    }
  }, [isAuthenticated, isLoading, navigate])

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white font-mono">
        <div className="text-xs tracking-widest">[SYSTEM] LOADING...</div>
      </div>
    )
  }

  return (
    <AdminLayout active="overview">
      <h1 className="mb-6 text-sm font-bold tracking-widest">
        ┌─ DASHBOARD OVERVIEW ─┐
      </h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard label="TOTAL_RELEASES" value={stats?.totalReleases ?? 0} />
        <StatCard label="FEATURED" value={stats?.featuredReleases ?? 0} />
        <StatCard label="ACTIVE_PROJECTS" value={stats?.activeProjects ?? 0} />
        <StatCard label="SUPPORTERS" value={stats?.supporters ?? 0} />
        <StatCard label="CRYPTO_WALLETS" value={stats?.wallets ?? 0} />
      </div>

      <div className="mt-8 terminal-border p-4">
        <p className="text-xs tracking-widest text-gray-400">
          [INFO] SELECT A SECTION FROM THE SIDEBAR TO MANAGE CONTENT.
        </p>
        <p className="mt-2 text-xs tracking-widest text-gray-400">
          [INFO] ALL CHANGES ARE LIVE AND REFLECTED ON THE PUBLIC SITE IN REAL-TIME.
        </p>
      </div>
    </AdminLayout>
  )
}
