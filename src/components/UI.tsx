import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { Arrow } from './Icons'
import type { Project } from '../data/projects'

export function ExternalLink({ href, children, className = '', arrow = true }: { href: string; children: ReactNode; className?: string; arrow?: boolean }) {
  return <a href={href} className={className} target="_blank" rel="noopener noreferrer">{children}{arrow && <Arrow />}<span className="sr-only"> (abre em nova aba)</span></a>
}

export function ProjectVisual({ project, eager = false }: { project: Project; eager?: boolean }) {
  if (project.image) return <figure className="project-visual"><img src={project.image} alt={project.imageAlt} width="1425" height="990" loading={eager ? 'eager' : 'lazy'} decoding="async" /><figcaption className="sr-only">Captura real de {project.name}.</figcaption></figure>
  return <figure className="project-visual visual-pending"><figcaption>Captura de tela ainda não disponibilizada.</figcaption></figure>
}

export function ProjectLinks({ project, includeCase = false }: { project: Project; includeCase?: boolean }) {
  return <div className="project-links">
    {includeCase && <Link className="text-link" to={`/projetos/${project.slug}`}>Conhecer o projeto<Arrow direction="right" /></Link>}
    {project.live && <ExternalLink href={project.live} className="text-link">Acessar site</ExternalLink>}
  </div>
}
