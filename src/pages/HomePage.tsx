// src/pages/HomePage.tsx
//
// Design Read: Awwwards-level personal developer portfolio.
// Visual language: same as reference (dark editorial, oversized type,
// narrow canvas #050505, outer margin #242424).
// Dials: ENERGY 3 / RHYTHM 3 / MOTION 2
//
// Identity motif: oversized headline overlapping central visual.
// Palette: #E8E8EA primary text, #777777 secondary, #242424 borders.
// No glassmorphism (R-10), no background grid (R-07),
// no fake stats (R-17 — user confirmed: 3yr / 20+ / 10+),
// no fake clients (R-18, R-36 — tech stack shown instead),
// no buzzwords (R-16), no em dash (R-02).
// All nav links route to real pages (R-24, R-26).
// /resume.pdf — drop actual PDF in public/ before deploy.

import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Globe, Terminal, Code2, Sparkles, FolderGit2, Mail } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import portrait from '../assets/portrait.jpg'
import androidBust from '../assets/android-bust.png'
import { profile } from '../data/profile'
import { getFeaturedProjects } from '../data/projects'

gsap.registerPlugin(ScrollTrigger)

// Stats: user-confirmed real numbers (R-17)
const STATS = [
  { value: '3+',  label: 'Years of Experience' },
  { value: '20+', label: 'Projects Completed'  },
]

// Tech stack shown instead of fake client logos (R-36)
const TECH_NAMES = [
  'PHP Laravel', 'React', 'Vue.js', 'TypeScript',
  'MySQL', 'Tailwind CSS', 'REST API', 'Figma',
  'Bootstrap', 'JavaScript', 'Git', 'UI/UX Design',
]

const PROJECT_ICONS = [Globe, Terminal, Code2, Sparkles]

function GithubIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  )
}

function LinkedinIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function WhatsappIcon({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  )
}

