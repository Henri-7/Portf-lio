import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import axe from 'axe-core'
import App from '../App'

function open(path = '/') {
  return render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>)
}

describe('Navegação e conteúdo', () => {
  it('abre e fecha o menu com Escape, devolvendo o foco ao botão', async () => {
    const user = userEvent.setup()
    open()
    const toggle = screen.getByRole('button', { name: 'Abrir menu' })
    await user.click(toggle)
    expect(toggle.getAttribute('aria-expanded')).toBe('true')
    await user.keyboard('{Escape}')
    expect(toggle.getAttribute('aria-expanded')).toBe('false')
    expect(document.activeElement).toBe(toggle)
  })

  it('navega por âncora, fecha o menu e atualiza o estado ativo', async () => {
    const user = userEvent.setup()
    open()
    await user.click(screen.getByRole('button', { name: 'Abrir menu' }))
    const nav = screen.getByRole('navigation', { name: 'Navegação principal' })
    await user.click(within(nav).getByRole('link', { name: 'Projetos' }))
    expect(screen.getByRole('button', { name: 'Abrir menu' }).getAttribute('aria-expanded')).toBe('false')
    expect(within(nav).getByRole('link', { name: 'Projetos' }).getAttribute('aria-current')).toBe('location')
    await waitFor(() => expect(document.activeElement?.id).toBe('projetos'))
  })

  it('abre o estudo de caso e retorna à seção de projetos', async () => {
    const user = userEvent.setup()
    open()
    await user.click(screen.getAllByRole('link', { name: /Conhecer o projeto/ })[0])
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('ALGORIX')
    await waitFor(() => expect(document.title).toContain('ALGORIX'))
    await user.click(screen.getByRole('link', { name: 'Voltar aos projetos' }))
    await waitFor(() => expect(document.activeElement?.id).toBe('projetos'))
  })

  it('mantém informações ausentes e links não disponíveis fora das ações', () => {
    open()
    const whatsapp = screen.getByRole('link', { name: /WhatsApp/ })
    expect(whatsapp.getAttribute('href')).toBe('https://wa.me/5535984752062')
    expect(whatsapp.getAttribute('target')).toBe('_blank')
    expect(whatsapp.getAttribute('rel')).toContain('noopener')
    expect(document.querySelector('a[href^="mailto:"]')).toBeNull()
    const linkedin = screen.getByRole('link', { name: /LinkedIn/ })
    expect(linkedin.getAttribute('href')).toBe('https://www.linkedin.com/in/henrique-rodrigues-a4194a351/')
    expect(linkedin.getAttribute('target')).toBe('_blank')
    expect(linkedin.querySelector('img')).toBeNull()
    expect(document.querySelector('form')).toBeNull()
  })

  it('apresenta os dois projetos públicos e recomenda outro estudo de caso', async () => {
    const user = userEvent.setup()
    open()
    expect(screen.getAllByRole('article')).toHaveLength(2)
    expect(screen.queryByText(/NeuroLab/i)).toBeNull()
    await user.click(screen.getAllByRole('link', { name: /Conhecer o projeto/ })[0])
    expect(document.querySelector('.next-project a[href="/projetos/algorix"]')).toBeNull()
    expect(screen.getByRole('link', { name: 'Barbearia Elite' }).getAttribute('href')).toBe('/projetos/barbearia-elite')
    expect(screen.queryByText(/NeuroLab/i)).toBeNull()
  })

  it('abre a Barbearia Elite com o site correto e permite continuar para ALGORIX', async () => {
    const user = userEvent.setup()
    open()
    await user.click(screen.getByRole('link', { name: 'Ver estudo de caso de Barbearia Elite' }))
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Barbearia Elite')
    expect(screen.getByRole('link', { name: /Acessar site/ }).getAttribute('href')).toBe('https://site-barbeiro-eight.vercel.app/')
    expect(screen.getByRole('link', { name: 'ALGORIX' }).getAttribute('href')).toBe('/projetos/algorix')
    expect(document.querySelector('a[href*="github.com"]')).toBeNull()
  })

  it('não expõe o antigo estudo de caso do NeuroLab por acesso direto', async () => {
    open('/projetos/neurolab-digital')
    expect(screen.getByRole('heading', { name: 'Página não encontrada' })).toBeTruthy()
    expect(screen.queryByText(/NeuroLab/i)).toBeNull()
    await waitFor(() => expect(document.title).toBe('Página não encontrada — Henrique Rodrigues'))
  })

  it('trata caminhos desconhecidos, inclusive projetos inexistentes', () => {
    open('/projetos/projeto-inexistente')
    expect(screen.getByRole('heading', { name: 'Página não encontrada' })).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Voltar ao início' }).getAttribute('href')).toBe('/')
  })
})

describe('Acessibilidade estrutural', () => {
  for (const path of ['/', '/projetos/algorix', '/projetos/barbearia-elite', '/endereco-inexistente']) {
    it(`não apresenta violações detectáveis no DOM de ${path}`, async () => {
      const { container } = open(path)
      const result = await axe.run(container, { rules: { 'color-contrast': { enabled: false } } })
      expect(result.violations.map(item => `${item.id}: ${item.description}`)).toEqual([])
      expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
      expect(container.querySelectorAll('a[href="#"]')).toHaveLength(0)
      expect(container.querySelectorAll('a[href*="github.com"]')).toHaveLength(0)
      expect(container.querySelectorAll('.will-reveal')).toHaveLength(0)
    })
  }
})
