import { useEffect, useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import CaseStudy from './pages/CaseStudy'
import NotFound from './pages/NotFound'
import { projects } from './data/projects'
import { site } from './data/site'

function PageEffects() {
  const { pathname, hash, key } = useLocation()
  const previousPath = useRef<string | null>(null)
  useEffect(() => {
    const samePage = previousPath.current === pathname
    previousPath.current = pathname
    const project = projects.find(item => pathname === `/projetos/${item.slug}`)
    const title = project ? `${project.name} — Projeto de Henrique Rodrigues` : pathname === '/' ? `${site.name} — ${site.role}` : `Página não encontrada — ${site.name}`
    const description = project?.introduction ?? 'Portfólio de Henrique Rodrigues, desenvolvedor de software e graduando em Ciência da Computação na UNIFRAN. Conheça seus projetos e possibilidades de colaboração.'
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
    if (site.url) {
      let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
      if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.append(canonical) }
      canonical.href = new URL(pathname, site.url).href
      let ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]')
      if (!ogUrl) { ogUrl = document.createElement('meta'); ogUrl.setAttribute('property', 'og:url'); document.head.append(ogUrl) }
      ogUrl.content = canonical.href
      document.querySelector('meta[property="og:image"]')?.setAttribute('content', new URL('/images/henrique-960.webp', site.url).href)
    }
    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(hash.slice(1) || 'main')
      if (hash) target?.scrollIntoView({ behavior: samePage && !window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'smooth' : 'instant', block: 'start' })
      else window.scrollTo({ top: 0, behavior: 'instant' })
      if (target) { if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true }) }
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash, key])

  useEffect(() => {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target) } })
    }, { threshold: 0.06 })
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]')
    elements.forEach(element => { element.classList.add('will-reveal'); observer.observe(element) })
    return () => { observer.disconnect(); elements.forEach(element => element.classList.remove('will-reveal')) }
  }, [pathname])
  return null
}

export default function App() {
  const { pathname } = useLocation()
  return <><a className="skip-link" href="#main">Pular para o conteúdo</a><PageEffects /><Header key={pathname} /><Routes><Route path="/" element={<Home />} /><Route path="/projetos/:slug" element={<CaseStudy />} /><Route path="*" element={<NotFound />} /></Routes><Footer /></>
}
