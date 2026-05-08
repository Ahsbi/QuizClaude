# PRD — Quiz Web: "Você conhece o Claude Code?"

**Versão:** 1.0  
**Data:** 2026-05-08  
**Autor:** Anderson Silva  
**Status:** Pronto para desenvolvimento

---

## 1. Visão Geral

### 1.1 Problema
Muitas pessoas — desde gestores até desenvolvedores — ainda não conhecem o Claude Code ou têm percepções equivocadas sobre o que ele faz, como funciona e até onde vai sua capacidade. Não existe uma forma rápida e engajante de testar e fixar esse conhecimento.

### 1.2 Solução
Uma aplicação web de quiz no formato **Verdadeiro ou Falso** com 15 perguntas divididas em 3 níveis progressivos de dificuldade, cobrindo desde conceitos de negócio até funcionalidades técnicas avançadas do Claude Code.

### 1.3 Objetivos de Negócio
- Educar usuários sobre o Claude Code de forma lúdica e acessível
- Aumentar o engajamento e tempo de permanência na plataforma
- Gerar compartilhamento orgânico via resultado final
- Servir como material de onboarding para equipes que estão adotando o Claude Code

### 1.4 Métricas de Sucesso
- Taxa de conclusão do quiz > 70%
- Tempo médio de sessão > 3 minutos
- Taxa de compartilhamento do resultado > 20%

---

## 2. Audiência-Alvo

| Perfil | Descrição | Nível esperado |
|---|---|---|
| **Gestor / PM** | Avalia adoção de ferramentas, sem background técnico profundo | Nível 1 |
| **Dev iniciante** | Nunca usou Claude Code, está avaliando | Níveis 1 e 2 |
| **Dev avançado** | Usa Claude Code no dia a dia, quer validar conhecimento | Todos os níveis |

---

## 3. Estrutura do Quiz

### 3.1 Formato
- **15 perguntas** no formato **Verdadeiro ou Falso**
- Divididas em **3 rounds** de 5 perguntas cada
- Progressão sequencial: o Round 2 só é desbloqueado ao terminar o Round 1

### 3.2 Níveis de Dificuldade

#### Round 1 — Nível Negócio (Iniciante)
Foco em posicionamento, casos de uso e capacidades gerais do Claude Code. Sem jargão técnico.

| # | Pergunta | Resposta | Explicação |
|---|---|---|---|
| 1 | "Claude Code é uma ferramenta exclusiva para programadores profissionais." | **Falso** | Claude Code pode ser usado por qualquer pessoa que trabalhe com projetos de software, incluindo PMs, QAs e tech writers. |
| 2 | "Claude Code consegue ler, criar e modificar arquivos diretamente no projeto do usuário." | **Verdadeiro** | Claude Code opera diretamente no sistema de arquivos local com permissão do usuário. |
| 3 | "Para usar Claude Code é necessário instalar um IDE específico da Anthropic." | **Falso** | Claude Code funciona como CLI no terminal. Integrações com VS Code e JetBrains existem, mas são opcionais. |
| 4 | "Claude Code pode realizar commits e interagir com Git automaticamente." | **Verdadeiro** | Claude Code pode executar comandos Git como parte das tarefas que o usuário delega. |
| 5 | "Claude Code é um produto separado e distinto da API da Anthropic." | **Verdadeiro** | Claude Code é uma CLI/produto próprio, diferente de chamar a API diretamente. |

#### Round 2 — Técnico Iniciante
Foco em instalação, comandos básicos, integração com IDEs e primeiros passos.

| # | Pergunta | Resposta | Explicação |
|---|---|---|---|
| 6 | "O comando para instalar Claude Code globalmente é `npm install -g @anthropic-ai/claude-code`." | **Verdadeiro** | Esse é o comando oficial de instalação via npm. |
| 7 | "Claude Code funciona apenas em sistemas operacionais Linux." | **Falso** | Claude Code é compatível com macOS, Linux e Windows. |
| 8 | "O arquivo `CLAUDE.md` serve para dar instruções persistentes e contexto ao Claude Code sobre o projeto." | **Verdadeiro** | O CLAUDE.md é carregado automaticamente em cada sessão como contexto do projeto. |
| 9 | "Claude Code acessa a internet e executa comandos sem precisar de nenhuma confirmação do usuário." | **Falso** | Claude Code solicita permissão antes de executar ações potencialmente destrutivas ou sensíveis. |
| 10 | "É possível usar Claude Code integrado diretamente no VS Code e no JetBrains." | **Verdadeiro** | Extensões oficiais de IDE estão disponíveis para ambos os editores. |

