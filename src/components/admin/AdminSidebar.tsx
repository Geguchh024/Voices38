import { Link } from '@tanstack/react-router'

interface AdminSidebarProps {
  active: string
}

const NAV_ITEMS = [
  { id: 'overview', label: 'OVERVIEW', to: '/admin' },
  { id: 'releases', label: 'RELEASES', to: '/admin/releases' },
  { id: 'projects', label: 'PROJECTS', to: '/admin/projects' },
  { id: 'supporters', label: 'SUPPORTERS', to: '/admin/supporters' },
  { id: 'donations', label: 'DONATIONS', to: '/admin/donations' },
  { id: 'settings', label: 'SETTINGS', to: '/admin/settings' },
] as const

export function AdminSidebar({ active }: AdminSidebarProps) {
  return (
    <aside className="w-52 shrink-0 border-r border-gray-800 p-4">
      <div className="mb-6">
        <h2 className="text-xs font-bold tracking-widest text-gray-400">
          ┌─ ADMIN ─┐
        </h2>
      </div>

      <nav className="space-y-1">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.id}
            to={item.to}
            className={`block px-3 py-2 text-xs tracking-widest transition-colors ${
              active === item.id
                ? 'bg-white text-black font-bold'
                : 'text-gray-400 hover:text-white hover:bg-gray-900'
            }`}
          >
            {active === item.id ? '> ' : '  '}{item.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
