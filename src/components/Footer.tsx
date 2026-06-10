import { Link } from '@tanstack/react-router'

export function Footer() {
  return (
    <footer className="mt-12 border-t border-[#444748] bg-black">
      <div className="mx-auto flex w-full max-w-[1024px] flex-col items-center justify-between gap-4 px-4 py-4 md:flex-row md:px-10">
        <div className="text-xs tracking-widest text-[#8e9192]">
          (C) 1994-2026 VOICES38 SECURE TERMINAL
        </div>

        <div className="flex items-center gap-8 text-xs tracking-widest">
          <Link to="/info" className="text-[#c4c7c8] underline hover:text-white">
            SYSTEM_STATUS
          </Link>
          <Link to="/info" className="text-[#c4c7c8] underline hover:text-white">
            ENCRYPTION_KEY
          </Link>
          <Link to="/info" className="text-[#c4c7c8] underline hover:text-white">
            PROTOCOL_V3
          </Link>
        </div>

        <div className="bg-white px-2 py-1 text-[10px] font-bold text-black uppercase">
          ENCRYPTION: ACTIVE
        </div>
      </div>
    </footer>
  )
}
