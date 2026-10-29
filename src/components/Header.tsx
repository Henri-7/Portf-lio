import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { navigation } from '../data/site'
import { Arrow } from './Icons'

export default function Header() {
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('inicio')
  const toggle = useRef<HTMLButtonElement>(null)
  const header = useRef<HTMLElement>(null)
  const isHome = location.pathname === '/'

  useEffect(() => {
    if (!open) return
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') { setOpen(false); toggle.current?.focus() }
    }
    function outside(event: PointerEvent) {
      if (!header.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', outside)
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', outside) }
  }, [open])

  useEffect(() => {
    if (!isHome || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id) })
    }, { rootMargin: '-20% 0px -50% 0px', threshold: 0 })
    navigation.forEach(({ id }) => { const section = document.getElementById(id); if (section) observer.observe(section) })
    return () => observer.disconnect()
  }, [isHome])

  return <header className="site-header" ref={header}>
    <div className="container header-inner">
      <Link to="/#inicio" className="brand" aria-label="Henrique Rodrigues — início" onClick={() => setOpen(false)}>Henrique Rodrigues</Link>
      <button className={`menu-toggle${open ? ' is-open' : ''}`} type="button" aria-expanded={open} aria-controls="main-navigation" aria-label={open ? 'Fechar menu' : 'Abrir menu'} ref={toggle} onClick={() => setOpen(!open)}><span /><span /></button>
      <nav id="main-navigation" className={`main-navigation${open ? ' is-open' : ''}`} aria-label="Navegação principal">
        {navigation.map(({ id, label }) => <Link key={id} to={`/#${id}`} className={id === 'contato' ? 'nav-contact' : ''} aria-current={(isHome && active === id) ? 'location' : undefined} onClick={() => { setActive(id); setOpen(false) }}>{label}{id === 'contato' && <Arrow />}</Link>)}
      </nav>
    </div>
  </header>
}
