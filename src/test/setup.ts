import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

afterEach(() => { cleanup() })
Object.defineProperty(window, 'matchMedia', { writable: true, value: vi.fn().mockImplementation((query: string) => ({ matches: query.includes('prefers-reduced-motion'), media: query, onchange: null, addListener: vi.fn(), removeListener: vi.fn(), addEventListener: vi.fn(), removeEventListener: vi.fn(), dispatchEvent: vi.fn() })) })
window.scrollTo = vi.fn()
Element.prototype.scrollIntoView = vi.fn()
// jsdom não implementa canvas. axe usa este contexto apenas para detectar fontes de ícones.
vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null)
