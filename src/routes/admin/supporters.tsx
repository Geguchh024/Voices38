import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useConvexAuth, useQuery, useMutation } from 'convex/react'
import { useEffect, useState } from 'react'
import { api } from '../../../convex/_generated/api'
import { AdminLayout } from '@/components/admin/AdminLayout'
import type { Id } from '../../../convex/_generated/dataModel'

export const Route = createFileRoute('/admin/supporters')({
  component: AdminSupportersPage,
})

function AdminSupportersPage() {
  const { isAuthenticated, isLoading: authLoading } = useConvexAuth()
  const navigate = useNavigate()
  const supporters = useQuery(api.admin.supporters.list)
  const createSupporter = useMutation(api.admin.supporters.create)
  const updateSupporter = useMutation(api.admin.supporters.update)
  const removeSupporter = useMutation(api.admin.supporters.remove)
  const [newName, setNewName] = useState('')
  const [editId, setEditId] = useState<Id<"supporters"> | null>(null)
  const [editName, setEditName] = useState('')

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

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newName.trim()) return
    await createSupporter({ name: newName.trim() })
    setNewName('')
  }

  const handleUpdate = async (id: Id<"supporters">) => {
    if (!editName.trim()) return
    await updateSupporter({ id, name: editName.trim() })
    setEditId(null)
    setEditName('')
  }

  const handleDelete = async (id: Id<"supporters">) => {
    if (confirm('DELETE THIS SUPPORTER?')) {
      await removeSupporter({ id })
    }
  }

  return (
    <AdminLayout active="supporters">
      <h1 className="mb-6 text-sm font-bold tracking-widest">┌─ SUPPORTERS ─┐</h1>

      <form onSubmit={handleAdd} className="mb-6 flex gap-2">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="SUPPORTER NAME"
          className="flex-1 border border-white bg-black px-3 py-2 text-xs text-white outline-none focus:border-gray-400"
        />
        <button
          type="submit"
          className="border border-white bg-white px-4 py-2 text-xs font-bold tracking-widest text-black hover:bg-transparent hover:text-white"
        >
          + ADD
        </button>
      </form>

      <div className="space-y-2">
        {supporters?.map((supporter: any) => (
          <div key={supporter._id} className="flex items-center justify-between border-b border-gray-800 py-2">
            {editId === supporter._id ? (
              <div className="flex flex-1 gap-2">
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="flex-1 border border-white bg-black px-2 py-1 text-xs text-white outline-none"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleUpdate(supporter._id)
                    if (e.key === 'Escape') { setEditId(null); setEditName('') }
                  }}
                />
                <button
                  onClick={() => handleUpdate(supporter._id)}
                  className="text-xs text-green-400 hover:text-green-300"
                >
                  [SAVE]
                </button>
                <button
                  onClick={() => { setEditId(null); setEditName('') }}
                  className="text-xs text-gray-400 hover:text-white"
                >
                  [CANCEL]
                </button>
              </div>
            ) : (
              <>
                <span className="text-xs tracking-widest">{supporter.name}</span>
                <div className="space-x-2">
                  <button
                    onClick={() => { setEditId(supporter._id); setEditName(supporter.name) }}
                    className="text-xs text-gray-400 hover:text-white"
                  >
                    [EDIT]
                  </button>
                  <button
                    onClick={() => handleDelete(supporter._id)}
                    className="text-xs text-red-400 hover:text-red-300"
                  >
                    [DEL]
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {supporters && supporters.length === 0 && (
        <p className="mt-4 text-xs tracking-widest text-gray-500">
          [INFO] NO SUPPORTERS YET. ADD ONE ABOVE.
        </p>
      )}
    </AdminLayout>
  )
}
