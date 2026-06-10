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
    <div className="terminal-border p-6">
      <div className="mb-8 text-center">
        <div className="inline-block border-x-4 border-white px-8 py-2">
          <h2 className="text-2xl font-bold tracking-[0.2em]">NOTES</h2>
        </div>
      </div>

      <p className="mb-6 text-sm leading-relaxed tracking-wide">{notes}</p>

      {contactEmail && (
        <p className="mb-6 text-sm tracking-widest">
          CONTACT:{' '}
          <a href={`mailto:${contactEmail}`} className="underline hover:opacity-70">
            {contactEmail}
          </a>
        </p>
      )}

      <div className="space-y-6 text-xs tracking-widest">
        {wallets.map((wallet) => (
          <div key={wallet.symbol} className="group">
            <div className="mb-1 flex items-center gap-2">
              <span className="bg-white px-1 font-bold text-black">{wallet.symbol}</span>
              <div className="h-px flex-grow bg-white opacity-30" />
            </div>
            <button
              type="button"
              onClick={() => copyAddress(wallet.address)}
              className="w-full cursor-pointer break-all border border-white/20 p-2 text-left transition-colors group-hover:border-white"
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
