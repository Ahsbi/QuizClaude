import { createContext, useContext, useReducer, useEffect } from 'react';
import type { Dispatch } from 'react';
import type { QuizState, QuizAction } from '../types/quiz';
import { questions, QUESTIONS_PER_ROUND } from '../data/questions';

const STORAGE_KEY = 'quiz-claude-state';

const initialState: QuizState = {
  currentRound: 1,
  currentQuestionIndex: 0,
  answers: {},
  score: 0,
  status: 'idle',
};

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'START':
      return { ...initialState, status: 'playing' };

    case 'ANSWER': {
      const question = questions.find((q) => q.id === action.questionId)!;
      const isCorrect = question.answer === action.userAnswer;
      return {
        ...state,
        answers: { ...state.answers, [action.questionId]: action.userAnswer },
        score: isCorrect ? state.score + 1 : state.score,
      };
    }

    case 'NEXT_QUESTION': {
      const nextIndex = state.currentQuestionIndex + 1;
      const isLastQuestionInRound = nextIndex >= QUESTIONS_PER_ROUND;
      const isLastRound = state.currentRound === 3;

      if (isLastQuestionInRound && isLastRound) {
        return { ...state, status: 'finished' };
      }
      if (isLastQuestionInRound) {
        return { ...state, status: 'round-transition' };
      }
      return { ...state, currentQuestionIndex: nextIndex };
    }

    case 'NEXT_ROUND':
      return {
        ...state,
        currentRound: (state.currentRound + 1) as 1 | 2 | 3,
        currentQuestionIndex: 0,
        status: 'playing',
      };

    case 'RESTART':
      localStorage.removeItem(STORAGE_KEY);
      return { ...initialState };

    case 'LOAD_STATE':
      return action.state;

    default:
      return state;
  }
}

export const QuizContext = createContext<{
  state: QuizState;
  dispatch: Dispatch<QuizAction>;
} | null>(null);

export function useQuizState() {
  return useReducer(quizReducer, initialState);
}

function isValidState(parsed: unknown): parsed is QuizState {
  if (!parsed || typeof parsed !== 'object') return false;
  const s = parsed as Record<string, unknown>;
  return (
    [1, 2, 3].includes(s.currentRound as number) &&
    ['idle', 'playing', 'round-transition', 'finished'].includes(s.status as string)
  );
}

export function useQuizPersistence(state: QuizState, dispatch: Dispatch<QuizAction>) {
  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (isValidState(parsed) && parsed.status !== 'idle') {
          dispatch({ type: 'LOAD_STATE', state: parsed });
        }
      }
    } catch {
      // ignore corrupt storage
    }
  }, [dispatch]);

  // Persist on every state change
  useEffect(() => {
    if (state.status === 'idle') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore storage errors
    }
  }, [state]);
}

export function useQuiz() {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error('useQuiz must be used inside QuizProvider');
  return ctx;
}
