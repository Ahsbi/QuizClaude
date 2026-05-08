export interface Question {
  id: number;
  level: 1 | 2 | 3;
  levelLabel: 'Negócio' | 'Técnico Iniciante' | 'Técnico Avançado';
  statement: string;
  answer: boolean;
  explanation: string;
}

export interface QuizState {
  currentRound: 1 | 2 | 3;
  currentQuestionIndex: number;
  answers: Record<number, boolean>;
  score: number;
  status: 'idle' | 'playing' | 'round-transition' | 'finished';
}

export type QuizAction =
  | { type: 'START' }
  | { type: 'ANSWER'; questionId: number; userAnswer: boolean }
  | { type: 'NEXT_QUESTION' }
  | { type: 'NEXT_ROUND' }
  | { type: 'RESTART' }
  | { type: 'LOAD_STATE'; state: QuizState };
