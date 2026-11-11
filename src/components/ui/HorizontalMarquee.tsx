// src/components/ui/HorizontalMarquee.tsx
// Infinite scrolling marquee — GSAP driven, no library needed.
// UX purpose: adds kinetic energy to skills/tech section.
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface Props {
  items: string[]
  speed?: number   // pixels per second
  direction?: 'left' | 'right'
  className?: string
}

export function HorizontalMarquee({ items, speed = 60, direction = 'left', className = '' }: Props) {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const track = trackRef.current
    if (!track) return

    const totalWidth = track.scrollWidth / 2
    const duration = totalWidth / speed

    const tween = gsap.to(track, {
      x: direction === 'left' ? -totalWidth : totalWidth,
      duration,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % totalWidth),
      },
    })

    return () => { tween.kill() }
  }, [speed, direction])

  // Duplicate items for seamless loop
  const doubled = [...items, ...items]

  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <div ref={trackRef} className="flex gap-8 w-max" style={{ willChange: 'transform' }}>
        {doubled.map((item, i) => (
          <span key={i} className="text-xs font-mono text-muted-gray/40 tracking-widest uppercase whitespace-nowrap px-4 py-2 border border-white/5 rounded-sm">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
