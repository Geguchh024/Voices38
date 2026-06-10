import type { Release } from '@/types/portfolio'

interface ReleaseCardProps {
  release: Release
}

export function ReleaseCard({ release }: ReleaseCardProps) {
  return (
    <div className="terminal-border group p-4 transition-colors hover:bg-white hover:text-black">
      <div className="mb-4 flex items-start justify-between">
        <div className="font-bold">{release.title}</div>
        <div className="text-xs">[{release.format}]</div>
      </div>

      <div className="mb-6 space-y-1 text-sm tracking-widest opacity-80">
        <p>RELEASE DATE: {release.releaseDate}</p>
        <p>GENRE: {release.genre}</p>
        <p>PROTECTION: {release.protection}</p>
      </div>

      <a
        href={release.downloadUrl ?? '#'}
        className="flex w-full items-center justify-center gap-2 border border-current py-2 font-bold transition-all group-hover:bg-black group-hover:text-white"
      >
        <DownloadIcon />
        DOWNLOAD.EXE
      </a>
    </div>
  )
}

function DownloadIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M12 16l-5-5h3V4h4v7h3l-5 5zm-7 4h14v2H5v-2z" />
    </svg>
  )
}
