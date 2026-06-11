import type { Release } from '@/types/portfolio'

interface ReleaseCardProps {
  release: Release
}

export function ReleaseCard({ release }: ReleaseCardProps) {
  return (
    <div className="terminal-border group h-fit self-start p-3 transition-colors sm:p-4 hover:bg-white hover:text-black">
      <div className="mb-3 flex items-start justify-between gap-2 sm:mb-4 sm:gap-4">
        <div className="min-w-0 text-sm font-bold break-words sm:text-base">{release.title}</div>
        <div className="shrink-0 text-[0.65rem] sm:text-xs">[{release.format}]</div>
      </div>

      <div className="mb-3 space-y-0.5 text-xs tracking-wide opacity-80 sm:mb-4 sm:space-y-1 sm:text-sm sm:tracking-widest">
        <p>RELEASE DATE: {release.releaseDate}</p>
        {release.crackDate && <p>CRACK DATE: {release.crackDate}</p>}
        {release.developer && <p>DEVELOPER: {release.developer}</p>}
        <p>GENRE: {release.genre}</p>
        <p>PROTECTION: {release.protection}</p>
      </div>

      {release.installNote && (
        <p className="mb-3 text-[0.65rem] leading-relaxed tracking-wide text-yellow-300 sm:mb-4 sm:text-xs sm:tracking-widest group-hover:text-yellow-700">
          [NOTE] {release.installNote}
        </p>
      )}

      <a
        href={release.downloadUrl ?? '#'}
        className="flex min-h-11 w-full touch-manipulation items-center justify-center gap-2 border border-current py-2.5 text-xs font-bold sm:py-2 sm:text-sm transition-all group-hover:bg-black group-hover:text-white"
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
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <path d="M12 16l-5-5h3V4h4v7h3l-5 5zm-7 4h14v2H5v-2z" />
    </svg>
  )
}
