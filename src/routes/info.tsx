import { createFileRoute } from '@tanstack/react-router'
import { createPageHead } from '@/lib/seo'
import { Layout } from '@/components/Layout'
import { SectionHeading } from '@/components/SectionHeading'
import { SupportersList } from '@/components/SupportersList'
import { usePortfolio } from '@/hooks/usePortfolio'

export const Route = createFileRoute('/info')({
  head: () =>
    createPageHead({
      title: 'INFO',
      description: 'VOICES38 supporters and contact information.',
      path: '/info',
    }),
  component: InfoPage,
})

function InfoPage() {
  const { data, isLoading } = usePortfolio()

  if (isLoading || !data) {
    return (
      <Layout activeNav="INFO">
        <div className="terminal-border p-6 text-xs tracking-widest">
          [SYSTEM] LOADING INFO DATA...
        </div>
      </Layout>
    )
  }

  return (
    <Layout activeNav="INFO">
      <SectionHeading title="INFO" />

      <div className="space-y-6">
        <SupportersList supporters={data.supporters} contactEmail={data.contactEmail} />
      </div>
    </Layout>
  )
}
