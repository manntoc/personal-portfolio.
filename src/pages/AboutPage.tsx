// src/pages/AboutPage.tsx
// GSAP-driven timeline reveal. Each milestone animates in on scroll.
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PageWrapper } from '../components/layout/PageWrapper'
import { profile } from '../data/profile'
import portrait from '../assets/portrait.jpg'

gsap.registerPlugin(ScrollTrigger)

const JOURNEY = [
  {
    phase: 'Education',
    label: '01',
    title: 'Politeknik Negeri Jember — Teknik Informatika',
    body: 'Menempuh pendidikan sarjana terapan Teknik Informatika dengan capaian IPK 3.72/4.00. Memperdalam arsitektur perangkat lunak, algoritma, rekayasa web, analisis sistem, dan manajemen basis data relasional.',
  },
  {
    phase: 'Frontend Specialization',
    label: '02',
    title: 'Studi Independen di Educa Studio (Salatiga)',
    body: 'Mengembangkan kompetensi Web Frontend Developer melalui program bersertifikat di PT Educa Sisfomedia Indonesia. Membangun antarmuka web interaktif berbasis React, integrasi REST API backend, dan standarisasi UI/UX.',
  },
  {
    phase: 'Enterprise & Systems',
    label: '03',
    title: 'IT Staff & Web Engineering (Sidoarjo & Surabaya)',
    body: 'Menangani pengembangan dan pemeliharaan sistem web internal di PT. Bertumbuh Melejit Berkah, perancangan web app Digital360, serta dukungan teknis infrastruktur IT dan otorisasi akun SAP di PT. Rexline Engineering Indonesia.',
  },
  {
    phase: 'Creative Technologist',
    label: '04',
    title: 'Assya Vet Clinic — Digital Platform & Strategy',
    body: 'Merancang dan mengimplementasikan strategi digital terpadu untuk Assya Vet Clinic di Surabaya: manajemen konten omnichannel, optimasi Meta Ads terukur, dan penguatan brand identity klinik hewan.',
  },
]

const PHILOSOPHY = [
  'Build with intention, not just convention.',
  'Design is a form of communication — clarity first.',
  'Technology should feel invisible when it works.',
  'The best interfaces are the ones you don\'t have to think about.',
]