export default function HomePage() {
  const reduced = useReducedMotion()
  const sectionsRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)

  // GSAP scroll-reveals (MOTION 2: scroll-triggered)
  useEffect(() => {
    if (reduced) return

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.g-reveal').forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 32 },
          {
            opacity: 1, y: 0,
            duration: 1,
            ease: 'power3.out',
            delay: (i % 3) * 0.1,
            scrollTrigger: {
              trigger: el,
              start: 'top 87%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }, sectionsRef)

    return () => ctx.revert()
  }, [reduced])

  const featured = getFeaturedProjects().slice(0, 4)

  return (
    // Site canvas: narrow, centered, surrounded by #242424 outer margin
    <div className="site-canvas" ref={sectionsRef}>

      {/* ══ §01 HERO ══════════════════════════════════════════════════
          Reference: oversized two-line headline behind central visual.
          Identity motif: headline overlaps portrait at z-index level.
          No standard centered hero (R-05). No background grid (R-07).
          Stat blocks: outlined rectangles like reference image.
      ════════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-between overflow-hidden pt-28 pb-16"
        style={{ background: '#050505' }}
      >
        {/* ── HEADLINE LAYER (z-20, behind visual at z-30 on desktop) */}
        <div className="relative z-20 w-full max-w-[1560px] mx-auto px-2 sm:px-4 flex-1 flex flex-col justify-center text-center">

          {/* Line 1 — giant, full viewport width */}
          <div className="overflow-hidden mb-0">
            <motion.span
              className="hero-line font-normal text-[#E8E8EA]"
              style={{
                fontSize: 'clamp(2.1rem, 10.2vw, 185px)',
                fontWeight: 400,
                lineHeight: 0.88,
                letterSpacing: '-0.04em',
                whiteSpace: 'nowrap',
              }}
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              website portofolio
            </motion.span>
          </div>

          {/* Line 2 — partial opacity, overlaps central visual */}
          <div className="overflow-hidden">
            <motion.span
              className="hero-line font-normal"
              style={{
                fontSize: 'clamp(2.1rem, 10.2vw, 185px)',
                fontWeight: 400,
                lineHeight: 0.88,
                letterSpacing: '-0.04em',
                color: 'rgba(232,232,234,0.30)',
                whiteSpace: 'nowrap',
              }}
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              creative developer
            </motion.span>
          </div>
        </div>

        {/* ── CENTRAL VISUAL: BUST (head to chest, enlarged & centered) */}
        <motion.div
          className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none pt-20 md:pt-28"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        >
          <div
            className="relative flex items-center justify-center"
            style={{
              width: 'clamp(360px, 48vw, 720px)',
              height: 'clamp(340px, 46vw, 680px)',
            }}
          >
            <img
              src={androidBust}
              alt=""
              className="w-full h-full object-contain object-center drop-shadow-[0_25px_60px_rgba(0,0,0,0.98)]"
              style={{ display: 'block' }}
            />
            {/* Soft bottom fade to ensure seamless transition into dark canvas */}
            <div
              aria-hidden
              className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
              style={{ background: 'linear-gradient(to bottom, transparent, #050505)' }}
            />
          </div>
        </motion.div>

        {/* ── BOTTOM ROW: intro text left / stat blocks right */}
        <div className="relative z-40 max-w-7xl mx-auto w-full px-6 md:px-10 flex flex-col md:flex-row items-end justify-between gap-6">

          {/* Left: role + small intro */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="max-w-xs"
          >
            <p className="mono-label mb-3">Independent Creative Developer</p>
            <p style={{ color: '#777777', fontSize: '0.78rem', lineHeight: 1.6, fontWeight: 300 }}>
              Designing digital experiences through code, creativity, and technology.
            </p>

            {/* CTAs */}
            <div className="flex items-center gap-4 mt-5">
              <Link
                to="/projects"
                className="btn-white"
              >
                Explore Work
              </Link>
              {/* /resume.pdf: drop real PDF in public/ before deploy */}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                Download CV
              </a>
            </div>
          </motion.div>

          {/* Right: stat blocks (outlined rectangles, like reference) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.05 }}
            className="flex gap-3"
          >
            {STATS.map(s => (
              <div key={s.label} className="stat-block">
                <span
                  style={{
                    fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
                    fontWeight: 300,
                    fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                    letterSpacing: '-0.04em',
                    lineHeight: 1,
                    color: '#E8E8EA',
                  }}
                >
                  {s.value}
                </span>
                <span className="mono-label">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ §02 TECH STACK (replaces "Selected Collaborations") ══════
          No fake client logos (R-36, R-18).
          Tech names in a horizontal marquee row — simple, real, verifiable.
          Centered label above, then scrolling names.
          RHYTHM 3: layout shift from hero (full-screen to tight strip).
      ════════════════════════════════════════════════════════════ */}
      <section
        className="py-8"
        style={{ background: '#050505', borderTop: '1px solid #242424', borderBottom: '1px solid #242424' }}
      >
        <div className="overflow-hidden">
          <div className="marquee-track">
            {/* Duplicate for seamless loop */}
            {[...TECH_NAMES, ...TECH_NAMES].map((name, i) => (
              <span
                key={i}
                style={{
                  color: '#393939',
                  fontSize: '0.7rem',
                  fontWeight: 400,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  padding: '0 2.5rem',
                  whiteSpace: 'nowrap',
                }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══ §03 PERSONAL STATEMENT ════════════════════════════════════
          Reference: full-width centered oversized editorial statement.
          Two-tone: bright white first clause, dark gray trail.
          No buzzwords (R-16). Specific to this developer.
          RHYTHM 3: composition varies from hero (centered vs left-heavy).
      ════════════════════════════════════════════════════════════ */}
      <section
        className="px-6 md:px-10 py-32 md:py-44 g-reveal"
        style={{ background: '#050505' }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <p
            style={{
              fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
              fontWeight: 300,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              fontSize: 'clamp(2rem, 5vw, 5rem)',
            }}
          >
            <span style={{ color: '#E8E8EA' }}>
              I CREATE DIGITAL EXPERIENCES THAT FEEL DIFFERENT,
            </span>
            {' '}
            <span style={{ color: '#2C2C2C' }}>
              THINK DIFFERENT, AND INSPIRE THE FUTURE.
            </span>
          </p>
        </div>
      </section>

      {/* ══ §04 ABOUT / CREATIVE PHILOSOPHY ══════════════════════════
          Reference: asymmetric two-column.
          Left: large editorial heading + short bio + CTA.
          Right: cinematic portrait (second instance, treated differently).
          RHYTHM 3: asymmetric vs prior centered section.
      ════════════════════════════════════════════════════════════ */}
      <section
        className="px-6 md:px-10 py-24 md:py-36"
        style={{ background: '#0A0A0A', borderTop: '1px solid #242424' }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-10 items-start">

          {/* Left column */}
          <div className="g-reveal">
            <span className="mono-label block mb-10">About</span>

            {/* Asymmetric heading: first line bright, second muted */}
            <h2
              style={{
                fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
                fontWeight: 300,
                letterSpacing: '-0.04em',
                lineHeight: 0.92,
                fontSize: 'clamp(2.2rem, 5.5vw, 5.5rem)',
                marginBottom: '2.5rem',
              }}
            >
              <span style={{ color: '#E8E8EA', display: 'block' }}>DESIGN &amp; TECHNOLOGY:</span>
              <span style={{ color: '#2C2C2C', display: 'block' }}>ONE VISION,</span>
              <span style={{ color: '#1A1A1A', display: 'block' }}>ENDLESS POSSIBILITIES.</span>
            </h2>

            <p style={{ color: '#777777', fontSize: '0.82rem', lineHeight: 1.75, fontWeight: 300, maxWidth: '34ch', marginBottom: '2rem' }}>
              Informatics Engineering graduate with hands-on experience in
              building web applications, REST API integration, database management,
              and IT support. Certified in Web Development with a passion for
              continuous learning.
            </p>
            <p style={{ color: '#393939', fontSize: '0.78rem', lineHeight: 1.7, fontWeight: 300, maxWidth: '36ch', marginBottom: '2.5rem' }}>
              Proficient across the full stack: PHP Laravel, React.js, Vue.js,
              MySQL, and UI/UX Design. Open to Software Engineering, Web Development,
              Front-End, and IT opportunities.
            </p>

            <Link to="/about" className="btn-white">
              Explore My Work <ArrowUpRight size={12} />
            </Link>
          </div>

          {/* Right column: cinematic portrait, different treatment from hero */}
          <div className="g-reveal">
            <div
              className="relative overflow-hidden"
              style={{
                borderRadius: '4px',
                aspectRatio: '3/4',
                maxHeight: '580px',
              }}
            >
              <img
                src={portrait}
                alt={profile.name}
                className="w-full h-full object-cover object-top"
                style={{
                  filter: 'grayscale(100%) contrast(1.2) brightness(0.6)',
                }}
              />
              {/* Warm light from bottom-right — depth only (not glow decoration) */}
              <div
                aria-hidden
                style={{
                  position: 'absolute', inset: 0,
                  background: 'radial-gradient(ellipse 60% 40% at 90% 90%, rgba(80,50,20,0.25), transparent)',
                }}
              />
              {/* Border overlay */}
              <div
                aria-hidden
                style={{
                  position: 'absolute', inset: 0,
                  border: '1px solid #242424',
                  borderRadius: '4px',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══ §05 SELECTED WORKS ════════════════════════════════════════
          Reference: editorial project showcase.
          NOT a 3-column card grid (R-05, R-14).
          Large alternating project blocks with number, title, year.
          Each block is visually distinct (RHYTHM 3: varied composition).
      ════════════════════════════════════════════════════════════ */}
      <section
        className="px-6 md:px-10 py-24 md:py-36"
        style={{ background: '#050505', borderTop: '1px solid #242424' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-baseline justify-between mb-14">
            <span className="mono-label">Selected Works</span>
            <Link
              to="/projects"
              style={{ color: '#555555', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}
              className="hover:text-[#E8E8EA] transition-colors focus-visible:outline-none focus-visible:underline"
            >
              All projects
            </Link>
          </div>

          {/* Project list — editorial rows, not cards */}
          <ul className="flex flex-col">
          {featured.map((project, i) => (
            <li key={project.slug} className="g-reveal project-block">
              <Link
                to={`/projects/${project.slug}`}
                className="group flex flex-col md:flex-row md:items-center gap-6 md:gap-10 pb-14"
                style={{ textDecoration: 'none' }}
              >
                {/* Project icon replacing the number text */}
                {(() => {
                  const IconComponent = PROJECT_ICONS[i % PROJECT_ICONS.length] || FolderGit2
                  return (
                    <div className="shrink-0 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-2xl border border-[#242424] bg-[#0A0A0A] text-[#666666] group-hover:text-[#E8E8EA] group-hover:border-[#3E3E3E] group-hover:bg-[#121212] transition-all duration-300 self-start md:self-center">
                      <IconComponent className="w-6 h-6 md:w-7 md:h-7" strokeWidth={1.5} />
                    </div>
                  )
                })()}

                {/* Content */}
                <div className="flex-1">
                  {/* Category + year */}
                  <div className="flex items-center gap-4 mb-4">
                    <span className="mono-label">{project.category}</span>
                    <span style={{ color: '#393939', fontSize: '0.6rem', letterSpacing: '0.1em' }}>
                      {project.year}
                    </span>
                  </div>

                  {/* Title — large, thin */}
                  <h2
                    className="group-hover:text-[#D5D5D5] transition-colors duration-300"
                    style={{
                      fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
                      fontWeight: 300,
                      letterSpacing: '-0.03em',
                      lineHeight: 1,
                      fontSize: 'clamp(1.8rem, 4.5vw, 4.5rem)',
                      color: '#E8E8EA',
                      marginBottom: '1rem',
                    }}
                  >
                    {project.title}
                  </h2>

                  <p style={{ color: '#555555', fontSize: '0.78rem', fontWeight: 300, lineHeight: 1.65, maxWidth: '50ch' }}>
                    {project.shortDesc}
                  </p>
                </div>

                {/* Arrow — direction cue for clickable row (R-08: written purpose) */}
                <div className="shrink-0 self-start md:self-center">
                  <ArrowUpRight
                    size={18}
                    style={{ color: '#2C2C2C' }}
                    className="group-hover:text-[#E8E8EA] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
        </div>
      </section>

      {/* ══ §06 CONTACT (also acts as footer) ════════════════════════
          Reference: minimal closing, oversized headline.
          Real email and social links only (R-26, R-36).
          Not a 4-column template footer (R-05).
          RHYTHM 3: full-bleed centered vs prior left-heavy section.
      ════════════════════════════════════════════════════════════ */}
      <section
        className="px-6 md:px-10 pt-24 md:pt-36 pb-14"
        style={{ background: '#0A0A0A', borderTop: '1px solid #242424' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="g-reveal mb-20">
          <span className="mono-label block mb-10">Contact</span>

          {/* Oversized headline */}
          <h2
            style={{
              fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
              fontWeight: 300,
              letterSpacing: '-0.04em',
              lineHeight: 0.9,
              fontSize: 'clamp(3rem, 9vw, 10rem)',
              color: '#E8E8EA',
              marginBottom: '2.5rem',
            }}
          >
            HAVE AN IDEA?<br />
            <span style={{ color: '#242424' }}>LET'S MAKE IT REAL.</span>
          </h2>

          {/* Contact actions */}
          <div className="flex flex-col sm:flex-row items-start gap-5">
            <Link to="/contact" className="btn-white">
              Start a Conversation <ArrowUpRight size={12} />
            </Link>
            <a
              href={`mailto:${profile.email}`}
              style={{ color: '#555555', fontSize: '0.75rem', letterSpacing: '0.08em', fontWeight: 300 }}
              className="hover:text-[#E8E8EA] transition-colors self-center focus-visible:outline-none focus-visible:underline"
            >
              {profile.email}
            </a>
          </div>
        </div>

        {/* Footer bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 pt-10 pb-16 sm:pb-4"
          style={{ borderTop: '1px solid #242424' }}
        >
          <span style={{ color: '#555555', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            {profile.name} / {new Date().getFullYear()}
          </span>

          {/* Social links with icons & safe margin from BackToTop button (mr-0 sm:mr-16 md:mr-20) */}
          <div className="flex items-center flex-wrap gap-2.5 sm:gap-3 mr-0 sm:mr-16 md:mr-20">
            <a
              href="https://github.com/manntoc"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#242424] bg-[#0A0A0A] hover:bg-[#141414] hover:border-[#3E3E3E] text-[#888888] hover:text-[#E8E8EA] text-xs font-mono tracking-wider transition-all"
            >
              <GithubIcon />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/manntoc/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#242424] bg-[#0A0A0A] hover:bg-[#141414] hover:border-[#3E3E3E] text-[#888888] hover:text-[#E8E8EA] text-xs font-mono tracking-wider transition-all"
            >
              <LinkedinIcon />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://wa.me/6281330059485"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#242424] bg-[#0A0A0A] hover:bg-[#141414] hover:border-[#3E3E3E] text-[#888888] hover:text-[#E8E8EA] text-xs font-mono tracking-wider transition-all"
            >
              <WhatsappIcon />
              <span>WhatsApp</span>
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#242424] bg-[#0A0A0A] hover:bg-[#141414] hover:border-[#3E3E3E] text-[#888888] hover:text-[#E8E8EA] text-xs font-mono tracking-wider transition-all"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email</span>
            </a>
          </div>
        </div>
        </div>
      </section>

    </div> // end .site-canvas
  )
}
