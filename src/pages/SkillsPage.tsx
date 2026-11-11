// src/pages/SkillsPage.tsx
// Interactive skill grid. Framer Motion stagger + hover glow.
// Marquee for tech names (kinetic texture).
import { useRef, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Cpu, Code, Layers, Terminal, Globe } from 'lucide-react'
import { PageWrapper } from '../components/layout/PageWrapper'
import { HorizontalMarquee } from '../components/ui/HorizontalMarquee'
import { skills } from '../data/skills'

gsap.registerPlugin(ScrollTrigger)

const CAT_ICONS: Record<string, typeof Cpu> = {
  Frontend: Globe,
  Backend: Cpu,
  Development: Code,
  Database: Cpu,
  Design: Layers,
  Marketing: Globe,
  Creative: Code,
  Tools: Terminal,
}

const LEVEL_COLOR: Record<string, string> = {
  Expert:       'text-electric-blue border-electric-blue/40 bg-electric-blue/5',
  Advanced:     'text-light-blue/80 border-light-blue/20 bg-light-blue/5',
  Intermediate: 'text-muted-gray border-white/10',
  Familiar:     'text-muted-gray/50 border-white/5',
}

export default function SkillsPage() {
  const reduced = useReducedMotion()
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduced || !heroRef.current) return
    const lines = heroRef.current.querySelectorAll('.hero-line')
    gsap.fromTo(lines,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power4.out', delay: 0.1 }
    )
    return () => { ScrollTrigger.getAll().forEach(t => t.kill()) }
  }, [reduced])

  const allNames = skills.flatMap(c => c.skills.map(s => s.name))

  return (
    <PageWrapper>
      {/* ── HERO ── */}
      <section className="relative pt-24 md:pt-28 pb-10 md:pb-12 max-w-7xl mx-auto px-6 md:px-10 overflow-hidden">
        <div ref={heroRef}>
          <span className="hero-line text-xs font-mono text-[#888888] tracking-widest uppercase mb-4 block" style={{ opacity: reduced ? 1 : 0 }}>
            stack
          </span>
          <h1
            className="hero-line font-normal tracking-[-0.04em] leading-[0.9] text-[#E8E8EA]"
            style={{ opacity: reduced ? 1 : 0, fontSize: 'clamp(2.8rem, 7vw, 5.5rem)' }}
          >
            TOOLS I USE
          </h1>
          <h1
            className="hero-line font-normal tracking-[-0.04em] leading-[0.9] text-[#E8E8EA]/40 mt-1"
            style={{ opacity: reduced ? 1 : 0, fontSize: 'clamp(2.8rem, 7vw, 5.5rem)' }}
          >
            TO BUILD IDEAS.
          </h1>
        </div>
        <p className="text-[#888888] text-sm md:text-base font-light max-w-lg mt-6 leading-relaxed">
          Technologies, tools, and practices I work with across frontend, backend, database systems, and IT engineering.
        </p>
        <div className="absolute top-20 right-0 w-96 h-96 rounded-full pointer-events-none opacity-10"
          style={{ background: 'radial-gradient(circle, #2563EB 0%, transparent 70%)', filter: 'blur(80px)' }}
          aria-hidden="true"
        />
      </section>

      {/* Marquee */}
      <div className="mb-14 border-y border-white/5 py-4">
        <HorizontalMarquee items={allNames} speed={50} />
        <HorizontalMarquee items={allNames} speed={40} direction="right" className="mt-3 opacity-50" />
      </div>

      {/* ── SKILL CATEGORIES ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 pb-24 space-y-16 md:space-y-20">
        {skills.map((cat, ci) => {
          const Icon = CAT_ICONS[cat.category.split(' ')[0]] || Code
          return (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Category header */}
              <div className="flex items-center gap-4 mb-10 pb-5 border-b border-white/5">
                <div className="w-8 h-8 border border-electric-blue/20 rounded-sm flex items-center justify-center">
                  <Icon size={14} className="text-electric-blue/60" />
                </div>
                <span className="font-mono text-xs text-electric-blue/70 tracking-widest uppercase">
                  {String(ci + 1).padStart(2, '0')} / {cat.category}
                </span>
              </div>

              {/* Skills grid */}
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {cat.skills.map((skill, si) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{ delay: si * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                    className="neon-card p-4 cursor-default group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-off-white/80 text-sm font-body group-hover:text-off-white transition-colors">
                        {skill.name}
                      </span>
                      <span className={`text-xs font-mono px-1.5 py-0.5 border rounded-sm ml-2 shrink-0 ${
                        LEVEL_COLOR[skill.level] ?? LEVEL_COLOR['Familiar']
                      }`}>
                        {skill.level.charAt(0)}
                      </span>
                    </div>
                    {skill.description && (
                      <p className="text-xs text-muted-gray/40 leading-relaxed group-hover:text-muted-gray/60 transition-colors">
                        {skill.description}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </PageWrapper>
  )
}
