import type { Project } from '@/types/portfolio'

interface ProjectProgressProps {
  project: Project
}

export function ProjectProgress({ project }: ProjectProgressProps) {
  return (
    <div className="terminal-border bg-[#1b1b1b] p-4">
      <div className="mb-2 flex flex-col justify-between md:flex-row md:items-center">
        <div className="font-bold">{project.name}</div>
        <div className="text-xs tracking-widest">VERSION: {project.version}</div>
      </div>

      <div className="flex items-center gap-4">
        <div className="h-4 flex-grow border border-white p-[2px]">
          <div className="h-full bg-white" style={{ width: `${project.progress}%` }} />
        </div>
        <div className="text-xs tracking-widest">{project.progress}%</div>
      </div>

      <div className="mt-2 text-xs tracking-widest text-[#8e9192]">ETA: {project.eta}</div>
    </div>
  )
}
