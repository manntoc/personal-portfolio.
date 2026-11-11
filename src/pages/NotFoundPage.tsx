// src/pages/NotFoundPage.tsx
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { PageWrapper } from '../components/layout/PageWrapper'

export default function NotFoundPage() {
  return (
    <PageWrapper>
      <section
        className="min-h-screen flex flex-col items-center justify-center text-center px-6"
        style={{ background: 'linear-gradient(170deg, #050505 0%, #071329 100%)' }}
        aria-label="Page not found"
      >
        <span className="font-mono text-xs text-electric-blue/60 tracking-widest uppercase mb-6">404</span>
        <h1 className="font-display text-5xl md:text-7xl font-extralight text-off-white leading-none tracking-tighter mb-6">
          Page not found.
        </h1>
        <p className="text-muted-gray text-sm max-w-sm mb-10 leading-relaxed">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/" className="btn-primary">
          <ArrowLeft size={15} />
          Back to Home
        </Link>
      </section>
    </PageWrapper>
  )
}
