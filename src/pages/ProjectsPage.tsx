// src/pages/ProjectsPage.tsx
// Project grid with category filter + AnimatePresence layout animation.
// GSAP stagger on initial load; Framer Motion handles filter transitions.
import { useState, useMemo, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PageWrapper } from '../components/layout/PageWrapper'
import { projects, ALL_CATEGORIES } from '../data/projects'
import type { ProjectCategory } from '../data/projects'

gsap.registerPlugin(ScrollTrigger)

type Filter = 'All' | ProjectCategory
const FILTERS: Filter[] = ['All', ...ALL_CATEGORIES]

export default function ProjectsPage() {
  const [active, setActive] = useState<Filter>('All')
  const reduced = useReducedMotion()
  const heroRef = useRef<HTMLDivElement>(null)

  const filtered = useMemo(() =>
    active === 'All' ? projects : projects.filter(p => p.category === active),
    [active]
  )

  // Hero heading reveal
  useEffect(() => {
    if (reduced || !heroRef.current) return
    const lines = heroRef.current.querySelectorAll('.reveal-line')
    gsap.fromTo(lines,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: 'power4.out', delay: 0.1 }
    )
  }, [reduced])

  return (
    <PageWrapper>
      {/* ── HERO ── */}
      <section className="relative pt-24 md:pt-28 pb-10 md:pb-14 max-w-7xl mx-auto px-6 md:px-10 overflow-hidden">
        <div ref={heroRef}>
          <span className="reveal-line text-xs font-mono text-[#888888] tracking-widest uppercase mb-4 block" style={{ opacity: reduced ? 1 : 0 }}>
            01 / work
          </span>
          <h1
            className="reveal-line font-normal tracking-[-0.04em] leading-[0.9] text-[#E8E8EA]"
            style={{ opacity: reduced ? 1 : 0, fontSize: 'clamp(2.8rem, 7vw, 5.5rem)' }}
          >
            SELECTED
          </h1>
          <h1
            className="reveal-line font-normal tracking-[-0.04em] leading-[0.9] text-[#E8E8EA]/40 mt-1"
            style={{ opacity: reduced ? 1 : 0, fontSize: 'clamp(2.8rem, 7vw, 5.5rem)' }}
          >
            WORK.
          </h1>
        </div>
        <p className="text-[#888888] text-sm md:text-base font-light max-w-lg mt-6 leading-relaxed">
          A curated selection of projects spanning web development, design systems, and creative experiments.
        </p>
        {/* Ambient glow */}
        <div className="absolute top-20 right-0 w-96 h-96 rounded-full pointer-events-none opacity-10"
          style={{ background: 'radial-gradient(circle, #2563EB 0%, transparent 70%)', filter: 'blur(80px)' }}
          aria-hidden="true"
        />
      </section>

      {/* ── FILTER ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-10">
        <div className="flex flex-wrap gap-2 items-center border-b border-white/5 pb-6">
          <span className="text-xs font-mono text-muted-gray/40 tracking-widest mr-4 hidden sm:block">
            FILTER
          </span>
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`relative px-4 py-1.5 text-xs font-mono tracking-wide rounded-sm transition-all duration-200 focus-visible:outline-none ${
                active === f
                  ? 'text-electric-blue border border-electric-blue/40 bg-electric-blue/5'
                  : 'text-muted-gray/60 border border-white/5 hover:text-off-white hover:border-white/15'
              }`}
            >
              {f}
              {active === f && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-sm bg-electric-blue/5"
                  style={{ zIndex: -1 }}
                />
              )}
            </button>
          ))}
          <span className="ml-auto text-xs font-mono text-muted-gray/30">
            {filtered.length} project{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* ── PROJECT GRID ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 pb-24">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 && (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-muted-gray/40 text-sm font-mono py-24 text-center"
            >
              No projects in this category yet.
            </motion.p>
          )}
          <motion.div
            key={active}
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filtered.map((project, i) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  to={`/projects/${project.slug}`}
                  className="group block neon-card h-full"
                >
                  {/* Cover */}
                  <div
                    className="relative h-48 overflow-hidden"
                    style={{ background: project.coverGradient }}
                  >
                    <div className="absolute inset-0 editorial-grid opacity-20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-display text-5xl font-extralight text-white/10">
                        {project.title.charAt(0)}
                      </span>
                    </div>
                    <span className="absolute top-3 left-3 text-xs font-mono text-white/20">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="absolute inset-0 bg-electric-blue/0 group-hover:bg-electric-blue/5 transition-colors duration-500" />
                    <span className="absolute top-3 right-3 w-6 h-6 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:border-electric-blue/40">
                      <ArrowUpRight size={10} className="text-light-blue" />
                    </span>
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono text-electric-blue/60 tracking-widest uppercase">
                        {project.category}
                      </span>
                      <span className="text-xs font-mono text-muted-gray/40">
                        {project.year}
                      </span>
                    </div>
                    <h3 className="font-display font-light text-xl text-off-white tracking-tight mb-3 group-hover:text-white transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-gray/70 text-xs leading-relaxed mb-5">
                      {project.shortDesc}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.slice(0, 3).map(tag => (
                        <span key={tag} className="text-xs font-mono text-muted-gray/40 px-2 py-0.5 border border-white/5 rounded-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </PageWrapper>
  )
}
