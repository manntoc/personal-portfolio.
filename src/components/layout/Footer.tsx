// src/components/layout/Footer.tsx
import { useLocation } from 'react-router-dom'
import { Mail } from 'lucide-react'
import { profile } from '../../data/profile'

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

export function Footer() {
  const location = useLocation()
  if (location.pathname === '/') return null

  return (
    <footer className="w-full border-t border-[#242424] bg-[#050505] px-6 md:px-10 py-8 relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 pb-16 sm:pb-0">
        <span style={{ color: '#555555', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          {profile.name} / {new Date().getFullYear()}
        </span>

        {/* Social links with icons and clearance from BackToTop button (mr-16 md:mr-20) */}
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
    </footer>
  )
}
