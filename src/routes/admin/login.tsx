import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useAuthActions } from '@convex-dev/auth/react'
import { useConvexAuth } from 'convex/react'
import { useState, useEffect } from 'react'

export const Route = createFileRoute('/admin/login')({
  component: AdminLoginPage,
})

function formatAuthError(message: string): string {
  switch (message) {
    case 'InvalidAccountId':
      return 'No account found for this email.'
    case 'InvalidSecret':
      return 'Incorrect password.'
    case 'TooManyFailedAttempts':
      return 'Too many failed attempts. Wait a moment and try again.'
    case 'Registration is disabled':
      return 'Registration is disabled.'
    default:
      return message
  }
}

function AdminLoginPage() {
  const { signIn } = useAuthActions()
  const { isAuthenticated, isLoading } = useConvexAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate({ to: '/admin' })
    }
  }, [isAuthenticated, isLoading, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setPending(true)

    const normalizedEmail = email.trim()

    try {
      const result = await signIn('password', {
        email: normalizedEmail,
        password,
        flow: 'signIn',
      })

      if (!result.signingIn) {
        setError('Sign-in did not complete. Restart `npx convex dev` and try again.')
        return
      }

      navigate({ to: '/admin' })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Authentication failed'
      setError(formatAuthError(message))
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white font-mono">
      <div className="w-full max-w-md">
        <div className="terminal-border p-8">
          <h1 className="mb-6 text-center text-sm font-bold tracking-widest">
            ┌─ VOICES38 ADMIN ─┐
          </h1>

          {isLoading && (
            <p className="mb-4 text-center text-xs tracking-widest text-gray-400">
              [SYSTEM] CHECKING SESSION...
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs tracking-widest text-gray-400 mb-1">
                EMAIL&gt;
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={pending}
                className="w-full border border-white bg-black px-3 py-2 text-sm text-white outline-none focus:border-gray-400 disabled:opacity-50"
                placeholder="admin@voices38.dev"
              />
            </div>

            <div>
              <label className="block text-xs tracking-widest text-gray-400 mb-1">
                PASSWORD&gt;
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                disabled={pending}
                className="w-full border border-white bg-black px-3 py-2 text-sm text-white outline-none focus:border-gray-400 disabled:opacity-50"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="text-xs tracking-widest text-red-400">
                [ERROR] {error.toUpperCase()}
              </div>
            )}

            <button
              type="submit"
              disabled={pending || isLoading}
              className="w-full border border-white bg-white px-4 py-2 text-xs font-bold tracking-widest text-black hover:bg-transparent hover:text-white disabled:opacity-50"
            >
              {pending ? 'PROCESSING...' : 'LOGIN.EXE'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
