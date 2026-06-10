import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useConvexAuth, useQuery, useMutation } from 'convex/react'
import { useEffect, useState } from 'react'
import { api } from '../../../convex/_generated/api'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { ReleaseForm } from '@/components/admin/ReleaseForm'
import type { Id } from '../../../convex/_generated/dataModel'

export const Route = createFileRoute('/admin/releases')({
  component: AdminReleasesPage,
})

function AdminReleasesPage() {
  const { isAuthenticated, isLoading: authLoading } = useConvexAuth()
  const navigate = useNavigate()
  const releases = useQuery(api.admin.releases.list)
  const removeRelease = useMutation(api.admin.releases.remove)
  const toggleFeatured = useMutation(api.admin.releases.toggleFeatured)
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<Id<"releases"> | null>(null)

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate({ to: '/admin/login' })
    }
  }, [isAuthenticated, authLoading, navigate])

  if (authLoading || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white font-mono">
        <div className="text-xs tracking-widest">[SYSTEM] LOADING...</div>
      </div>
    )
  }

  const handleDelete = async (id: Id<"releases">) => {
    if (confirm('DELETE THIS RELEASE?')) {
      await removeRelease({ id })
    }
  }

  const editingRelease = editId ? releases?.find((r: any) => r._id === editId) : undefined

  return (
    <AdminLayout active="releases">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-sm font-bold tracking-widest">┌─ RELEASES ─┐</h1>
        <button
          onClick={() => { setEditId(null); setShowForm(true) }}
          className="border border-white bg-white px-4 py-1 text-xs font-bold tracking-widest text-black hover:bg-transparent hover:text-white"
        >
          + NEW
        </button>
      </div>

      {showForm && (
        <ReleaseForm
          release={editingRelease}
          onClose={() => { setShowForm(false); setEditId(null) }}
        />
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-xs tracking-widest">
          <thead>
            <tr className="border-b border-gray-700 text-left text-gray-400">
              <th className="pb-2 pr-4">TITLE</th>
              <th className="pb-2 pr-4">FORMAT</th>
              <th className="pb-2 pr-4">GENRE</th>
              <th className="pb-2 pr-4">FEATURED</th>
              <th className="pb-2">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {releases?.map((release: any) => (
              <tr key={release._id} className="border-b border-gray-800">
                <td className="py-2 pr-4">{release.title}</td>
                <td className="py-2 pr-4">{release.format}</td>
                <td className="py-2 pr-4">{release.genre}</td>
                <td className="py-2 pr-4">
                  <button
                    onClick={() => toggleFeatured({ id: release._id })}
                    className={release.featured ? 'text-green-400' : 'text-gray-600'}
                  >
                    {release.featured ? '[ON]' : '[OFF]'}
                  </button>
                </td>
                <td className="py-2 space-x-2">
                  <button
                    onClick={() => { setEditId(release._id); setShowForm(true) }}
                    className="text-gray-400 hover:text-white"
                  >
                    [EDIT]
                  </button>
                  <button
                    onClick={() => handleDelete(release._id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    [DEL]
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {releases && releases.length === 0 && (
        <p className="mt-4 text-xs tracking-widest text-gray-500">
          [INFO] NO RELEASES FOUND. CREATE ONE ABOVE.
        </p>
      )}
    </AdminLayout>
  )
}
