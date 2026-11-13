// src/components/ui/CertificatesOverlay.tsx
// Full-screen overlay grouped by organization/company.
// Pull-in elastic transition + staggered card reveal + interactive canvas dot-grid.
import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Award, ExternalLink } from 'lucide-react'
import { certificateGroups } from '../../data/certificates'
import type { Certificate, IssuerGroup } from '../../data/certificates'

// ── Interactive dot grid canvas ──────────────────────────────────
function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -9999, y: -9999 })
  const raf = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const GAP = 32, R = 1.1, MAX = 130

    function resize() {
      if (!canvas) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    function draw() {
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const cols = Math.ceil(canvas.width / GAP) + 1
      const rows = Math.ceil(canvas.height / GAP) + 1
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * GAP, y = r * GAP
          const d = Math.hypot(x - mouse.current.x, y - mouse.current.y)
          const a = d < MAX ? 0.05 + 0.35 * (1 - d / MAX) : 0.05
          ctx.beginPath()
          ctx.arc(x, y, R, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(232,232,234,${a.toFixed(3)})`
          ctx.fill()
        }
      }
      raf.current = requestAnimationFrame(draw)
    }
    draw()

    function onMove(e: MouseEvent) {
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    function onLeave() { mouse.current = { x: -9999, y: -9999 } }
    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(raf.current)
      ro.disconnect()
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      aria-hidden="true"
    />
  )
}

// ── Tilt Card ────────────────────────────────────────────────────
function CertCard({
  cert,
  index,
  accentColor,
  onOpen,
}: {
  cert: Certificate
  index: number
  accentColor: string
  onOpen: (c: Certificate) => void
}) {
  const ref = useRef<HTMLDivElement>(null)

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current!
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(700px) rotateY(${x * 12}deg) rotateX(${-y * 9}deg) scale(1.02)`
  }
  function onLeave() {
    if (ref.current) {
      ref.current.style.transform = 'perspective(700px) rotateY(0deg) rotateX(0deg) scale(1)'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.45,
        delay: 0.15 + index * 0.04,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onClick={() => onOpen(cert)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onOpen(cert)}
        style={{ transition: 'transform 0.18s ease', willChange: 'transform' }}
        className="relative border border-white/8 bg-[#0A0A0A]/90 p-5 rounded-sm cursor-pointer group overflow-hidden h-full flex flex-col justify-between"
      >
        <span
          className="absolute -top-10 -left-10 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
          style={{ background: accentColor }}
          aria-hidden="true"
        />

        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[0.6rem] font-mono text-white/30 tracking-widest">{cert.year}</span>
            {cert.note && (
              <span className="text-[0.55rem] font-mono text-white/40 border border-white/5 px-1.5 py-0.5 rounded-sm">
                {cert.note}
              </span>
            )}
          </div>

          <Award size={18} style={{ color: accentColor }} strokeWidth={1.5} className="mb-3" />

          <h4 className="text-xs font-light text-[#E8E8EA] leading-snug tracking-tight mb-1 group-hover:text-white transition-colors">
            {cert.title}
          </h4>
        </div>

        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[0.6rem] font-mono text-white/25 group-hover:text-white/50 transition-colors">
          <span className="uppercase tracking-widest">PDF Document</span>
          <ExternalLink size={10} />
        </div>
      </div>
    </motion.div>
  )
}

// ── Lightbox PDF Modal ───────────────────────────────────────────
function PdfLightbox({ cert, onClose }: { cert: Certificate; onClose: () => void }) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])

  const src = `/certificates/${cert.file}`

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        className="relative z-10 w-full max-w-4xl flex flex-col"
        style={{ height: 'min(88vh, 780px)' }}
        initial={{ scale: 0.86, opacity: 0, y: 28 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 12 }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-start justify-between mb-3 px-1">
          <div>
            <p className="text-[0.6rem] font-mono tracking-widest uppercase text-white/30 mb-1">{cert.issuer}</p>
            <h2 className="text-base font-light text-[#E8E8EA] tracking-tight">{cert.title}</h2>
          </div>
          <div className="flex items-center gap-3 ml-4 shrink-0">
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.6rem] font-mono tracking-widest uppercase text-white/30 hover:text-white/70 transition-colors inline-flex items-center gap-1.5"
            >
              <ExternalLink size={11} /> Open PDF
            </a>
            <button
              onClick={onClose}
              aria-label="Close PDF viewer"
              className="w-7 h-7 border border-white/10 flex items-center justify-center hover:border-white/30 transition-colors rounded-sm"
            >
              <X size={13} className="text-white/50" />
            </button>
          </div>
        </div>

        <div className="flex-1 border border-white/10 rounded-sm overflow-hidden bg-[#111]">
          <iframe src={`${src}#toolbar=0&navpanes=0`} className="w-full h-full" title={cert.title} />
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Colors per organization ──────────────────────────────────────
const ORG_ACCENTS: Record<string, string> = {
  'PT Rexline Engineering Indonesia': '#10b981',
  'BNSP':                             '#6366f1',
  'Educa Studio & GameLab':           '#3b82f6',
  'Karier.mu by Sekolah.mu':          '#f59e0b',
  'Politeknik Negeri Jember':         '#ec4899',
  'Kementerian Kominfo RI':           '#06b6d4',
  'Universitas STEKOM':               '#8b5cf6',
}

// ── Main Overlay ─────────────────────────────────────────────────
interface Props {
  open: boolean
  onClose: () => void
}