#### Round 3 — Técnico Avançado
Foco em MCP, hooks, Claude Agent SDK, permissões granulares e configurações avançadas.

| # | Pergunta | Resposta | Explicação |
|---|---|---|---|
| 11 | "O Claude Code suporta o Model Context Protocol (MCP) para integrar ferramentas e serviços externos." | **Verdadeiro** | MCP permite estender Claude Code com servidores externos que expõem ferramentas e dados. |
| 12 | "Hooks no Claude Code permitem executar scripts automáticos em resposta a eventos do agente (ex: antes de um commit)." | **Verdadeiro** | Hooks são configurados em settings.json e disparam comandos shell em eventos específicos. |
| 13 | "O Claude Agent SDK serve apenas para construir chatbots, não agentes que executam código." | **Falso** | O Claude Agent SDK permite construir agentes autônomos que executam ferramentas, código e tarefas complexas. |
| 14 | "Claude Code pode ser executado em modo headless (sem interação humana) em pipelines de CI/CD." | **Verdadeiro** | Claude Code suporta modo não-interativo via flags, ideal para automação em CI/CD. |
| 15 | "Cada sessão do Claude Code possui memória persistente e infinita entre conversas por padrão." | **Falso** | Por padrão, cada sessão começa sem contexto da anterior. O usuário pode configurar memória via arquivos de memória ou CLAUDE.md. |

---

## 4. Fluxo da Aplicação

```
[Tela Inicial]
  → Título, subtítulo, descrição rápida
  → Botão "Começar Quiz"

[Round 1 — 5 perguntas]
  → Para cada pergunta:
     - Número da pergunta + barra de progresso global
     - Badge do nível atual (ex: "Nível 1 - Negócio")
     - Texto da pergunta
     - Botões: [Verdadeiro] [Falso]
     - Após resposta: feedback visual (verde/vermelho) + explicação curta
     - Botão "Próxima"

[Transição Round 1 → Round 2]
  → Tela intermediária com score parcial + mensagem motivacional
  → Botão "Continuar para Nível Técnico"

[Round 2 — 5 perguntas] (mesma estrutura)

[Transição Round 2 → Round 3] (mesma estrutura)

[Round 3 — 5 perguntas] (mesma estrutura)

[Tela de Resultado Final]
  → Score total (ex: "11 de 15 corretas")
  → Badge por faixa de desempenho
  → Resumo: lista de perguntas erradas com a explicação
  → Botão "Tentar Novamente"
  → Botão "Compartilhar Resultado"
  → CTA externo: "Aprenda mais → documentação oficial do Claude Code"
```

---

## 5. Sistema de Pontuação e Badges

| Faixa | Score | Badge | Mensagem |
|---|---|---|---|
| Iniciante | 0–5 corretas | 🌱 Explorador | "Você está começando sua jornada com Claude Code!" |
| Intermediário | 6–10 corretas | ⚡ Practitioner | "Você já tem uma boa base sobre Claude Code!" |
| Avançado | 11–13 corretas | 🚀 Expert | "Impressionante! Você domina o Claude Code!" |
| Mestre | 14–15 corretas | 🏆 Claude Master | "Parabéns! Você é um verdadeiro mestre do Claude Code!" |

---

## 6. Requisitos Funcionais

| ID | Requisito | Prioridade |
|---|---|---|
| RF01 | Exibir perguntas uma a uma com botões Verdadeiro/Falso | Alta |
| RF02 | Mostrar feedback visual imediato (correto/incorreto) após resposta | Alta |
| RF03 | Exibir explicação curta após cada resposta | Alta |
| RF04 | Controlar progressão por rounds (desbloquear sequencialmente) | Alta |
| RF05 | Calcular e exibir score por round e score total | Alta |
| RF06 | Exibir badge de resultado na tela final | Alta |
| RF07 | Listar perguntas erradas com explicações na tela final | Média |
| RF08 | Permitir reiniciar o quiz do início | Média |
| RF09 | Funcionalidade de compartilhar resultado (texto para copiar) | Média |
| RF10 | Salvar progresso no localStorage para retomada | Baixa |
| RF11 | Responsividade completa (mobile-first) | Alta |

---

## 7. Requisitos Não-Funcionais

