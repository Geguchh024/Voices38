import { createFileRoute, Link } from '@tanstack/react-router'
import { createPageHead } from '@/lib/seo'
import { Layout } from '@/components/Layout'
import { ReleaseCarousel } from '@/components/ReleaseCarousel'
import { SectionHeading } from '@/components/SectionHeading'
import { ReleaseCard } from '@/components/ReleaseCard'
import { ProjectProgress } from '@/components/ProjectProgress'
import { InstallationManual } from '@/components/InstallationManual'
import { CryptoDonations } from '@/components/CryptoDonations'
import { usePortfolio } from '@/hooks/usePortfolio'

export const Route = createFileRoute('/')({
  head: () =>
    createPageHead({
      title: 'MAIN HUB',
      description:
        'Browse VOICES38 current releases, active development projects, installation notes, and donation info.',
      path: '/',
    }),
  component: HomePage,
})

function HomePage() {
  const { data, isLoading } = usePortfolio()

  if (isLoading || !data) {
    return (
      <Layout activeNav="MAIN">
        <div className="terminal-border p-6 text-xs tracking-widest">
          [SYSTEM] LOADING PORTFOLIO DATA...
        </div>
      </Layout>
    )
  }

  return (
    <Layout activeNav="MAIN">
      <ReleaseCarousel releases={data.releases} />

      <section id="projects" className="mb-8 scroll-mt-[calc(4.5rem+env(safe-area-inset-top))] sm:mb-12 sm:scroll-mt-28">
        <SectionHeading title="PROJECTS_IN_PROGRESS" />
        <div className="space-y-4">
          {data.projects.map((project) => (
            <ProjectProgress key={project.id} project={project} />
          ))}
        </div>
      </section>

      <section id="releases" className="mb-8 scroll-mt-[calc(4.5rem+env(safe-area-inset-top))] sm:mb-12 sm:scroll-mt-28">
        <SectionHeading title="CURRENT_RELEASES" />
        <div className="grid grid-cols-1 items-start gap-4 sm:gap-6 md:grid-cols-2">
          {data.releases.map((release) => (
            <ReleaseCard key={release.id} release={release} />
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <Link
            to="/releases"
            className="inline-flex min-h-11 touch-manipulation items-center border border-white bg-white px-5 py-2.5 text-xs font-bold tracking-wide text-black hover:bg-transparent hover:text-white sm:px-6 sm:tracking-widest"
          >
            LOAD_MORE.EXE
          </Link>
        </div>
      </section>

      <section className="space-y-6">
        <InstallationManual steps={data.installationSteps} />
        <CryptoDonations
          notes={data.notes}
          wallets={data.cryptoWallets}
          contactEmail={data.contactEmail}
        />
      </section>
    </Layout>
  )
}
