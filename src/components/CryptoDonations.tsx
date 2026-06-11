import type { CryptoWallet } from '@/types/portfolio'

interface CryptoDonationsProps {
  notes: string
  wallets: CryptoWallet[]
  contactEmail?: string
}

export function CryptoDonations({ notes, wallets, contactEmail }: CryptoDonationsProps) {
  const copyAddress = async (address: string) => {
    await navigator.clipboard.writeText(address)
  }

  return (
    <div className="terminal-border p-3 sm:p-6">
      <div className="mb-6 text-center sm:mb-8">
        <div className="inline-block border-x-2 border-white px-4 py-2 sm:border-x-4 sm:px-8">
          <h2 className="text-lg font-bold tracking-[0.1em] sm:text-2xl sm:tracking-[0.2em]">
            NOTES
          </h2>
        </div>
      </div>

      <p className="mb-4 text-xs leading-relaxed tracking-wide sm:mb-6 sm:text-sm">{notes}</p>

      {contactEmail && (
        <p className="mb-4 text-xs tracking-wide break-all sm:mb-6 sm:text-sm sm:tracking-widest">
          CONTACT:{' '}
          <a href={`mailto:${contactEmail}`} className="underline hover:opacity-70">
            {contactEmail}
          </a>
        </p>
      )}

      <div className="space-y-4 text-[0.65rem] tracking-wide sm:space-y-6 sm:text-xs sm:tracking-widest">
        {wallets.map((wallet) => (
          <div key={wallet.symbol} className="group">
            <div className="mb-1 flex items-center gap-2">
              <span className="bg-white px-1 font-bold text-black">{wallet.symbol}</span>
              <div className="h-px flex-grow bg-white opacity-30" />
            </div>
            <button
              type="button"
              onClick={() => copyAddress(wallet.address)}
              className="min-h-11 w-full touch-manipulation cursor-pointer break-all border border-white/20 p-2.5 text-left text-[0.65rem] transition-colors group-hover:border-white sm:p-2 sm:text-xs"
              title="Click to copy"
            >
              {wallet.address}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
