import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useConvexAuth, useQuery, useMutation } from 'convex/react'
import { useEffect, useState } from 'react'
import { api } from '../../../convex/_generated/api'
import { AdminLayout } from '@/components/admin/AdminLayout'

export const Route = createFileRoute('/admin/settings')({
  component: AdminSettingsPage,
})

function AdminSettingsPage() {
  const { isAuthenticated, isLoading: authLoading } = useConvexAuth()
  const navigate = useNavigate()
  const settings = useQuery(api.admin.settings.get)
  const updateSteps = useMutation(api.admin.settings.updateInstallationSteps)
  const updateContactEmail = useMutation(api.admin.settings.updateContactEmail)

  const [steps, setSteps] = useState<string[]>([])
  const [contactEmail, setContactEmail] = useState('')
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate({ to: '/admin/login' })
    }
  }, [isAuthenticated, authLoading, navigate])

  useEffect(() => {
    if (settings && !initialized) {
      setSteps(settings.installationSteps)
      setContactEmail(settings.contactEmail ?? '')
      setInitialized(true)
    }
  }, [settings, initialized])

  if (authLoading || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white font-mono">
        <div className="text-xs tracking-widest">[SYSTEM] LOADING...</div>
      </div>
    )
  }

  const handleSave = async () => {
    await updateSteps({ steps: steps.filter((s) => s.trim()) })
  }

  const handleStepChange = (index: number, value: string) => {
    const newSteps = [...steps]
    newSteps[index] = value
    setSteps(newSteps)
  }

  const addStep = () => setSteps([...steps, ''])

  const removeStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index))
  }

  return (
    <AdminLayout active="settings">
      <h1 className="mb-6 text-sm font-bold tracking-widest">┌─ SETTINGS ─┐</h1>

      <section>
        <h2 className="mb-4 text-xs font-bold tracking-widest text-gray-400">INSTALLATION STEPS</h2>

        <div className="space-y-2">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-2">
              <span className="py-2 text-xs text-gray-500 w-8 text-right">{i + 1}.</span>
              <input
                value={step}
                onChange={(e) => handleStepChange(i, e.target.value)}
                className="flex-1 border border-white bg-black px-3 py-2 text-xs text-white outline-none focus:border-gray-400"
              />
              <button
                onClick={() => removeStep(i)}
                className="text-xs text-red-400 hover:text-red-300 px-2"
              >
                [X]
              </button>
            </div>
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={addStep}
            className="border border-gray-600 px-4 py-2 text-xs tracking-widest text-gray-400 hover:border-white hover:text-white"
          >
            + ADD STEP
          </button>
          <button
            onClick={handleSave}
            className="border border-white bg-white px-4 py-2 text-xs font-bold tracking-widest text-black hover:bg-transparent hover:text-white"
          >
            SAVE
          </button>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-xs font-bold tracking-widest text-gray-400">CONTACT EMAIL</h2>
        <p className="mb-3 text-xs tracking-widest text-gray-500">
          Shown on the INFO page and donations section.
        </p>
        <div className="flex gap-2">
          <input
            type="email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            placeholder="contact@example.com"
            className="flex-1 border border-white bg-black px-3 py-2 text-xs text-white outline-none focus:border-gray-400"
          />
          <button
            onClick={() => updateContactEmail({ contactEmail: contactEmail || undefined })}
            className="border border-white bg-white px-4 py-2 text-xs font-bold tracking-widest text-black hover:bg-transparent hover:text-white"
          >
            SAVE
          </button>
        </div>
      </section>
    </AdminLayout>
  )
}
