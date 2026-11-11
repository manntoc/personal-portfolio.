// src/components/ui/GlitchText.tsx
// Text scramble/glitch on mount. Uses TextScramble utility.
// triggerOnHover: re-scrambles on mouse enter.
import { useEffect, useRef } from 'react'
import { TextScramble } from '../../utils/textScramble'

interface Props {
  text: string
  className?: string
  triggerOnHover?: boolean
  tag?: string
}

export function GlitchText({ text, className = '', triggerOnHover = false }: Props) {
  const ref = useRef<HTMLElement>(null)
  const scramblerRef = useRef<TextScramble | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.innerText = text
      return
    }
    const fx = new TextScramble(el)
    scramblerRef.current = fx
    fx.setText(text)
  }, [text])

  const handleHover = () => {
    if (!triggerOnHover || !scramblerRef.current) return
    scramblerRef.current.setText(text)
  }

  // Using createElement to avoid JSX namespace issues with dynamic tags
  return (
    <span
      ref={ref as React.RefObject<HTMLSpanElement>}
      className={`inline-block ${className}`}
      onMouseEnter={handleHover}
      aria-label={text}
      role="text"
    />
  )
}
