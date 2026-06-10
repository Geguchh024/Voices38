import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useConvexAuth, useQuery, useMutation } from 'convex/react'
import { useEffect, useState } from 'react'
import { api } from '../../../convex/_generated/api'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { ProjectForm } from '@/components/admin/ProjectForm'
import type { Id } from '../../../convex/_generated/dataModel'

export const Route = createFileRoute('/admin/projects')({
  component: AdminProjectsPage,
})

function AdminProjectsPage() {
  const { isAuthenticated, isLoading: authLoading } = useConvexAuth()
  const navigate = useNavigate()
  const projects = useQuery(api.admin.projects.list)
  const removeProject = useMutation(api.admin.projects.remove)
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<Id<"projects"> | null>(null)

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

  const handleDelete = async (id: Id<"projects">) => {
    if (confirm('DELETE THIS PROJECT?')) {
      await removeProject({ id })
    }
  }

  const editingProject = editId ? projects?.find((p: any) => p._id === editId) : undefined

  return (
    <AdminLayout active="projects">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-sm font-bold tracking-widest">┌─ PROJECTS ─┐</h1>
        <button
          onClick={() => { setEditId(null); setShowForm(true) }}
          className="border border-white bg-white px-4 py-1 text-xs font-bold tracking-widest text-black hover:bg-transparent hover:text-white"
        >
          + NEW
        </button>
      </div>

      {showForm && (
        <ProjectForm
          project={editingProject}
          onClose={() => { setShowForm(false); setEditId(null) }}
        />
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-xs tracking-widest">
          <thead>
            <tr className="border-b border-gray-700 text-left text-gray-400">
              <th className="pb-2 pr-4">NAME</th>
              <th className="pb-2 pr-4">VERSION</th>
              <th className="pb-2 pr-4">PROGRESS</th>
              <th className="pb-2 pr-4">ETA</th>
              <th className="pb-2">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {projects?.map((project: any) => (
              <tr key={project._id} className="border-b border-gray-800">
                <td className="py-2 pr-4">{project.name}</td>
                <td className="py-2 pr-4">{project.version}</td>
                <td className="py-2 pr-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-24 bg-gray-800">
                      <div
                        className="h-full bg-white"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <span>{project.progress}%</span>
                  </div>
                </td>
                <td className="py-2 pr-4">{project.eta}</td>
                <td className="py-2 space-x-2">
                  <button
                    onClick={() => { setEditId(project._id); setShowForm(true) }}
                    className="text-gray-400 hover:text-white"
                  >
                    [EDIT]
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
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

      {projects && projects.length === 0 && (
        <p className="mt-4 text-xs tracking-widest text-gray-500">
          [INFO] NO PROJECTS FOUND. CREATE ONE ABOVE.
        </p>
      )}
    </AdminLayout>
  )
}
