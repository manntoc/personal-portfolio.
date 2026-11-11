// src/components/layout/Navbar.tsx
// Brief spec: name top-left, links centered, pill CTA top-right.
// Glassmorphism NOT used (R-10). Solid canvas bg on scroll.
// All links route to real existing pages (R-24, R-26).
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Menu } from 'lucide-react'
import { profile } from '../../data/profile'
import { useScrolled } from '../../hooks/useScrolled'

const NAV = [
  { label: 'Home',    to: '/'         },
  { label: 'About',   to: '/about'    },
  { label: 'Works',   to: '/projects' },
  { label: 'Skills',  to: '/skills'   },
  { label: 'Contact', to: '/contact'  },
]

export function Navbar() {
  const { pathname } = useLocation()
  const scrolled = useScrolled(60)
  const [open, setOpen] = useState(false)

  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [])

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{ background: scrolled ? 'rgba(5,5,5,0.95)' : 'transparent' }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between py-5 px-6 md:px-10">

          {/* Name / personal brand — left */}
          <Link
            to="/"
            className="text-[11px] font-medium tracking-[0.12em] uppercase text-[#E8E8EA]
                       hover:text-white transition-colors duration-200 focus-visible:outline-none"
            style={{ letterSpacing: '0.12em' }}
          >
            {profile.name}
          </Link>

          {/* Center links */}
          <nav className="hidden md:flex items-center gap-9" aria-label="Primary">
            {NAV.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className={`text-[11px] font-normal tracking-[0.1em] uppercase transition-colors duration-200
                           focus-visible:outline-none focus-visible:underline ${
                  pathname === to || (to !== '/' && pathname.startsWith(to))
                    ? 'text-[#E8E8EA]'
                    : 'text-[#555555] hover:text-[#E8E8EA]'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* CTA right: white pill with black text */}
          <div className="hidden md:block">
            <Link
              to="/contact"
              className="inline-block px-5 py-2 text-[11px] font-medium tracking-[0.1em] uppercase
                         bg-[#E8E8EA] text-[#050505] rounded-full
                         hover:bg-white transition-colors duration-200
                         focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2
                         focus-visible:ring-offset-[#050505]"
            >
              Let's Talk
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(v => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
            className="md:hidden w-8 h-8 flex items-center justify-center
                       text-[#777777] hover:text-[#E8E8EA] transition-colors
                       focus-visible:outline-none"
          >
            <AnimatePresence mode="wait" initial={false}>
              {open
                ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X size={18} /></motion.span>
                : <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu size={18} /></motion.span>
              }
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden flex flex-col pt-20 pb-10 px-6"
            style={{ background: '#050505' }}
          >
            <ul className="flex flex-col">
              {[...NAV].map(({ label, to }, i) => (
                <motion.li key={to}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  style={{ borderBottom: '1px solid #242424' }}
                >
                  <Link
                    to={to}
                    className="block py-5 text-3xl font-light tracking-tighter text-[#E8E8EA]
                               hover:text-white transition-colors focus-visible:outline-none"
                  >
                    {label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="mt-auto text-[10px] tracking-widest uppercase text-[#393939]">
              {profile.email}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
