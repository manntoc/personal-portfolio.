// src/pages/ProjectDetailPage.tsx
import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { PageWrapper } from '../components/layout/PageWrapper'
import { ScrollReveal } from '../components/ui/ScrollReveal'
import { getProjectBySlug, projects } from '../data/projects'

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = getProjectBySlug(slug ?? '')

  if (!project) return <Navigate to="/projects" replace />

  // Next project navigation
  const currentIdx = projects.findIndex(p => p.slug === slug)
  const nextProject = projects[(currentIdx + 1) % projects.length]

  return (
    <PageWrapper>
      {/* Project Hero */}
      <section
        className="pt-36 pb-16 border-b border-white/5"
        style={{ background: 'linear-gradient(170deg, #050505 0%, #071329 100%)' }}
        aria-labelledby="project-title"
      >
        <div className="max-w-5xl mx-auto px-6">
          {/* Back link */}
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted-gray hover:text-off-white transition-colors duration-200 mb-10 group"
          >
            <ArrowLeft size={14} className="transition-transform duration-200 group-hover:-translate-x-1" />
            All Projects
          </Link>

          {/* Meta */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-mono text-electric-blue tracking-widest uppercase">
              {project.category}
            </span>
            <span className="text-xs text-muted-gray/40">|</span>
            <span className="text-xs font-mono text-muted-gray">{project.year}</span>
          </div>

          {/* Title */}
          <h1
            id="project-title"
            className="font-display font-extralight leading-none tracking-tighter text-off-white"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}
          >
            {project.title}
          </h1>

          <p className="mt-6 text-muted-gray text-base md:text-lg leading-relaxed max-w-2xl">
            {project.shortDesc}
          </p>
        </div>
      </section>

      {/* Cover image */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div
          className="w-full aspect-video rounded-sm overflow-hidden relative"
          style={{ background: project.coverGradient }}
          aria-label="Project cover image placeholder"
        >
          <span className="absolute inset-0 flex items-center justify-center text-xs font-mono text-white/15">
            [COVER IMAGE — replace with real screenshot]
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-3 gap-16">

          {/* Main content — 2/3 */}
          <div className="md:col-span-2 space-y-16">

            <ScrollReveal>
              <h2 className="font-display text-xl font-light text-off-white mb-4 tracking-tight">
                Overview
              </h2>
              <p className="text-muted-gray leading-relaxed">{project.overview}</p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="font-display text-xl font-light text-off-white mb-4 tracking-tight">
                The Problem
              </h2>
              <p className="text-muted-gray leading-relaxed">{project.problem}</p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="font-display text-xl font-light text-off-white mb-4 tracking-tight">
                Goals
              </h2>
              <ul className="space-y-3">
                {project.goals.map((g, i) => (
                  <li key={i} className="flex gap-3 text-muted-gray text-sm leading-relaxed">
                    <span className="font-mono text-electric-blue/60 mt-0.5 shrink-0">0{i + 1}</span>
                    {g}
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="font-display text-xl font-light text-off-white mb-4 tracking-tight">
                Process
              </h2>
              <p className="text-muted-gray leading-relaxed">{project.process}</p>
            </ScrollReveal>

            {/* Gallery placeholders */}
            <ScrollReveal>
              <h2 className="font-display text-xl font-light text-off-white mb-6 tracking-tight">
                Screens
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.galleryGradients.map((g, i) => (
                  <div
                    key={i}
                    className="aspect-video rounded-sm relative overflow-hidden"
                    style={{ background: g }}
                    aria-label={`Project screenshot ${i + 1} placeholder`}
                  >
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-mono text-white/15">
                      [SCREENSHOT {i + 1}]
                    </span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="font-display text-xl font-light text-off-white mb-4 tracking-tight">
                Key Features
              </h2>
              <ul className="space-y-3">
                {project.keyFeatures.map((f, i) => (
                  <li key={i} className="flex gap-3 text-muted-gray text-sm leading-relaxed">
                    <span className="font-mono text-electric-blue/60 mt-0.5 shrink-0">+</span>
                    {f}
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="font-display text-xl font-light text-off-white mb-4 tracking-tight">
                Outcome
              </h2>
              <p className="text-muted-gray leading-relaxed">{project.outcome}</p>
            </ScrollReveal>

          </div>

          {/* Sidebar — 1/3 */}
          <aside className="space-y-10">
            <ScrollReveal delay={0.1}>
              <div className="border-t border-white/5 pt-6">
                <h3 className="text-xs font-mono text-muted-gray/50 tracking-widest uppercase mb-4">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map(tech => (
                    <span
                      key={tech}
                      className="text-xs font-mono text-off-white/70 border border-white/8 px-2.5 py-1 rounded-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="border-t border-white/5 pt-6">
                <h3 className="text-xs font-mono text-muted-gray/50 tracking-widest uppercase mb-2">
                  Year
                </h3>
                <p className="text-off-white font-mono">{project.year}</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="border-t border-white/5 pt-6">
                <h3 className="text-xs font-mono text-muted-gray/50 tracking-widest uppercase mb-2">
                  Category
                </h3>
                <p className="text-electric-blue text-sm font-mono">{project.category}</p>
              </div>
            </ScrollReveal>
          </aside>

        </div>

        {/* Next Project */}
        <div className="border-t border-white/5 mt-24 pt-12">
          <p className="text-xs font-mono text-muted-gray/40 tracking-widest uppercase mb-6">
            Next Project
          </p>
          <Link
            to={`/projects/${nextProject.slug}`}
            className="group flex items-center justify-between gap-4 hover:opacity-80 transition-opacity duration-200"
            aria-label={`Go to next project: ${nextProject.title}`}
          >
            <div>
              <span className="text-xs font-mono text-muted-gray">{nextProject.category} / {nextProject.year}</span>
              <h3 className="font-display text-2xl md:text-4xl font-extralight text-off-white leading-tight mt-1">
                {nextProject.title}
              </h3>
            </div>
            <ArrowRight size={28} className="text-muted-gray group-hover:text-light-blue group-hover:translate-x-2 transition-all duration-300 shrink-0" />
          </Link>
        </div>
      </div>
    </PageWrapper>
  )
}
