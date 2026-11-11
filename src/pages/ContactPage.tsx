// src/pages/ContactPage.tsx
// Contact form with field validation + mailto fallback.
// No success state if no backend connected — honest feedback only.
import { useState, type FormEvent } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Globe, GitBranch, ExternalLink, Link2 } from 'lucide-react'
import { PageWrapper } from '../components/layout/PageWrapper'
import { MagneticButton } from '../components/ui/MagneticButton'
import { profile } from '../data/profile'
import { socials } from '../data/socials'

interface FormState { name: string; email: string; subject: string; message: string }
interface Errors { name?: string; email?: string; subject?: string; message?: string }

function validate(f: FormState): Errors {
  const e: Errors = {}
  if (!f.name.trim())    e.name    = 'Name is required.'
  if (!f.email.trim())   e.email   = 'Email is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = 'Enter a valid email.'
  if (!f.subject.trim()) e.subject = 'Subject is required.'
  if (f.message.trim().length < 10) e.message = 'Message must be at least 10 characters.'
  return e
}

const iconMap: Record<string, typeof Globe> = {
  github: GitBranch, linkedin: Link2, instagram: Globe, x: ExternalLink,
  behance: ExternalLink, dribbble: Globe,
}

export default function ContactPage() {
  const reduced = useReducedMotion()
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [k]: e.target.value }))
    if (errors[k]) setErrors(prev => ({ ...prev, [k]: undefined }))
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    // mailto fallback — opens client
    const body = encodeURIComponent(`Name: ${form.name}\n\n${form.message}`)
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(form.subject)}&body=${body}`
    setSubmitted(true)
  }

  const inputClass = (key: keyof FormState) =>
    `w-full bg-transparent border ${errors[key] ? 'border-red-500/50' : 'border-white/5 focus:border-electric-blue/40'} rounded-sm px-4 py-3 text-sm text-off-white placeholder-muted-gray/30 font-body outline-none transition-colors duration-200`

  return (
    <PageWrapper>
      {/* ── HERO ── */}
      <section className="relative pt-40 pb-20 max-w-7xl mx-auto px-6 overflow-hidden">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xs font-mono text-electric-blue/70 tracking-widest uppercase mb-6 block"
        >
          contact
        </motion.span>
        <div className="overflow-hidden">
          <motion.h1
            initial={reduced ? false : { y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="section-heading mb-2"
            style={{ fontSize: 'clamp(2.8rem,7vw,6rem)' }}
          >
            LET'S MAKE
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            initial={reduced ? false : { y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="section-heading accent-text mb-10"
            style={{ fontSize: 'clamp(2.8rem,7vw,6rem)' }}
          >
            SOMETHING MATTER.
          </motion.h1>
        </div>
        <div className="absolute top-20 right-0 w-96 h-96 rounded-full pointer-events-none opacity-10"
          style={{ background: 'radial-gradient(circle, #2563EB 0%, transparent 70%)', filter: 'blur(80px)' }}
          aria-hidden="true"
        />
      </section>

      {/* ── FORM + INFO ── */}
      <div className="max-w-7xl mx-auto px-6 pb-40 grid md:grid-cols-[1fr_1.6fr] gap-16 md:gap-24">
        {/* Left info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-muted-gray text-sm leading-relaxed mb-10">
            Open to collaborations, freelance projects, and full-time opportunities. Feel free to reach out — I'll get back to you within 48 hours.
          </p>

          {/* Email */}
          <div className="mb-8">
            <span className="text-xs font-mono text-muted-gray/40 tracking-widest uppercase block mb-2">Email</span>
            <a
              href={`mailto:${profile.email}`}
              className="text-off-white hover:text-light-blue transition-colors text-sm font-mono tracking-wide"
            >
              {profile.email}
            </a>
          </div>

          {/* Phone / WhatsApp */}
          <div className="mb-8">
            <span className="text-xs font-mono text-muted-gray/40 tracking-widest uppercase block mb-2">Phone / WhatsApp</span>
            <a
              href={`https://wa.me/62${profile.phone.replace(/^0/, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-off-white hover:text-light-blue transition-colors text-sm font-mono tracking-wide"
            >
              {profile.phone}
            </a>
          </div>

          {/* Location */}
          <div className="mb-10">
            <span className="text-xs font-mono text-muted-gray/40 tracking-widest uppercase block mb-2">Location</span>
            <span className="text-off-white/70 text-sm">{profile.location}</span>
          </div>

          {/* Social links */}
          <div>
            <span className="text-xs font-mono text-muted-gray/40 tracking-widest uppercase block mb-4">Find me on</span>
            <div className="flex flex-wrap gap-3">
              {socials.map(s => {
                const Icon = iconMap[s.id] ?? Globe
                return (
                  <a
                    key={s.id}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-mono text-muted-gray/60 hover:text-off-white px-3 py-2 border border-white/5 hover:border-electric-blue/30 rounded-sm transition-all duration-200"
                    aria-label={s.label}
                  >
                    <Icon size={12} />
                    {s.label}
                  </a>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Right form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {submitted ? (
            <div className="border border-electric-blue/20 rounded-sm p-10 text-center">
              <div className="w-12 h-12 rounded-full border border-electric-blue/40 flex items-center justify-center mx-auto mb-6">
                <span className="text-electric-blue text-xl">✓</span>
              </div>
              <h3 className="font-display font-light text-xl text-off-white mb-3">Email client opened</h3>
              <p className="text-muted-gray text-sm">Your default email client should have opened with a pre-filled message. If not, email me directly at <a href={`mailto:${profile.email}`} className="text-light-blue hover:underline">{profile.email}</a>.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-5">
              {/* Name */}
              <div>
                <label htmlFor="name" className="text-xs font-mono text-muted-gray/50 tracking-widest uppercase block mb-2">Name</label>
                <input
                  id="name" type="text" placeholder="Your name"
                  value={form.name} onChange={set('name')}
                  className={inputClass('name')}
                  autoComplete="name"
                />
                {errors.name && <p className="text-red-400/70 text-xs mt-1.5 font-mono">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="text-xs font-mono text-muted-gray/50 tracking-widest uppercase block mb-2">Email</label>
                <input
                  id="email" type="email" placeholder="your@email.com"
                  value={form.email} onChange={set('email')}
                  className={inputClass('email')}
                  autoComplete="email"
                />
                {errors.email && <p className="text-red-400/70 text-xs mt-1.5 font-mono">{errors.email}</p>}
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="text-xs font-mono text-muted-gray/50 tracking-widest uppercase block mb-2">Subject</label>
                <input
                  id="subject" type="text" placeholder="What is this about?"
                  value={form.subject} onChange={set('subject')}
                  className={inputClass('subject')}
                />
                {errors.subject && <p className="text-red-400/70 text-xs mt-1.5 font-mono">{errors.subject}</p>}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="text-xs font-mono text-muted-gray/50 tracking-widest uppercase block mb-2">Message</label>
                <textarea
                  id="message" placeholder="Tell me about your project, idea, or opportunity..."
                  value={form.message} onChange={set('message')}
                  rows={6}
                  className={`${inputClass('message')} resize-none`}
                />
                {errors.message && <p className="text-red-400/70 text-xs mt-1.5 font-mono">{errors.message}</p>}
              </div>

              <div className="pt-2">
                <MagneticButton className="w-full sm:w-auto">
                  <button type="submit" className="btn-primary group w-full sm:w-auto justify-center">
                    Send Message
                    <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </MagneticButton>
                <p className="text-xs text-muted-gray/30 mt-4 font-mono">
                  Opens your email client with a pre-filled message.
                </p>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </PageWrapper>
  )
}
