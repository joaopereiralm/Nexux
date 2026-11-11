// Conteúdo estático da landing page.
// ATENÇÃO: depoimentos, perfis de instrutores e valores são DEMONSTRATIVOS (projeto acadêmico).
// Eles aparecem na interface identificados como tal e não representam pessoas ou preços reais.

export const NAV_LINKS = [
  { href: '#beneficios', label: 'Benefícios' },
  { href: '#conteudo', label: 'Conteúdo' },
  { href: '#instrutores', label: 'Instrutores' },
  { href: '#planos', label: 'Planos' },
  { href: '#faq', label: 'FAQ' },
];

export const BENEFITS = [
  { icon: 'layers', title: 'Aprendizado em módulos', text: 'Do básico ao projeto final, em uma sequência de módulos e aulas organizada.' },
  { icon: 'trending', title: 'Progresso visível', text: 'Marque as aulas concluídas e acompanhe sua evolução no painel do aluno.' },
  { icon: 'target', title: 'Foco na prática', text: 'Um projeto final reúne pesquisa, wireframes, UI e prototipagem em um só trabalho.' },
  { icon: 'file', title: 'Materiais complementares', text: 'Conteúdo de apoio ligado às aulas para você aprofundar os temas.' },
  { icon: 'clock', title: 'No seu ritmo', text: 'Estude quando quiser e retome exatamente de onde parou.' },
  { icon: 'device', title: 'Em qualquer dispositivo', text: 'Interface responsiva, com navegação por teclado e temas claro e escuro.' },
];

export const MODULES = [
  { title: 'Introdução ao UX/UI Design', text: 'Diferenças entre UX e UI, o processo de design e o papel do designer.' },
  { title: 'Pesquisa com usuários', text: 'Entrevistas, questionários e como transformar dados em insights e personas.' },
  { title: 'Arquitetura da informação', text: 'Organização de conteúdo, mapas de navegação, fluxos e card sorting.' },
  { title: 'Wireframes', text: 'Esboços de baixa e média fidelidade para validar ideias rapidamente.' },
  { title: 'Fundamentos de UI Design', text: 'Tipografia, cor, grid, espaçamento e componentes visuais.' },
  { title: 'Prototipagem no Figma', text: 'Componentes, auto layout e protótipos interativos no Figma.' },
  { title: 'Usabilidade e heurísticas de Nielsen', text: 'As 10 heurísticas de usabilidade e como avaliar interfaces com elas.' },
  { title: 'Projeto final', text: 'Aplique todo o processo em um projeto completo para o seu portfólio.' },
];

export const INSTRUCTORS = [
  { icon: 'search', area: 'Pesquisa com usuários', text: 'Entrevistas, testes de usabilidade e síntese de descobertas.' },
  { icon: 'palette', area: 'UI Design e Figma', text: 'Tipografia, cor, componentes e prototipagem na prática.' },
  { icon: 'target', area: 'Usabilidade e projeto final', text: 'Avaliação heurística e orientação do projeto de portfólio.' },
];

export const TESTIMONIALS = [
  { quote: 'A divisão em módulos deixou o estudo organizado e fácil de acompanhar.' },
  { quote: 'Poder marcar as aulas concluídas e ver o progresso me manteve motivado.' },
  { quote: 'O projeto final ajuda a juntar tudo o que foi aprendido durante o curso.' },
];

// O preço do plano completo deve coincidir com o do curso cadastrado no seed (Etapa 9).
export const PLANS = [
  {
    id: 'gratuito',
    name: 'Conta gratuita',
    price: 0,
    description: 'Conheça a plataforma antes de se matricular.',
    features: ['Conteúdo programático completo', 'Página detalhada do curso', 'Cadastro e painel do aluno'],
    cta: 'Criar conta',
    featured: false,
  },
  {
    id: 'completo',
    name: 'Curso completo',
    price: 297,
    description: 'UX/UI Design — Do Zero ao Projeto.',
    features: [
      'Todos os módulos e aulas',
      'Acompanhamento de progresso',
      'Materiais complementares',
      'Projeto final',
    ],
    cta: 'Quero me matricular',
    featured: true,
  },
];

export const FAQS = [
  { q: 'Preciso ter experiência prévia?', a: 'Não. O curso parte do zero: começa nos conceitos de UX e UI e avança até o projeto final.' },
  { q: 'Como funciona a matrícula?', a: 'Este é um projeto acadêmico: a matrícula é simulada e registrada no sistema, sem pagamento real nem cobrança.' },
  { q: 'Quais ferramentas vou usar?', a: 'O módulo de prototipagem usa o Figma. Os demais módulos focam em método e conceitos, que valem para qualquer ferramenta.' },
  { q: 'Como acompanho meu progresso?', a: 'No ambiente de aprendizagem você marca cada aula como concluída, e o painel do aluno mostra a barra de progresso e a próxima aula.' },
  { q: 'Posso estudar pelo celular?', a: 'Sim. A interface é responsiva e funciona em celulares, tablets e computadores.' },
];
