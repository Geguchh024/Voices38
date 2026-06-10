import { createFileRoute, Link } from '@tanstack/react-router'
import { Layout } from '@/components/Layout'
import { SectionHeading } from '@/components/SectionHeading'

export const Route = createFileRoute('/info')({
  component: InfoPage,
})

function InfoPage() {
  return (
    <Layout activeNav="INFO">
      <SectionHeading title="SYSTEM_INFORMATION" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="terminal-border p-6">
          <h3 className="mb-4 border-b border-white pb-2 text-xl font-bold">SYSTEM_STATUS</h3>
          <ul className="space-y-2 text-xs tracking-widest">
            <li>- TERMINAL: ONLINE</li>
            <li>- ENCRYPTION: AES-256 ACTIVE</li>
            <li>- TUNNEL: SECURE_V38</li>
            <li>- UPTIME: 99.97%</li>
          </ul>
        </div>

        <div className="terminal-border p-6">
          <h3 className="mb-4 border-b border-white pb-2 text-xl font-bold">ENCRYPTION_KEY</h3>
          <p className="mb-4 text-xs tracking-wide">
            Public key fingerprint for secure communications with the VOICES38 terminal.
          </p>
          <code className="block break-all border border-white/20 p-2 text-xs">
            SHA256:E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855
          </code>
        </div>

        <div className="terminal-border p-6 md:col-span-2">
          <h3 className="mb-4 border-b border-white pb-2 text-xl font-bold">PROTOCOL_V3</h3>
          <p className="mb-4 text-sm leading-relaxed tracking-wide">
            VOICES38 is an independent game design portfolio presented through a retro-terminal
            interface. This site showcases released games, work-in-progress projects, and
            development notes — built with TanStack Router and TanStack Query.
          </p>
          <Link
            to="/"
            className="inline-block border border-white bg-white px-4 py-2 text-xs font-bold text-black hover:bg-transparent hover:text-white"
          >
            RETURN_TO_RELEASES
          </Link>
        </div>
      </div>
    </Layout>
  )
}
