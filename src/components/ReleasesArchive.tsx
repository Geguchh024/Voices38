import type { Release } from '@/types/portfolio'
import { ReleaseCard } from './ReleaseCard'

interface ReleasesArchiveProps {
  releases: Release[]
}

export function ReleasesArchive({ releases }: ReleasesArchiveProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {releases.map((release) => (
        <ReleaseCard key={release.id} release={release} />
      ))}
    </div>
  )
}
