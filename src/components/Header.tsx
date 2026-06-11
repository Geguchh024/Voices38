import { useState } from 'react'
import { Link } from '@tanstack/react-router'

const navItems = [
  { to: '/', label: 'MAIN' },
  { to: '/releases', label: 'RELEASE_ARCHIVE' },
  { to: '/info', label: 'INFO' },
] as const

interface HeaderProps {
  activeNav?: string
}

export function Header({ activeNav = 'MAIN' }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="fixed top-0 z-50 w-full border-b-2 border-white bg-black pt-[env(safe-area-inset-top)]">
      <div className="mx-auto flex w-full max-w-[1024px] items-center justify-between gap-3 px-4 py-2 md:px-10">
        <Link
          to="/"
          onClick={closeMenu}
          className="min-w-0 truncate text-sm font-bold tracking-tighter uppercase sm:text-xl"
        >
          VOICES38_v1.0
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              item={item}
              isActive={item.label === activeNav}
              onNavigate={closeMenu}
            />
          ))}
        </nav>

        <button
          type="button"
          className="flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center border border-white text-sm font-bold md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? 'X' : '≡'}
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-nav"
          className="border-t border-white bg-black px-4 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] md:hidden"
        >
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              item={item}
              isActive={item.label === activeNav}
              onNavigate={closeMenu}
              mobile
            />
          ))}
        </nav>
      )}
    </header>
  )
}

function NavLink({
  item,
  isActive,
  onNavigate,
  mobile = false,
}: {
  item: (typeof navItems)[number]
  isActive: boolean
  onNavigate: () => void
  mobile?: boolean
}) {
  const className = mobile
    ? isActive
      ? 'mb-1 block w-full bg-white px-3 py-3 text-center text-xs font-bold tracking-wide text-black'
      : 'mb-1 block w-full border border-white/30 px-3 py-3 text-center text-xs font-medium tracking-wide hover:bg-white hover:text-black'
    : isActive
      ? 'bg-white px-2 py-1 font-bold text-black'
      : 'px-2 py-1 text-xs font-medium tracking-widest hover:bg-white hover:text-black'

  return (
    <Link to={item.to} onClick={onNavigate} className={className}>
      {item.label}
    </Link>
  )
}
