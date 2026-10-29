import { Link } from 'react-router-dom'
import { Arrow } from '../components/Icons'

export default function NotFound() {
  return <main id="main" className="not-found container" tabIndex={-1}><p className="eyebrow">Erro 404</p><h1>Página não encontrada</h1><p>Confira o endereço ou retorne ao portfólio.</p><Link className="button button-primary" to="/">Voltar ao início<Arrow direction="right" /></Link></main>
}
