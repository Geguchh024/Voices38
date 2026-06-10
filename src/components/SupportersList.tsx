import type { Supporter } from '@/types/portfolio'

interface SupportersListProps {
  supporters: Supporter[]
}

export function SupportersList({ supporters }: SupportersListProps) {
  return (
    <div className="terminal-border p-6">
      <h3 className="mb-4 border-b border-white pb-2 text-xl font-bold">
        SUPPORTERS_SINCE_LAST
      </h3>
      <div className="grid grid-cols-2 gap-2 text-xs tracking-widest">
        {supporters.map((supporter) => (
          <div key={supporter.name}>- {supporter.name}</div>
        ))}
      </div>
    </div>
  )
}