| ID | Requisito |
|---|---|
| RNF01 | Primeira renderização (LCP) < 1.5s |
| RNF02 | 100% client-side, sem backend ou banco de dados |
| RNF03 | Funciona offline após carregamento inicial |
| RNF04 | Acessível: contraste WCAG AA, navegação por teclado |
| RNF05 | Compatível com Chrome, Firefox, Safari e Edge (últimas 2 versões) |
| RNF06 | Bundle final < 200KB gzipped |

---

## 8. Stack Técnica

### 8.1 Frontend
| Tecnologia | Versão | Justificativa |
|---|---|---|
| **React** | 18+ | Componentização, hooks para estado local |
| **Vite** | 5+ | Build rápido, dev server com HMR |
| **Tailwind CSS** | 3+ | Utilitário, responsivo, sem CSS externo |
| **TypeScript** | 5+ | Tipagem segura nas questões e estado |

### 8.2 Estrutura de Dados
```typescript
// Estrutura de uma questão
interface Question {
  id: number;
  level: 1 | 2 | 3;
  levelLabel: 'Negócio' | 'Técnico Iniciante' | 'Técnico Avançado';
  statement: string;       // texto da afirmação
  answer: boolean;         // true = Verdadeiro, false = Falso
  explanation: string;     // explicação exibida após resposta
}

// Estado global do quiz
interface QuizState {
  currentRound: 1 | 2 | 3;
  currentQuestionIndex: number;
  answers: Record<number, boolean>;  // questionId → resposta do usuário
  score: number;
  status: 'idle' | 'playing' | 'round-transition' | 'finished';
}
```

### 8.3 Arquitetura de Componentes
```
src/
├── components/
│   ├── StartScreen.tsx         # Tela inicial
│   ├── QuizCard.tsx            # Card de pergunta com botões V/F
│   ├── FeedbackOverlay.tsx     # Feedback pós-resposta (correto/errado + explicação)
│   ├── RoundTransition.tsx     # Tela entre rounds
│   ├── ResultScreen.tsx        # Tela final com score e badge
│   ├── ProgressBar.tsx         # Barra de progresso global
│   └── LevelBadge.tsx          # Badge do nível atual
├── data/
│   └── questions.ts            # Array com as 15 perguntas tipadas
├── hooks/
│   └── useQuiz.ts              # Lógica do quiz (estado, navegação, score)
├── types/
│   └── quiz.ts                 # Interfaces TypeScript
├── App.tsx
└── main.tsx
```

### 8.4 Gerenciamento de Estado
- Usar `useReducer` + `useContext` para estado global do quiz
- Sem Redux ou biblioteca de state management externa
- `localStorage` para persistência entre recarregamentos

---

## 9. Design & UX

### 9.1 Identidade Visual
- **Paleta:** Inspirada na identidade Anthropic — tons de laranja/âmbar como cor de ação, cinza escuro/preto como fundo
- **Tipografia:** Inter (sans-serif, legível em mobile)
- **Tema:** Dark mode por padrão (moderno, técnico)

### 9.2 Animações
- Transição suave entre perguntas (fade + slide)
- Shake na resposta incorreta
- Confetti ou pulso na resposta correta
- Transição de entrada na tela de resultado

### 9.3 Responsividade
- Layout mobile-first (320px+)
- Cards centralizados com max-width 640px em desktop
- Botões grandes e acessíveis em touch (min 48px de altura)

---

## 10. Deploy

| Opção | Recomendação |
|---|---|
| **Vercel** | Deploy automático via GitHub push, domínio gratuito |
| **GitHub Pages** | Alternativa via `vite build` + `gh-pages` |

**Comando de build:** `npm run build` → pasta `dist/`  
**Variáveis de ambiente:** nenhuma (100% client-side)

---

## 11. Fora do Escopo (v1.0)

- Backend ou banco de dados
- Autenticação de usuários
- Leaderboard/ranking online
- Modo multiplayer
- Geração dinâmica de perguntas via API
- Modo "cronometrado"
- Mais de 15 perguntas (expansível em v2)

---

## 12. Critérios de Aceite

- [ ] Quiz completo com 15 perguntas nas 3 categorias
- [ ] Feedback visual e textual após cada resposta
- [ ] Score correto calculado e exibido por round e no total
- [ ] Badge correto exibido na tela final conforme faixa de pontuação
- [ ] Lista de erros exibida na tela final
- [ ] Botão de reiniciar funcional
- [ ] Responsivo em mobile (375px) e desktop (1280px)
- [ ] Sem erros de console no Chrome, Firefox e Safari
- [ ] Build de produção gerado sem erros (`npm run build`)
