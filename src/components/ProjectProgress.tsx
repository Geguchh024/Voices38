import type { Project } from '@/types/portfolio'

interface ProjectProgressProps {
  project: Project
}

export function ProjectProgress({ project }: ProjectProgressProps) {
  return (
    <div className="terminal-border bg-[#1b1b1b] p-3 sm:p-4">
      <div className="mb-2 flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
        <div className="text-sm font-bold break-words sm:text-base">{project.name}</div>
        <div className="text-[0.65rem] tracking-wide sm:text-xs sm:tracking-widest">
          VERSION: {project.version}
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <div className="h-4 min-w-0 flex-grow border border-white p-[2px]">
          <div className="h-full bg-white" style={{ width: `${project.progress}%` }} />
        </div>
        <div className="shrink-0 text-[0.65rem] tracking-wide sm:text-xs sm:tracking-widest">
          {project.progress}%
        </div>
      </div>

      <div className="mt-2 text-[0.65rem] tracking-wide text-[#8e9192] sm:text-xs sm:tracking-widest">
        ETA: {project.eta}
      </div>
    </div>
  )
}
