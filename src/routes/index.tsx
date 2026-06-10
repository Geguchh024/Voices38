import { createFileRoute } from '@tanstack/react-router'
import { Layout } from '@/components/Layout'
import { Hero } from '@/components/Hero'
import { SectionHeading } from '@/components/SectionHeading'
import { ReleaseCard } from '@/components/ReleaseCard'
import { ProjectProgress } from '@/components/ProjectProgress'
import { InstallationManual } from '@/components/InstallationManual'
import { SupportersList } from '@/components/SupportersList'
import { CryptoDonations } from '@/components/CryptoDonations'
import { IsoDetails } from '@/components/IsoDetails'
import { usePortfolio } from '@/hooks/usePortfolio'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  const { data, isLoading, isError } = usePortfolio()

  if (isLoading) {
    return (
      <Layout activeNav="RELEASES">
        <div className="terminal-border p-6 text-xs tracking-widest">
          [SYSTEM] LOADING PORTFOLIO DATA...
        </div>
      </Layout>
    )
  }

  if (isError || !data) {
    return (
      <Layout activeNav="RELEASES">
        <div className="terminal-border p-6 text-xs tracking-widest">
          [ERROR] FAILED TO LOAD PORTFOLIO DATA. RETRY CONNECTION.
        </div>
      </Layout>
    )
  }

  return (
    <Layout activeNav="RELEASES">
      <Hero />

      <section id="releases" className="mb-12 scroll-mt-28">
        <SectionHeading title="CURRENT_RELEASES" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {data.releases.map((release) => (
            <ReleaseCard key={release.id} release={release} />
          ))}
        </div>
      </section>

      <section id="projects" className="mb-12 scroll-mt-28">
        <SectionHeading title="PROJECTS_IN_PROGRESS" />
        <div className="space-y-4">
          {data.projects.map((project) => (
            <ProjectProgress key={project.id} project={project} />
          ))}
        </div>
      </section>

      <section className="mb-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div id="info" className="space-y-6 scroll-mt-28">
          <InstallationManual steps={data.installationSteps} note={data.installationNote} />
          <SupportersList supporters={data.supporters} />
        </div>

        <div id="crypto" className="scroll-mt-28">
          <CryptoDonations notes={data.notes} wallets={data.cryptoWallets} />
        </div>
      </section>

      <IsoDetails isoImage={data.isoImage} blake3Hash={data.blake3Hash} />
    </Layout>
  )
}
