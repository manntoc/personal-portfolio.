// src/components/ui/ProjectCard.tsx
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '../../data/projects'

interface Props {
  project: Project
  index?: number
}

export function ProjectCard({ project, index = 0 }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to={`/projects/${project.slug}`}
        className="group block outline-none focus-visible:ring-2 focus-visible:ring-electric-blue focus-visible:ring-offset-2 focus-visible:ring-offset-pure-black rounded-sm"
        aria-label={`View ${project.title} project details`}
      >
        {/* Cover */}
        <div className="relative overflow-hidden rounded-sm aspect-video mb-5">
          <div
            className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
            style={{ background: project.coverGradient }}
          />
          {/* Accent glow on hover — single element, R-13 compliant */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(37,99,235,0.1) 0%, transparent 70%)' }}
          />
          {/* Arrow indicator */}
          <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 group-hover:-translate-y-0 -translate-x-2 translate-y-2">
            <ArrowUpRight size={16} className="text-light-blue" />
          </div>
          {/* Placeholder label — R-23, R-38: honest about no real image */}
          <div className="absolute bottom-4 left-4">
            <span className="text-xs text-white/20 font-mono">[COVER IMAGE]</span>
          </div>
        </div>

        {/* Meta row */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-electric-blue font-mono tracking-widest uppercase">
            {project.category}
          </span>
          <span className="text-xs text-muted-gray font-mono">{project.year}</span>
        </div>

        {/* Title */}
        <h3 className="font-display text-xl md:text-2xl font-light text-off-white group-hover:text-light-blue transition-colors duration-300 leading-tight mb-2">
          {project.title}
        </h3>

        {/* Short desc */}
        <p className="text-sm text-muted-gray leading-relaxed line-clamp-2">{project.shortDesc}</p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mt-4">
          {project.techStack.slice(0, 4).map(tech => (
            <span
              key={tech}
              className="text-xs font-mono text-muted-gray/60 border border-white/5 px-2 py-0.5 rounded-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </Link>
    </motion.article>
  )
}