export default function AboutPage() {
  const reduced = useReducedMotion()
  const timelineRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  // Hero text reveal
  useEffect(() => {
    if (reduced || !heroRef.current) return
    const lines = heroRef.current.querySelectorAll('.hero-line')
    gsap.fromTo(lines,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, stagger: 0.1, ease: 'power4.out', delay: 0.15 }
    )
  }, [reduced])

  // Timeline items stagger
  useEffect(() => {
    if (reduced || !timelineRef.current) return
    const items = timelineRef.current.querySelectorAll('.timeline-item')

    items.forEach((item) => {
      const dot = item.querySelector('.timeline-dot')
      const content = item.querySelector('.timeline-content')

      // Dot pulse in
      gsap.fromTo(dot,
        { scale: 0, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)',
          scrollTrigger: { trigger: item, start: 'top 80%' },
        }
      )

      // Content slide in
      gsap.fromTo(content,
        { x: 30, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 80%' },
        }
      )
    })

    // Timeline line draw
    if (lineRef.current) {
      gsap.fromTo(lineRef.current,
        { scaleY: 0, transformOrigin: 'top' },
        {
          scaleY: 1, duration: 2.5, ease: 'power2.out',
          scrollTrigger: { trigger: timelineRef.current, start: 'top 80%' },
        }
      )
    }

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()) }
  }, [reduced])

  return (
    <PageWrapper>
      {/* ── HERO ── */}
      <section className="relative pt-40 pb-24 max-w-7xl mx-auto px-6 overflow-hidden">
        <div ref={heroRef}>
          <span className="hero-line text-xs font-mono text-electric-blue/70 tracking-widest uppercase mb-6 block" style={{ opacity: reduced ? 1 : 0 }}>
            about
          </span>
          <h1 className="hero-line section-heading mb-2" style={{ opacity: reduced ? 1 : 0, fontSize: 'clamp(2.8rem,7vw,6rem)' }}>
            THE STORY
          </h1>
          <h1 className="hero-line section-heading accent-text mb-2" style={{ opacity: reduced ? 1 : 0, fontSize: 'clamp(2.8rem,7vw,6rem)' }}>
            BEHIND
          </h1>
          <h1 className="hero-line section-heading mb-10" style={{ opacity: reduced ? 1 : 0, fontSize: 'clamp(2.8rem,7vw,6rem)' }}>
            THE WORK.
          </h1>
        </div>
        <div className="max-w-2xl">
          <p className="text-muted-gray text-base md:text-lg font-light leading-relaxed">
            Lulusan Teknik Informatika Politeknik Negeri Jember (IPK 3.72/4.00) dengan rekam jejak profesional di bidang web development, system analysis, IT support, dan strategi digital omnichannel.
          </p>
        </div>
        {/* Ambient glow */}
        <div className="absolute top-20 right-0 w-96 h-96 rounded-full pointer-events-none opacity-10"
          style={{ background: 'radial-gradient(circle, #2563EB 0%, transparent 70%)', filter: 'blur(80px)' }}
          aria-hidden="true"
        />
      </section>

      {/* ── PORTRAIT + INTRO ── */}
      <section className="max-w-7xl mx-auto px-6 pb-32 grid md:grid-cols-2 gap-16 items-center border-t border-white/5 pt-16">
        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative aspect-[3/4] max-w-xs mx-auto border border-white/10 rounded-sm overflow-hidden bg-[#0A0A0A]">
            <img
              src={portrait}
              alt={profile.name}
              className="w-full h-full object-cover object-center grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
            />
            {/* Corner accents */}
            <span className="absolute top-0 left-0 w-10 h-10 border-t border-l border-white/20 pointer-events-none" />
            <span className="absolute bottom-0 right-0 w-10 h-10 border-b border-r border-white/20 pointer-events-none" />
          </div>
        </motion.div>

        {/* Text */}
        <div>
          <span className="text-xs font-mono text-electric-blue/70 tracking-widest uppercase mb-4 block">Introduction</span>
          <h2 className="font-display font-extralight text-3xl md:text-4xl text-off-white tracking-tight mb-6 leading-tight">
            {profile.name}
          </h2>
          <p className="text-muted-gray text-sm leading-relaxed mb-4">
            Menggabungkan keahlian rekayasa web berbasis PHP Laravel, React.js, dan database MySQL dengan pengalaman operasional IT sistem enterprise serta manajemen strategi konten digital.
          </p>
          <p className="text-muted-gray/80 text-sm leading-relaxed mb-8">
            Berpengalaman mengembangkan sistem website internal, merancang arsitektur aplikasi berbasis REST API, hingga mengoptimalkan konversi kampanye iklan Meta Ads. Berorientasi pada stabilitas sistem, clean architecture, dan pengalaman pengguna yang seamless.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            {[
              ['Based in', profile.location],
              ['Focus', profile.role],
              ['Email', profile.email],
              ['Status', 'Open to work'],
            ].map(([label, value]) => (
              <div key={label} className="border border-white/5 p-3 rounded-sm neon-card">
                <span className="text-xs font-mono text-muted-gray/40 tracking-widest block mb-1">{label}</span>
                <span className="text-xs text-off-white/80">{value}</span>
              </div>
            ))}
          </div>
          <Link to="/contact" className="btn-primary text-sm py-3 inline-flex items-center gap-2 group">
            Work With Me
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* ── JOURNEY TIMELINE ── */}
      <section className="max-w-7xl mx-auto px-6 pb-40 border-t border-white/5 pt-16">
        <span className="text-xs font-mono text-electric-blue/70 tracking-widest uppercase mb-4 block">My Journey</span>
        <h2 className="section-heading mb-20" style={{ fontSize: 'clamp(2rem,5vw,4rem)' }}>
          HOW I GOT HERE.
        </h2>

        <div ref={timelineRef} className="relative">
          {/* Vertical line */}
          <div
            ref={lineRef}
            className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-electric-blue/40 via-electric-blue/10 to-transparent"
            style={{ transformOrigin: 'top', transform: reduced ? 'scaleY(1)' : 'scaleY(0)' }}
            aria-hidden="true"
          />

          <div className="space-y-20">
            {JOURNEY.map((item) => (
              <div key={item.phase} className="timeline-item pl-14 md:pl-20 relative">
                {/* Dot */}
                <div
                  className="timeline-dot absolute left-2 md:left-3.5 top-1 w-4 h-4 rounded-full border-2 border-electric-blue/60 bg-pure-black flex items-center justify-center"
                  style={{ transform: reduced ? 'scale(1)' : 'scale(0)', opacity: reduced ? 1 : 0 }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-electric-blue/60" />
                </div>

                {/* Content */}
                <div className="timeline-content" style={{ opacity: reduced ? 1 : 0 }}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-mono text-electric-blue/50 tracking-widest">{item.label}</span>
                    <span className="text-xs font-mono text-muted-gray/40 tracking-widest uppercase px-2 py-0.5 border border-white/5 rounded-sm">
                      {item.phase}
                    </span>
                  </div>
                  <h3 className="font-display font-light text-xl md:text-2xl text-off-white tracking-tight mb-4">
                    {item.title}
                  </h3>
                  <p className="text-muted-gray/70 text-sm leading-relaxed max-w-xl">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY ── */}
      <section className="max-w-7xl mx-auto px-6 pb-40 border-t border-white/5 pt-16">
        <span className="text-xs font-mono text-electric-blue/70 tracking-widest uppercase mb-4 block">My Philosophy</span>
        <div className="grid md:grid-cols-2 gap-6">
          {PHILOSOPHY.map((principle, _i) => (
            <motion.div
              key={_i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: _i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="neon-card p-6 group cursor-default"
            >
              <span className="text-xs font-mono text-electric-blue/30 mb-3 block">{String(_i + 1).padStart(2, '0')}</span>
              <p className="font-display font-light text-lg md:text-xl text-off-white/80 tracking-tight leading-tight group-hover:text-off-white transition-colors">
                {principle}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </PageWrapper>
  )
}
