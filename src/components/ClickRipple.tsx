import { useEffect } from 'react'

export function ClickRipple() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const circle = document.createElement('div')
      circle.style.position = 'fixed'
      circle.style.width = '20px'
      circle.style.height = '20px'
      circle.style.border = '1px solid white'
      circle.style.borderRadius = '50%'
      circle.style.top = `${event.clientY - 10}px`
      circle.style.left = `${event.clientX - 10}px`
      circle.style.pointerEvents = 'none'
      circle.style.zIndex = '10000'
      circle.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out'
      document.body.appendChild(circle)

      requestAnimationFrame(() => {
        circle.style.transform = 'scale(3)'
        circle.style.opacity = '0'
      })

      window.setTimeout(() => circle.remove(), 300)
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return null
}
