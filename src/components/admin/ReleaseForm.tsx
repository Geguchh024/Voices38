import { useState } from 'react'
import { useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import type { Id } from '../../../convex/_generated/dataModel'

interface ReleaseFormProps {
  release?: {
    _id: Id<"releases">
    slug: string
    title: string
    format: string
    releaseDate: string
    genre: string
    protection: string
    downloadUrl?: string
    featured: boolean
  }
  onClose: () => void
}

export function ReleaseForm({ release, onClose }: ReleaseFormProps) {
  const createRelease = useMutation(api.admin.releases.create)
  const updateRelease = useMutation(api.admin.releases.update)

  const [slug, setSlug] = useState(release?.slug ?? '')
  const [title, setTitle] = useState(release?.title ?? '')
  const [format, setFormat] = useState(release?.format ?? 'ISO')
  const [releaseDate, setReleaseDate] = useState(release?.releaseDate ?? '')
  const [genre, setGenre] = useState(release?.genre ?? '')
  const [protection, setProtection] = useState(release?.protection ?? '')
  const [downloadUrl, setDownloadUrl] = useState(release?.downloadUrl ?? '')
  const [featured, setFeatured] = useState(release?.featured ?? false)
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setPending(true)

    try {
      if (release) {
        await updateRelease({
          id: release._id,
          slug,
          title,
          format,
          releaseDate,
          genre,
          protection,
          downloadUrl: downloadUrl || undefined,
          featured,
        })
      } else {
        await createRelease({
          slug,
          title,
          format,
          releaseDate,
          genre,
          protection,
          downloadUrl: downloadUrl || undefined,
          featured,
        })
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
          {release ? 'EDIT RELEASE' : 'NEW RELEASE'}
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
            disabled={!!release}
            className="w-full border border-gray-700 bg-black px-2 py-1.5 text-xs text-white outline-none focus:border-white disabled:opacity-50"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">TITLE</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border border-gray-700 bg-black px-2 py-1.5 text-xs text-white outline-none focus:border-white"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">FORMAT</label>
          <input
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            required
            className="w-full border border-gray-700 bg-black px-2 py-1.5 text-xs text-white outline-none focus:border-white"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">RELEASE DATE</label>
          <input
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            required
            placeholder="MM/DD/YYYY"
            className="w-full border border-gray-700 bg-black px-2 py-1.5 text-xs text-white outline-none focus:border-white"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">GENRE</label>
          <input
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
            className="w-full border border-gray-700 bg-black px-2 py-1.5 text-xs text-white outline-none focus:border-white"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">PROTECTION</label>
          <input
            value={protection}
            onChange={(e) => setProtection(e.target.value)}
            required
            className="w-full border border-gray-700 bg-black px-2 py-1.5 text-xs text-white outline-none focus:border-white"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">DOWNLOAD URL</label>
          <input
            value={downloadUrl}
            onChange={(e) => setDownloadUrl(e.target.value)}
            placeholder="(optional)"
            className="w-full border border-gray-700 bg-black px-2 py-1.5 text-xs text-white outline-none focus:border-white"
          />
        </div>
        <div className="flex items-center gap-2 pt-5">
          <label className="text-xs text-gray-400">FEATURED:</label>
          <button
            type="button"
            onClick={() => setFeatured(!featured)}
            className={featured ? 'text-xs text-green-400' : 'text-xs text-gray-600'}
          >
            {featured ? '[ON]' : '[OFF]'}
          </button>
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
            {pending ? 'SAVING...' : release ? 'UPDATE' : 'CREATE'}
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
