import { Link } from 'react-router-dom'
import { Arrow } from '../components/Icons'
import { ExternalLink, ProjectLinks, ProjectVisual } from '../components/UI'
import { projects } from '../data/projects'
import { site } from '../data/site'

const services = [
  { title: 'Sites e interfaces responsivas', text: 'Páginas claras e adaptadas a diferentes telas.' },
  { title: 'Aplicações web', text: 'Formulários, agendamentos e integração de dados.' },
  { title: 'Refinamento de interfaces', text: 'Ajustes de layout e navegação para facilitar o uso.' },
]

export default function Home() {
  return <main id="main" tabIndex={-1}>
    <section id="inicio" className="hero container" aria-labelledby="hero-title">
      <h1 id="hero-title">Henrique{' '}<span className="hero-surname">Rodrigues</span></h1>
      <div className="hero-copy">
        <p className="hero-role">Desenvolvedor de Software</p>
        <p className="hero-intro"><span>Graduando em Ciência da Computação na UNIFRAN.</span><span>Desenvolvo aplicações web e interfaces com foco em usabilidade.</span></p>
        <div className="hero-actions"><Link className="button button-primary" to="/#projetos">Ver projetos<Arrow direction="right" /></Link><Link className="button button-text" to="/#contato">Entrar em contato</Link></div>
      </div>
      <figure className="hero-portrait">
        <div className="portrait-frame"><img src="/images/henrique-960.webp" srcSet="/images/henrique-480.webp 480w, /images/henrique-960.webp 960w" sizes="(max-width: 600px) 75vw, 34vw" alt="Henrique Rodrigues, de óculos e camiseta verde, em um ambiente de iluminação natural." width="1792" height="2400" fetchPriority="high" decoding="async" /></div>
      </figure>
    </section>

    <section id="sobre" className="about section-space container" aria-labelledby="about-title">
      <div className="about-heading" data-reveal><h2 id="about-title">Desenvolvedor em formação.</h2></div>
      <div className="about-content" data-reveal><p>Busco oportunidades em tecnologia e projetos web para aplicar e ampliar meus conhecimentos.</p></div>
      <div className="education" data-reveal><h3>Ciência da Computação</h3><p>Universidade de Franca — UNIFRAN</p><span className="education-status">Graduação em andamento</span></div>
    </section>

    <section id="projetos" className="projects-section section-space" aria-labelledby="projects-title"><div className="container">
      <div className="section-heading projects-heading" data-reveal><h2 id="projects-title">Projetos em destaque</h2></div>
      {projects.map((project) => <article key={project.slug} className={`project-feature project-${project.slug}`} data-reveal aria-labelledby={`${project.slug}-title`}>
        <h3 className="project-name" id={`${project.slug}-title`}><Link to={`/projetos/${project.slug}`}>{project.name}</Link></h3>
        <ul className="tags" aria-label="Tecnologias">{project.technologies.map(tech => <li key={tech}>{tech}</li>)}</ul>
        <Link to={`/projetos/${project.slug}`} className="project-image-link" aria-label={`Ver estudo de caso de ${project.name}`}><ProjectVisual project={project} /></Link>
        <div className="project-description"><p>{project.summary}</p><ProjectLinks project={project} includeCase /></div>
      </article>)}
    </div></section>

    <section className="services section-space" aria-labelledby="services-title"><div className="container services-layout"><div className="services-intro" data-reveal><h2 id="services-title">Desenvolvimento web</h2></div><div className="service-list">{services.map(service => <div className="service-item" key={service.title} data-reveal><h3>{service.title}</h3><p>{service.text}</p></div>)}</div><Link className="button button-primary services-cta" to="/#contato">Conversar sobre um projeto<Arrow /></Link></div></section>

    <section id="contato" className="contact section-space container" aria-labelledby="contact-title"><div className="contact-heading" data-reveal><h2 id="contact-title">Vamos conversar</h2></div><div className="contact-links" data-reveal>
      <ExternalLink href={site.whatsapp.url} className="contact-link"><span>WhatsApp</span></ExternalLink>
      {site.email && <a href={`mailto:${site.email}`} className="contact-link"><span>{site.email}</span><Arrow /></a>}
      {site.linkedin && <ExternalLink href={site.linkedin} className="contact-link"><span>LinkedIn</span></ExternalLink>}
      {site.resume && <a href={site.resume} className="contact-link" download><span>Baixar currículo</span><Arrow direction="down" /></a>}
    </div></section>
  </main>
}
