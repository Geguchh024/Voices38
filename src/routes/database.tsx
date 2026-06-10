import { createFileRoute } from '@tanstack/react-router'
import { Layout } from '@/components/Layout'
import { SectionHeading } from '@/components/SectionHeading'
import { usePortfolio } from '@/hooks/usePortfolio'

export const Route = createFileRoute('/database')({
  component: DatabasePage,
})

function DatabasePage() {
  const { data, isLoading } = usePortfolio()

  return (
    <Layout activeNav="DATABASE">
      <SectionHeading title="GAME_DATABASE" />

      <div className="terminal-border p-6">
        <p className="mb-6 text-sm tracking-wide">
          Indexed catalog of all VOICES38 game design entries. Query the archive for
          releases, prototypes, and archived builds.
        </p>

        {isLoading ? (
          <p className="text-xs tracking-widest">[SYSTEM] SCANNING DATABASE...</p>
        ) : (
          <div className="space-y-2 font-mono text-xs tracking-widest">
            {data?.releases.map((release, index) => (
              <div
                key={release.id}
                className="flex flex-col gap-1 border border-white/20 p-3 md:flex-row md:items-center md:justify-between"
              >
                <span>
                  [{String(index + 1).padStart(3, '0')}] {release.title}
                </span>
                <span className="text-[#8e9192]">
                  {release.genre} | {release.format} | {release.releaseDate}
                </span>
              </div>
            ))}
            {data?.projects.map((project, index) => (
              <div
                key={project.id}
                className="flex flex-col gap-1 border border-dashed border-white/20 p-3 md:flex-row md:items-center md:justify-between"
              >
                <span>
                  [WIP-{String(index + 1).padStart(2, '0')}] {project.name}
                </span>
                <span className="text-[#8e9192]">
                  {project.version} | {project.progress}% | ETA {project.eta}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}
