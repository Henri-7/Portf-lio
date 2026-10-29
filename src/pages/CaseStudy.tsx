import { Link, useParams } from 'react-router-dom'
import { projects } from '../data/projects'
import { Arrow } from '../components/Icons'
import { ProjectLinks, ProjectVisual } from '../components/UI'
import NotFound from './NotFound'

export default function CaseStudy() {
  const { slug } = useParams()
  const project = projects.find(item => item.slug === slug)
  if (!project) return <NotFound />
  const next = projects.find(item => item.slug !== project.slug)

  return <main id="main" className="case-page" tabIndex={-1}>
    <section className="case-hero container"><Link className="text-link case-back" to="/#projetos"><Arrow direction="left" />Voltar aos projetos</Link><div className="case-heading"><div><h1>{project.name}</h1><p className="case-intro">{project.introduction}</p></div><div className="case-facts"><div><span>Categoria</span><p>{project.category}</p></div><div><span>Estado do projeto</span><p>{project.status}</p></div><div><span>Tecnologias</span><ul className="tags">{project.technologies.map(tech => <li key={tech}>{tech}</li>)}</ul></div></div></div><ProjectLinks project={project} /></section>
    <div className="case-image-wrap"><div className="container"><ProjectVisual project={project} eager /></div></div>
    <section className="case-body container" aria-label={`Detalhes do projeto ${project.name}`}><aside><nav aria-label="Seções do estudo de caso">{project.sections.map((section, index) => <a key={section.title} href={`#detalhe-${index + 1}`}>{section.title}</a>)}</nav></aside><div className="case-content">{project.sections.map((section, index) => <section key={section.title} id={`detalhe-${index + 1}`} className="case-section" data-reveal><h2>{section.title}</h2>{section.text && <p>{section.text}</p>}{section.items && <ul>{section.items.map(item => <li key={item}>{item}</li>)}</ul>}</section>)}</div></section>
    <section className="next-project"><div className="container">{next && <Link className="project-next" to={`/projetos/${next.slug}`}>{next.name}<Arrow direction="right" /></Link>}<Link className="button button-primary" to="/#contato">Conversar sobre um projeto<Arrow /></Link></div></section>
  </main>
}
