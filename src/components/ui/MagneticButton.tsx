// src/components/ui/MagneticButton.tsx
// Magnetic hover — desktop only. Touch: renders children directly.
import { useRef, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  strength?: number
}

export function MagneticButton({ children, className = '', strength = 0.3 }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  // Skip on touch devices — check at render time (SSR-safe pattern)
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return <div className={className}>{children}</div>
  }

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) * strength
    const dy = (e.clientY - cy) * strength
    el.style.transform = `translate(${dx}px, ${dy}px)`
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'translate(0px, 0px)'
    el.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
  }

  const onEnter = () => {
    const el = ref.current
    if (!el) return
    el.style.transition = 'transform 0.1s linear'
  }

  return (
    <div
      ref={ref}
      className={`inline-block ${className}`}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{ willChange: 'transform' }}
    >
      {children}
    </div>
  )
}
