// src/components/ui/ParticleCanvas.tsx
// Canvas-based particle field. Lightweight, no library needed.
// Particles connect when close, creating a network/constellation effect.
import { useEffect, useRef } from 'react'

interface Particle {
  x: number; y: number
  vx: number; vy: number
  size: number; opacity: number
}

interface Props {
  count?: number
  className?: string
}

export function ParticleCanvas({ count = 60, className = '' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    let animId: number
    let W = 0, H = 0
    const particles: Particle[] = []

    const resize = () => {
      W = canvas.width = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }

    const init = () => {
      particles.length = 0
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 1.5 + 0.3,
          opacity: Math.random() * 0.5 + 0.1,
        })
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      // Draw connection lines first
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const maxDist = 120
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.12
            ctx.strokeStyle = `rgba(37, 99, 235, ${alpha})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(96, 165, 250, ${p.opacity})`
        ctx.fill()

        // Update position
        p.x += p.vx
        p.y += p.vy

        // Wrap edges
        if (p.x < 0) p.x = W
        if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H
        if (p.y > H) p.y = 0
      }

      animId = requestAnimationFrame(draw)
    }

    const ro = new ResizeObserver(() => { resize(); init() })
    ro.observe(canvas)
    resize()
    init()
    draw()

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
    }
  }, [count])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  )
}
