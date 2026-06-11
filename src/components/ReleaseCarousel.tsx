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
    <section className="mb-8 md:mb-12">
      <div className="terminal-border bg-black p-3 sm:p-6">
        <div className="ascii-logo-shell mb-4 sm:mb-8">
          <pre className="ascii-header text-center text-white">{ASCII_LOGO}</pre>
        </div>

        <div className="border border-white p-3 sm:p-6">
          <div className="mb-3 flex items-center justify-between gap-2 text-[0.65rem] tracking-wide sm:mb-4 sm:text-xs sm:tracking-widest">
            <span className="truncate">LATEST_RELEASES</span>
            <span className="shrink-0">
              [{String(index + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}]
            </span>
          </div>

          <div className="min-h-0 space-y-1.5 text-sm sm:min-h-[140px] sm:space-y-2">
            <p className="text-base font-bold break-words sm:text-xl">{release.title}</p>
            <p className="text-[0.65rem] tracking-wide sm:text-xs sm:tracking-widest">
              <span className="bg-white px-1 text-black">[{release.format}]</span>
            </p>
            <p className="text-[0.65rem] tracking-wide opacity-80 sm:text-xs sm:tracking-widest">
              RELEASE DATE: {release.releaseDate}
            </p>
            <p className="text-[0.65rem] tracking-wide opacity-80 sm:text-xs sm:tracking-widest">
              GENRE: {release.genre}
            </p>
            <p className="text-[0.65rem] tracking-wide opacity-80 sm:text-xs sm:tracking-widest">
              PROTECTION: {release.protection}
            </p>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <div className="flex items-center justify-between gap-2 sm:contents">
              <button
                type="button"
                onClick={goPrev}
                className="min-h-11 flex-1 touch-manipulation border border-white px-3 py-2.5 text-[0.65rem] font-bold tracking-wide sm:min-h-0 sm:flex-none sm:py-1 sm:text-xs sm:tracking-widest hover:bg-white hover:text-black"
              >
                &lt; PREV
              </button>

              <button
                type="button"
                onClick={goNext}
                className="min-h-11 flex-1 touch-manipulation border border-white px-3 py-2.5 text-[0.65rem] font-bold tracking-wide sm:min-h-0 sm:flex-none sm:py-1 sm:text-xs sm:tracking-widest hover:bg-white hover:text-black"
              >
                NEXT &gt;
              </button>
            </div>

            <div className="flex justify-center gap-2">
              {releases.map((item, dotIndex) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setIndex(dotIndex)}
                  aria-label={`Show release ${dotIndex + 1}`}
                  className={`h-3 w-3 touch-manipulation border border-white sm:h-2 sm:w-2 ${
                    dotIndex === index ? 'bg-white' : 'bg-transparent'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
