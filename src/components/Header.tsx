import { Link } from '@tanstack/react-router'

const navItems = [
  { to: '/', label: 'MAIN', hash: 'releases' },
  { to: '/releases', label: 'RELEASE_ARCHIVE' },
  { to: '/info', label: 'INFO' },
] as const

interface HeaderProps {
  activeNav?: string
}

export function Header({ activeNav = 'MAIN' }: HeaderProps) {
  return (
    <header className="fixed top-0 z-50 w-full border-b-2 border-white bg-black">
      <div className="mx-auto flex w-full max-w-[1024px] items-center justify-between px-4 py-2 md:px-10">
        <Link to="/" className="text-xl font-bold tracking-tighter uppercase">
          VOICES38_v1.0
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = item.label === activeNav
            const className = isActive
              ? 'bg-white px-2 py-1 font-bold text-black'
              : 'px-2 py-1 text-xs font-medium tracking-widest hover:bg-white hover:text-black'

            return (
              <Link
                key={item.label}
                to={item.to}
                hash={item.hash}
                className={className}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
