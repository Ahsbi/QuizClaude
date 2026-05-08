# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"Você conhece o Claude Code?" is a True/False quiz web app with 15 questions across 3 progressive difficulty rounds, educating users about Claude Code. It is 100% client-side with no backend. The full specification lives in `prd.md`.

## Commands

```bash
npm run dev      # Vite dev server with HMR
npm run build    # Production build → dist/
npm run lint     # ESLint
npm run preview  # Preview production build locally
```

> The project does not exist yet — run these after bootstrapping with Vite + React + TypeScript + Tailwind CSS.

## Architecture

### State Management

Global quiz state is managed via `useReducer` + `useContext` in `src/hooks/useQuiz.ts`. No external state libraries. `localStorage` is used for session persistence.

### Key TypeScript Interfaces (`src/types/quiz.ts`)

```typescript
interface Question {
  id: number;
  level: 1 | 2 | 3;
  levelLabel: 'Negócio' | 'Técnico Iniciante' | 'Técnico Avançado';
  statement: string;
  answer: boolean;
  explanation: string;
}

interface QuizState {
  currentRound: 1 | 2 | 3;
  currentQuestionIndex: number;
  answers: Record<number, boolean>; // questionId → user's answer
  score: number;
  status: 'idle' | 'playing' | 'round-transition' | 'finished';
}
```

### Component Tree

```
App.tsx
├── StartScreen        — landing page with "Começar Quiz" button
├── QuizCard           — question text + Verdadeiro/Falso buttons
├── FeedbackOverlay    — correct/incorrect feedback + explanation
├── RoundTransition    — score recap between rounds + continue button
├── ResultScreen       — final score, badge, list of wrong answers, share/restart
├── ProgressBar        — global progress indicator
└── LevelBadge         — current round's difficulty label
```

All 15 questions are static data in `src/data/questions.ts`.

### Application Flow

`idle` → `playing` (round 1–3, 5 questions each) → `round-transition` (between rounds) → `finished`

Rounds unlock sequentially. Score thresholds for badges: 0–5 (Explorador), 6–10 (Practitioner), 11–13 (Expert), 14–15 (Claude Master).

## Tech Stack

| Tool | Version | Role |
|---|---|---|
| React | 18+ | UI components and hooks |
| Vite | 5+ | Build tool and dev server |
| TypeScript | 5+ | Type safety |
| Tailwind CSS | 3+ | Styling (dark mode by default, Anthropic orange/amber palette) |

## Non-Functional Constraints

- Bundle < 200KB gzipped
- LCP < 1.5s
- WCAG AA contrast, keyboard navigation
- Works offline after initial load
- No backend, no environment variables
