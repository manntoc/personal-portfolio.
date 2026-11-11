// src/components/layout/PageWrapper.tsx
// Page transition wrapper using Framer Motion.
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export function PageWrapper({ children }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }}
      exit={{ opacity: 0, y: -8, transition: { duration: 0.3, ease: 'easeIn' } }}
    >
      {children}
    </motion.div>
  )
}
