export type CaseSection = { title: string; text?: string; items?: string[] }
export type Project = {
  slug: string
  name: string
  category: string
  summary: string
  status: string
  technologies: string[]
  image?: string
  imageAlt?: string
  imageSource?: string
  live?: string
  repository?: string
  introduction: string
  sections: CaseSection[]
}

export const projects: Project[] = [
  {
    slug: 'algorix',
    name: 'ALGORIX',
    category: 'Plataforma educacional interativa',
    summary: 'Plataforma interativa para aprender algoritmos de ordenação, busca, árvores e grafos, passo a passo.',
    status: 'Aplicação publicada',
    technologies: ['React', 'TypeScript', 'Vite'],
    image: '/images/algorix-home.webp',
    imageAlt: 'Captura real da página inicial do ALGORIX, com apresentação da plataforma e visualização de ordenação.',
    imageSource: 'https://github.com/Henri-7/ALGORIX/blob/main/docs/identidade-evidencias/home-desktop.jpg',
    live: 'https://algorix-visualizer.vercel.app/',
    repository: 'https://github.com/Henri-7/ALGORIX',
    introduction: 'Laboratório interativo de algoritmos de ordenação, busca, árvores e grafos.',
    sections: [
      { title: 'Objetivo', text: 'Facilitar o acompanhamento das mudanças nos dados, conectando cada operação à lógica do algoritmo.' },
      { title: 'Funcionalidades', items: ['Algoritmos de ordenação e busca.', 'Estruturas de árvores e grafos.', 'Controles de execução passo a passo.', 'Explicações e informações de complexidade.'] },
      { title: 'Implementação', text: 'Os algoritmos geram etapas independentes, permitindo avançar e retroceder sem reexecutar as operações. Interface em React e TypeScript, com Vite no desenvolvimento e build.' },
    ],
  },
  {
    slug: 'barbearia-elite',
    name: 'Barbearia Elite',
    category: 'Site e sistema de agendamento',
    summary: 'Site de barbearia com agendamento por etapas e integração com WhatsApp.',
    status: 'Site publicado',
    technologies: ['React', 'TypeScript', 'Node.js', 'Supabase'],
    image: '/images/barbearia-elite-home.webp',
    imageAlt: 'Captura real da página inicial da Barbearia Elite, com apresentação, fotografia e acesso ao agendamento.',
    imageSource: 'https://site-barbeiro-eight.vercel.app/',
    live: 'https://site-barbeiro-eight.vercel.app/',
    repository: 'https://github.com/Henri-7/site-barbeiro',
    introduction: 'Site de apresentação e agendamento, com serviços, galeria e integração com WhatsApp.',
    sections: [
      { title: 'Objetivo', text: 'Organizar a escolha de serviço, data e horário antes do envio da solicitação.' },
      { title: 'Funcionalidades', items: ['Apresentação de serviços e galeria de imagens.', 'Agendamento por etapas, com revisão dos dados e integração com WhatsApp.', 'Calendário e horários com regras de disponibilidade.'] },
      { title: 'Implementação', text: 'O agendamento valida os dados em etapas e revalida a disponibilidade no servidor antes de salvar. Frontend em React e TypeScript, API em Node.js e Express e dados em Supabase/PostgreSQL.' },
    ],
  },
]
