import { useEffect, useState } from 'react'

const TYPEWRITER_TEXT =
  'INITIALIZING KERNEL... SECURE TUNNEL ESTABLISHED... WELCOME BACK, OPERATIVE.'

const ASCII_LOGO = `██╗   ██╗ ██████╗ ██╗ ██████╗███████╗███████╗██████╗  █████╗ 
██║   ██║██╔═══██╗██║██╔════╝██╔════╝██╔════╝╚════██╗██╔══██╗
██║   ██║██║   ██║██║██║     █████╗  ███████╗ █████╔╝╚█████╔╝
╚██╗ ██╔╝██║   ██║██║██║     ██╔══╝  ╚════██║ ╚═══██╗██╔══██╗
 ╚████╔╝ ╚██████╔╝██║╚██████╗███████╗███████║██████╔╝╚█████╔╝
  ╚═══╝   ╚═════╝ ╚═╝ ╚═════╝╚══════╝╚══════╝╚═════╝  ╚════╝ `

export function Hero() {
  const [typedText, setTypedText] = useState('')

  useEffect(() => {
    let index = 0
    const interval = window.setInterval(() => {
      index += 1
      setTypedText(TYPEWRITER_TEXT.slice(0, index))
      if (index >= TYPEWRITER_TEXT.length) {
        window.clearInterval(interval)
      }
    }, 50)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <section className="mb-12">
      <div className="terminal-border bg-black p-6">
        <pre className="ascii-header text-center text-white">{ASCII_LOGO}</pre>
        <div className="mt-8 space-y-2 text-xs tracking-widest">
          <p className="flex gap-2">
            <span>[SYSTEM]</span>
            <span>{typedText}</span>
            <span className="blink">_</span>
          </p>
          <p>
            <span>[STATUS]</span> CONNECTION: SECURE_V38
          </p>
          <p>
            <span>[USER]</span> ANONYMOUS@GUEST
          </p>
        </div>
      </div>
    </section>
  )
}
