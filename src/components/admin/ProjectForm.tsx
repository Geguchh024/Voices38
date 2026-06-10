import { useState } from 'react'
import { useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import type { Id } from '../../../convex/_generated/dataModel'

interface ProjectFormProps {
  project?: {
    _id: Id<"projects">
    slug: string
    name: string
    version: string
    progress: number
    eta: string
  }
  onClose: () => void
}

export function ProjectForm({ project, onClose }: ProjectFormProps) {
  const createProject = useMutation(api.admin.projects.create)
  const updateProject = useMutation(api.admin.projects.update)

  const [slug, setSlug] = useState(project?.slug ?? '')
  const [name, setName] = useState(project?.name ?? '')
  const [version, setVersion] = useState(project?.version ?? '')
  const [progress, setProgress] = useState(project?.progress ?? 0)
  const [eta, setEta] = useState(project?.eta ?? '')
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setPending(true)

    try {
      if (project) {
        await updateProject({
          id: project._id,
          slug,
          name,
          version,
          progress,
          eta,
        })
      } else {
        await createProject({ slug, name, version, progress, eta })
      }
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Operation failed')
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="mb-6 terminal-border p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xs font-bold tracking-widest">
          {project ? 'EDIT PROJECT' : 'NEW PROJECT'}
        </h2>
        <button onClick={onClose} className="text-xs text-gray-400 hover:text-white">
          [CLOSE]
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="block text-xs text-gray-400 mb-1">SLUG</label>
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            disabled={!!project}
            className="w-full border border-gray-700 bg-black px-2 py-1.5 text-xs text-white outline-none focus:border-white disabled:opacity-50"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">NAME</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-gray-700 bg-black px-2 py-1.5 text-xs text-white outline-none focus:border-white"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">VERSION</label>
          <input
            value={version}
            onChange={(e) => setVersion(e.target.value)}
            required
            className="w-full border border-gray-700 bg-black px-2 py-1.5 text-xs text-white outline-none focus:border-white"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">ETA (ISO DATE)</label>
          <input
            value={eta}
            onChange={(e) => setEta(e.target.value)}
            required
            placeholder="2026-12-01"
            className="w-full border border-gray-700 bg-black px-2 py-1.5 text-xs text-white outline-none focus:border-white"
          />
        </div>
        <div className="col-span-full">
          <label className="block text-xs text-gray-400 mb-1">
            PROGRESS: {progress}%
          </label>
          <input
            type="range"
            min={0}
            max={100}
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            className="w-full accent-white"
          />
          <div className="mt-1 h-2 w-full bg-gray-800">
            <div className="h-full bg-white" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {error && (
          <div className="col-span-full text-xs text-red-400">
            [ERROR] {error.toUpperCase()}
          </div>
        )}

        <div className="col-span-full flex gap-2 mt-2">
          <button
            type="submit"
            disabled={pending}
            className="border border-white bg-white px-4 py-2 text-xs font-bold tracking-widest text-black hover:bg-transparent hover:text-white disabled:opacity-50"
          >
            {pending ? 'SAVING...' : project ? 'UPDATE' : 'CREATE'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="border border-gray-600 px-4 py-2 text-xs tracking-widest text-gray-400 hover:text-white"
          >
            CANCEL
          </button>
        </div>
      </form>
    </div>
  )
}