export function CertificatesOverlay({ open, onClose }: Props) {
  const [selectedOrg, setSelectedOrg] = useState<string>('ALL')
  const [activePdf, setActivePdf]     = useState<Certificate | null>(null)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) {
      setSelectedOrg('ALL')
      setActivePdf(null)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !activePdf) onClose()
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [open, activePdf, onClose])

  const openPdf  = useCallback((c: Certificate) => setActivePdf(c), [])
  const closePdf = useCallback(() => setActivePdf(null), [])

  const visibleGroups: IssuerGroup[] =
    selectedOrg === 'ALL'
      ? certificateGroups
      : certificateGroups.filter((g) => g.name === selectedOrg)

  const totalCerts = certificateGroups.reduce((acc, g) => acc + g.certificates.length, 0)

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/75 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Dialog root */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4"
            aria-modal="true"
            role="dialog"
            aria-label="Certificates grouped by organization"
          >
            {/* Panel utama pull-in / scale-in */}
            <motion.div
              className="relative w-full h-full md:w-[96vw] md:h-[94vh] md:rounded-sm overflow-hidden bg-[#050505] border border-white/8 flex flex-col"
              initial={{ scale: 0.88, opacity: 0, y: 48 }}
              animate={{ scale: 1,    opacity: 1, y: 0  }}
              exit={{    scale: 0.92, opacity: 0, y: 32 }}
              transition={{
                duration: 0.55,
                ease: [0.16, 1, 0.3, 1], // elastis cubic-bezier
              }}
            >
              {/* Dot Grid background */}
              <div className="absolute inset-0 pointer-events-none opacity-50">
                <DotGrid />
              </div>

              {/* ── Header ── */}
              <motion.div
                className="relative z-10 flex items-start justify-between px-6 md:px-10 pt-7 pb-5 border-b border-white/5 shrink-0"
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <div>
                  <span className="text-[0.6rem] font-mono tracking-widest uppercase text-white/30 mb-1.5 block">
                    credentials &bull; {totalCerts} documents
                  </span>
                  <h2
                    className="font-normal tracking-[-0.04em] leading-none text-[#E8E8EA]"
                    style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)' }}
                  >
                    CERTIFICATES BY ISSUER.
                  </h2>
                </div>

                <button
                  onClick={onClose}
                  aria-label="Close certificates"
                  className="mt-1 w-10 h-10 border border-white/10 rounded-sm flex items-center justify-center hover:border-white/30 hover:bg-white/5 transition-colors group"
                >
                  <X size={16} className="text-white/40 group-hover:text-white/80 transition-colors" />
                </button>
              </motion.div>

              {/* ── Organization selector tabs ── */}
              <motion.div
                className="relative z-10 flex items-center gap-2 px-6 md:px-10 py-3.5 border-b border-white/5 shrink-0 overflow-x-auto no-scrollbar"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.26, duration: 0.4 }}
              >
                <button
                  onClick={() => setSelectedOrg('ALL')}
                  className={[
                    'text-[0.6rem] font-mono tracking-widest uppercase px-3 py-1.5 border rounded-sm transition-all whitespace-nowrap shrink-0',
                    selectedOrg === 'ALL'
                      ? 'border-white/30 text-white bg-white/5'
                      : 'border-white/8 text-white/30 hover:border-white/20 hover:text-white/60',
                  ].join(' ')}
                >
                  All Organizations ({totalCerts})
                </button>

                {certificateGroups.map((g) => {
                  const active = selectedOrg === g.name
                  const dotColor = ORG_ACCENTS[g.name] || '#888'
                  return (
                    <button
                      key={g.name}
                      onClick={() => setSelectedOrg(g.name)}
                      className={[
                        'text-[0.6rem] font-mono tracking-widest uppercase px-3 py-1.5 border rounded-sm transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5',
                        active
                          ? 'border-white/30 text-white bg-white/5'
                          : 'border-white/8 text-white/30 hover:border-white/20 hover:text-white/60',
                      ].join(' ')}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: dotColor }} />
                      {g.shortName} ({g.certificates.length})
                    </button>
                  )
                })}
              </motion.div>

              {/* ── Scrollable group list ── */}
              <div
                className="relative z-10 flex-1 overflow-y-auto px-6 md:px-10 py-8 space-y-12"
                style={{ scrollbarWidth: 'thin', scrollbarColor: '#242424 transparent' }}
              >
                {visibleGroups.map((group, groupIdx) => {
                  const accent = ORG_ACCENTS[group.name] || '#888'
                  return (
                    <motion.section
                      key={group.name}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.28 + groupIdx * 0.06,
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="border-t border-white/5 pt-6 first:border-t-0 first:pt-0"
                    >
                      {/* Group Header */}
                      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 mb-5">
                        <div className="flex items-center gap-3">
                          <span
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{ background: accent }}
                            aria-hidden="true"
                          />
                          <h3 className="text-base font-normal text-[#E8E8EA] tracking-tight flex items-center gap-2">
                            {group.name}
                            <span className="text-[0.6rem] font-mono text-white/30 px-2 py-0.5 border border-white/5 rounded-sm">
                              {group.type}
                            </span>
                          </h3>
                        </div>
                        <p className="text-xs text-white/30 font-light max-w-md pl-5 md:pl-0">
                          {group.description}
                        </p>
                      </div>

                      {/* Cards Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                        {group.certificates.map((cert, certIdx) => (
                          <CertCard
                            key={cert.id}
                            cert={cert}
                            index={certIdx}
                            accentColor={accent}
                            onOpen={openPdf}
                          />
                        ))}
                      </div>
                    </motion.section>
                  )
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* Lightbox PDF di atas overlay */}
          <AnimatePresence>
            {activePdf && <PdfLightbox cert={activePdf} onClose={closePdf} />}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  )
}
