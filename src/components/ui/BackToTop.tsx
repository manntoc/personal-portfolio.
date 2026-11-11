// src/components/ui/BackToTop.tsx
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-xl bg-[#121212] border border-[#242424] flex items-center justify-center text-[#777777] hover:text-[#E8E8EA] hover:border-[#3E3E3E] hover:bg-[#1A1A1A] transition-all duration-200 shadow-2xl backdrop-blur-sm"
        >
          <ArrowUp size={16} strokeWidth={2} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
