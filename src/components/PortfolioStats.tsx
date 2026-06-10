import type { PortfolioData } from '@/types/portfolio'

interface PortfolioStatsProps {
  data: PortfolioData
}

export function PortfolioStats({ data }: PortfolioStatsProps) {
  const stats = [
    { label: 'ARCHIVE_RELEASES', value: data.archiveReleases.length },
    { label: 'CURRENT_RELEASES', value: data.releases.length },
    { label: 'PROJECTS_ACTIVE', value: data.projects.length },
    { label: 'SUPPORTERS_LOGGED', value: data.supporters.length },
  ]

  return (
    <section className="terminal-border p-6">
      <h3 className="mb-4 border-b border-white pb-2 text-xl font-bold">TERMINAL_STATS</h3>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="border border-white/20 p-4 text-center">
            <p className="mb-2 text-2xl font-bold">{stat.value}</p>
            <p className="text-xs tracking-widest opacity-80">{stat.label}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-center text-xs tracking-widest text-[#8e9192]">
        OPERATIONAL SINCE 1994 — BUILD v1.0
      </p>
    </section>
  )
}
