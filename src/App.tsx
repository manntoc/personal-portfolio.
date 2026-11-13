// src/App.tsx
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { BackToTop } from './components/ui/BackToTop'
import { useCustomCursor } from './hooks/useCustomCursor'

import HomePage from './pages/HomePage'
import ProjectsPage from './pages/ProjectsPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import AboutPage from './pages/AboutPage'
import SkillsPage from './pages/SkillsPage'
import ContactPage from './pages/ContactPage'
import NotFoundPage from './pages/NotFoundPage'
import CertificatesPage from './pages/CertificatesPage'

export default function App() {
  useCustomCursor()
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/"               element={<HomePage />} />
            <Route path="/projects"        element={<ProjectsPage />} />
            <Route path="/projects/:slug"  element={<ProjectDetailPage />} />
            <Route path="/about"           element={<AboutPage />} />
            <Route path="/skills"          element={<SkillsPage />} />
            <Route path="/contact"         element={<ContactPage />} />
            <Route path="/certificates"   element={<CertificatesPage />} />
            <Route path="*"               element={<NotFoundPage />} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
      <BackToTop />
    </div>
  )
}
