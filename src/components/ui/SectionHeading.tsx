// src/components/ui/SectionHeading.tsx
import type { ReactNode } from 'react'
import { ScrollReveal } from './ScrollReveal'

interface Props {
  children: ReactNode
  sub?: string
  align?: 'left' | 'center'
  className?: string
  id?: string
}

export function SectionHeading({ children, sub, align = 'left', className = '', id }: Props) {
  return (
    <ScrollReveal className={`${align === 'center' ? 'text-center' : ''} ${className}`}>
      <h2 id={id} className="section-heading whitespace-pre-line">{children}</h2>
      {sub && (
        <p className="mt-4 text-muted-gray text-sm md:text-base font-body leading-relaxed max-w-lg">
          {sub}
        </p>
      )}
    </ScrollReveal>
  )
}
