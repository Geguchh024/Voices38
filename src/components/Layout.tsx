import type { ReactNode } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { ClickRipple } from './ClickRipple'

interface LayoutProps {
  children: ReactNode
  activeNav?: string
}

export function Layout({ children, activeNav }: LayoutProps) {
  return (
    <div className="crt-flicker custom-scrollbar min-h-screen bg-black text-white">
      <ClickRipple />
      <Header activeNav={activeNav} />
      <main className="mx-auto max-w-[1024px] px-4 pt-[calc(4.5rem+env(safe-area-inset-top))] pb-[calc(2rem+env(safe-area-inset-bottom))] md:px-10 md:pt-24">
        {children}
      </main>
      <Footer />
    </div>
  )
}
