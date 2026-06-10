import { createFileRoute, Link } from '@tanstack/react-router'
import { createPageHead } from '@/lib/seo'
import { Layout } from '@/components/Layout'
import { SectionHeading } from '@/components/SectionHeading'
import { ReleasesArchive } from '@/components/ReleasesArchive'
import { usePortfolio } from '@/hooks/usePortfolio'

export const Route = createFileRoute('/releases')({
  head: () =>
    createPageHead({
      title: 'RELEASE ARCHIVE',
      description: 'Full VOICES38 release archive with downloadable game catalog entries.',
      path: '/releases',
    }),
  component: ReleasesPage,
})

function ReleasesPage() {
  const { data, isLoading } = usePortfolio()

  if (isLoading || !data) {
    return (
      <Layout activeNav="RELEASE_ARCHIVE">
        <div className="terminal-border p-6 text-xs tracking-widest">
          [SYSTEM] LOADING RELEASE ARCHIVE...
        </div>
      </Layout>
    )
  }

  return (
    <Layout activeNav="RELEASE_ARCHIVE">
      <SectionHeading title="RELEASE_ARCHIVE" />

      <p className="mb-6 text-sm tracking-wide">
        Full catalog of VOICES38 releases. All archived entries are listed below.
      </p>

      <ReleasesArchive releases={data.archiveReleases} />

      <div className="mt-8 flex justify-center">
        <Link
          to="/"
          className="border border-white px-6 py-2 text-xs font-bold tracking-widest hover:bg-white hover:text-black"
        >
          &lt; RETURN_TO_HUB
        </Link>
      </div>
    </Layout>
  )
}
