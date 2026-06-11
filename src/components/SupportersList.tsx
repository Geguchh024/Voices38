import type { Supporter } from '@/types/portfolio'

interface SupportersListProps {
  supporters: Supporter[]
  contactEmail?: string
}

export function SupportersList({ supporters, contactEmail }: SupportersListProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="terminal-border p-3 sm:p-6">
        <h3 className="mb-3 border-b border-white pb-2 text-base font-bold sm:mb-4 sm:text-xl">
          SUPPORTERS_SINCE_LAST
        </h3>
        <div className="grid grid-cols-1 gap-1 text-[0.65rem] tracking-wide min-[400px]:grid-cols-2 sm:gap-2 sm:text-xs sm:tracking-widest">
          {supporters.map((supporter) => (
            <div key={supporter.name} className="break-words">
              - {supporter.name}
            </div>
          ))}
        </div>
      </div>

      {contactEmail && (
        <div className="terminal-border p-3 sm:p-6">
          <h3 className="mb-3 border-b border-white pb-2 text-base font-bold sm:mb-4 sm:text-xl">
            CONTACT
          </h3>
          <p className="text-xs tracking-wide break-all sm:text-sm sm:tracking-widest">
            EMAIL:{' '}
            <a href={`mailto:${contactEmail}`} className="underline hover:opacity-70">
              {contactEmail}
            </a>
          </p>
        </div>
      )}
    </div>
  )
}
