import type { Question } from '../types/quiz';

export const questions: Question[] = [
  // Round 1 — Negócio
  {
    id: 1,
    level: 1,
    levelLabel: 'Negócio',
    statement: 'Claude Code é uma ferramenta exclusiva para programadores profissionais.',
    answer: false,
    explanation: 'Claude Code pode ser usado por qualquer pessoa que trabalhe com projetos de software, incluindo PMs, QAs e tech writers.',
  },
  {
    id: 2,
    level: 1,
    levelLabel: 'Negócio',
    statement: 'Claude Code consegue ler, criar e modificar arquivos diretamente no projeto do usuário.',
    answer: true,
    explanation: 'Claude Code opera diretamente no sistema de arquivos local com permissão do usuário.',
  },
  {
    id: 3,
    level: 1,
    levelLabel: 'Negócio',
    statement: 'Para usar Claude Code é necessário instalar um IDE específico da Anthropic.',
    answer: false,
    explanation: 'Claude Code funciona como CLI no terminal. Integrações com VS Code e JetBrains existem, mas são opcionais.',
  },
  {
    id: 4,
    level: 1,
    levelLabel: 'Negócio',
    statement: 'Claude Code pode realizar commits e interagir com Git automaticamente.',
    answer: true,
    explanation: 'Claude Code pode executar comandos Git como parte das tarefas que o usuário delega.',
  },
  {
    id: 5,
    level: 1,
    levelLabel: 'Negócio',
    statement: 'Claude Code é um produto separado e distinto da API da Anthropic.',
    answer: true,
    explanation: 'Claude Code é uma CLI/produto próprio, diferente de chamar a API diretamente.',
  },

  // Round 2 — Técnico Iniciante
  {
    id: 6,
    level: 2,
    levelLabel: 'Técnico Iniciante',
    statement: 'O comando para instalar Claude Code globalmente é `npm install -g @anthropic-ai/claude-code`.',
    answer: true,
    explanation: 'Esse é o comando oficial de instalação via npm.',
  },
  {
    id: 7,
    level: 2,
    levelLabel: 'Técnico Iniciante',
    statement: 'Claude Code funciona apenas em sistemas operacionais Linux.',
    answer: false,
    explanation: 'Claude Code é compatível com macOS, Linux e Windows.',
  },
  {
    id: 8,
    level: 2,
    levelLabel: 'Técnico Iniciante',
    statement: 'O arquivo CLAUDE.md serve para dar instruções persistentes e contexto ao Claude Code sobre o projeto.',
    answer: true,
    explanation: 'O CLAUDE.md é carregado automaticamente em cada sessão como contexto do projeto.',
  },
  {
    id: 9,
    level: 2,
    levelLabel: 'Técnico Iniciante',
    statement: 'Claude Code acessa a internet e executa comandos sem precisar de nenhuma confirmação do usuário.',
    answer: false,
    explanation: 'Claude Code solicita permissão antes de executar ações potencialmente destrutivas ou sensíveis.',
  },
  {
    id: 10,
    level: 2,
    levelLabel: 'Técnico Iniciante',
    statement: 'É possível usar Claude Code integrado diretamente no VS Code e no JetBrains.',
    answer: true,
    explanation: 'Extensões oficiais de IDE estão disponíveis para ambos os editores.',
  },

  // Round 3 — Técnico Avançado
  {
    id: 11,
    level: 3,
    levelLabel: 'Técnico Avançado',
    statement: 'O Claude Code suporta o Model Context Protocol (MCP) para integrar ferramentas e serviços externos.',
    answer: true,
    explanation: 'MCP permite estender Claude Code com servidores externos que expõem ferramentas e dados.',
  },
  {
    id: 12,
    level: 3,
    levelLabel: 'Técnico Avançado',
    statement: 'Hooks no Claude Code permitem executar scripts automáticos em resposta a eventos do agente (ex: antes de um commit).',
    answer: true,
    explanation: 'Hooks são configurados em settings.json e disparam comandos shell em eventos específicos.',
  },
  {
    id: 13,
    level: 3,
    levelLabel: 'Técnico Avançado',
    statement: 'O Claude Agent SDK serve apenas para construir chatbots, não agentes que executam código.',
    answer: false,
    explanation: 'O Claude Agent SDK permite construir agentes autônomos que executam ferramentas, código e tarefas complexas.',
  },
  {
    id: 14,
    level: 3,
    levelLabel: 'Técnico Avançado',
    statement: 'Claude Code pode ser executado em modo headless (sem interação humana) em pipelines de CI/CD.',
    answer: true,
    explanation: 'Claude Code suporta modo não-interativo via flags, ideal para automação em CI/CD.',
  },
  {
    id: 15,
    level: 3,
    levelLabel: 'Técnico Avançado',
    statement: 'Cada sessão do Claude Code possui memória persistente e infinita entre conversas por padrão.',
    answer: false,
    explanation: 'Por padrão, cada sessão começa sem contexto da anterior. O usuário pode configurar memória via arquivos de memória ou CLAUDE.md.',
  },
];

export const QUESTIONS_PER_ROUND = 5;

export function getQuestionsForRound(round: 1 | 2 | 3): Question[] {
  return questions.filter((q) => q.level === round);
}
