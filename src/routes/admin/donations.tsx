import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useConvexAuth, useQuery, useMutation } from 'convex/react'
import { useEffect, useState } from 'react'
import { api } from '../../../convex/_generated/api'
import { AdminLayout } from '@/components/admin/AdminLayout'
import type { Id } from '../../../convex/_generated/dataModel'

export const Route = createFileRoute('/admin/donations')({
  component: AdminDonationsPage,
})

function AdminDonationsPage() {
  const { isAuthenticated, isLoading: authLoading } = useConvexAuth()
  const navigate = useNavigate()
  const data = useQuery(api.admin.donations.list)
  const upsertWallet = useMutation(api.admin.donations.upsertWallet)
  const removeWallet = useMutation(api.admin.donations.removeWallet)
  const updateNotes = useMutation(api.admin.donations.updateNotes)

  const [symbol, setSymbol] = useState('')
  const [address, setAddress] = useState('')
  const [editId, setEditId] = useState<Id<"cryptoWallets"> | null>(null)
  const [notes, setNotes] = useState('')
  const [notesInitialized, setNotesInitialized] = useState(false)

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate({ to: '/admin/login' })
    }
  }, [isAuthenticated, authLoading, navigate])

  useEffect(() => {
    if (data && !notesInitialized) {
      setNotes(data.notes)
      setNotesInitialized(true)
    }
  }, [data, notesInitialized])

  if (authLoading || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white font-mono">
        <div className="text-xs tracking-widest">[SYSTEM] LOADING...</div>
      </div>
    )
  }

  const handleAddWallet = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!symbol.trim() || !address.trim()) return
    await upsertWallet({
      id: editId ?? undefined,
      symbol: symbol.trim().toUpperCase(),
      address: address.trim(),
    })
    setSymbol('')
    setAddress('')
    setEditId(null)
  }

  const handleEdit = (wallet: { _id: Id<"cryptoWallets">; symbol: string; address: string }) => {
    setEditId(wallet._id)
    setSymbol(wallet.symbol)
    setAddress(wallet.address)
  }

  const handleDelete = async (id: Id<"cryptoWallets">) => {
    if (confirm('DELETE THIS WALLET?')) {
      await removeWallet({ id })
    }
  }

  const handleSaveNotes = async () => {
    await updateNotes({ notes })
  }

  return (
    <AdminLayout active="donations">
      <h1 className="mb-6 text-sm font-bold tracking-widest">┌─ DONATIONS ─┐</h1>

      <section className="mb-8">
        <h2 className="mb-4 text-xs font-bold tracking-widest text-gray-400">CRYPTO WALLETS</h2>

        <form onSubmit={handleAddWallet} className="mb-4 flex gap-2">
          <input
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            placeholder="SYMBOL (BTC)"
            className="w-24 border border-white bg-black px-2 py-2 text-xs text-white outline-none focus:border-gray-400"
          />
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="WALLET ADDRESS"
            className="flex-1 border border-white bg-black px-2 py-2 text-xs text-white outline-none focus:border-gray-400"
          />
          <button
            type="submit"
            className="border border-white bg-white px-4 py-2 text-xs font-bold tracking-widest text-black hover:bg-transparent hover:text-white"
          >
            {editId ? 'UPDATE' : '+ ADD'}
          </button>
          {editId && (
            <button
              type="button"
              onClick={() => { setEditId(null); setSymbol(''); setAddress('') }}
              className="border border-gray-600 px-3 py-2 text-xs text-gray-400 hover:text-white"
            >
              CANCEL
            </button>
          )}
        </form>

        <div className="space-y-2">
          {data?.wallets.map((wallet: any) => (
            <div key={wallet._id} className="flex items-center justify-between border-b border-gray-800 py-2">
              <div className="text-xs tracking-widest">
                <span className="text-gray-400">{wallet.symbol}:</span>{' '}
                <span className="break-all">{wallet.address}</span>
              </div>
              <div className="space-x-2 shrink-0 ml-4">
                <button
                  onClick={() => handleEdit(wallet)}
                  className="text-xs text-gray-400 hover:text-white"
                >
                  [EDIT]
                </button>
                <button
                  onClick={() => handleDelete(wallet._id)}
                  className="text-xs text-red-400 hover:text-red-300"
                >
                  [DEL]
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xs font-bold tracking-widest text-gray-400">DONATION NOTES</h2>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          className="w-full border border-white bg-black px-3 py-2 text-xs text-white outline-none focus:border-gray-400 resize-none"
        />
        <button
          onClick={handleSaveNotes}
          className="mt-2 border border-white bg-white px-4 py-2 text-xs font-bold tracking-widest text-black hover:bg-transparent hover:text-white"
        >
          SAVE NOTES
        </button>
      </section>
    </AdminLayout>
  )
}
