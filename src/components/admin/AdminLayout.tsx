import type { ReactNode } from 'react'
import { AdminSidebar } from './AdminSidebar'
import { useAuthActions } from '@convex-dev/auth/react'
import { useNavigate } from '@tanstack/react-router'

interface AdminLayoutProps {
  children: ReactNode
  active: string
}

export function AdminLayout({ children, active }: AdminLayoutProps) {
  const { signOut } = useAuthActions()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate({ to: '/admin/login' })
  }

  return (
    <div className="flex min-h-screen bg-black text-white font-mono">
      <AdminSidebar active={active} />

      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between border-b border-gray-800 px-6 py-3">
          <span className="text-xs tracking-widest text-gray-500">
            VOICES38://ADMIN
          </span>
          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-widest text-gray-500 hover:text-white"
            >
              [VIEW SITE]
            </a>
            <button
              onClick={handleSignOut}
              className="text-xs tracking-widest text-red-400 hover:text-red-300"
            >
              [LOGOUT]
            </button>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
