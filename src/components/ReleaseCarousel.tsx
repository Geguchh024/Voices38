import { useEffect, useState } from 'react'
import type { Release } from '@/types/portfolio'

const ASCII_LOGO = `██╗   ██╗ ██████╗ ██╗ ██████╗███████╗███████╗██████╗  █████╗ 
██║   ██║██╔═══██╗██║██╔════╝██╔════╝██╔════╝╚════██╗██╔══██╗
██║   ██║██║   ██║██║██║     █████╗  ███████╗ █████╔╝╚█████╔╝
╚██╗ ██╔╝██║   ██║██║██║     ██╔══╝  ╚════██║ ╚═══██╗██╔══██╗
 ╚████╔╝ ╚██████╔╝██║╚██████╗███████╗███████║██████╔╝╚█████╔╝
  ╚═══╝   ╚═════╝ ╚═╝ ╚═════╝╚══════╝╚══════╝╚═════╝  ╚════╝ `

interface ReleaseCarouselProps {
  releases: Release[]
}

export function ReleaseCarousel({ releases }: ReleaseCarouselProps) {
  const [index, setIndex] = useState(0)
  const total = releases.length

  useEffect(() => {
    if (total <= 1) return

    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % total)
    }, 5000)

    return () => window.clearInterval(interval)
  }, [total])

  if (total === 0) return null

  const release = releases[index]

  const goPrev = () => setIndex((current) => (current - 1 + total) % total)
  const goNext = () => setIndex((current) => (current + 1) % total)

  return (
    <section className="mb-12">
      <div className="terminal-border bg-black p-6">
        <pre className="ascii-header mb-8 text-center text-white">{ASCII_LOGO}</pre>

        <div className="border border-white p-6">
          <div className="mb-4 flex items-center justify-between text-xs tracking-widest">
            <span>LATEST_RELEASES</span>
            <span>
              [{String(index + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}]
            </span>
          </div>

          <div className="min-h-[140px] space-y-2 text-sm">
            <p className="text-xl font-bold">{release.title}</p>
            <p className="text-xs tracking-widest">
              <span className="bg-white px-1 text-black">[{release.format}]</span>
            </p>
            <p className="text-xs tracking-widest opacity-80">RELEASE DATE: {release.releaseDate}</p>
            <p className="text-xs tracking-widest opacity-80">GENRE: {release.genre}</p>
            <p className="text-xs tracking-widest opacity-80">PROTECTION: {release.protection}</p>
          </div>

          <div className="mt-6 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={goPrev}
              className="border border-white px-3 py-1 text-xs font-bold tracking-widest hover:bg-white hover:text-black"
            >
              &lt; PREV
            </button>

            <div className="flex gap-2">
              {releases.map((item, dotIndex) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setIndex(dotIndex)}
                  aria-label={`Show release ${dotIndex + 1}`}
                  className={`h-2 w-2 border border-white ${
                    dotIndex === index ? 'bg-white' : 'bg-transparent'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={goNext}
              className="border border-white px-3 py-1 text-xs font-bold tracking-widest hover:bg-white hover:text-black"
            >
              NEXT &gt;
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
