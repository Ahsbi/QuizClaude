import { useState } from 'react';
import { useQuiz } from '../hooks/useQuiz';
import { getQuestionsForRound } from '../data/questions';
import ProgressBar from './ProgressBar';
import LevelBadge from './LevelBadge';
import FeedbackOverlay from './FeedbackOverlay';

export default function QuizCard() {
  const { state, dispatch } = useQuiz();
  const [answered, setAnswered] = useState<boolean | null>(null);

  const roundQuestions = getQuestionsForRound(state.currentRound);
  const question = roundQuestions[state.currentQuestionIndex];
  const globalCurrent = (state.currentRound - 1) * 5 + state.currentQuestionIndex + 1;

  function handleAnswer(userAnswer: boolean) {
    if (answered !== null) return;
    dispatch({ type: 'ANSWER', questionId: question.id, userAnswer });
    setAnswered(userAnswer);
  }

  function handleNext() {
    setAnswered(null);
    dispatch({ type: 'NEXT_QUESTION' });
  }

  const isCorrect = answered !== null && answered === question.answer;

  return (
    <div className="flex flex-col flex-1 items-center justify-center px-4 py-8">
      <div className="w-full max-w-xl space-y-5">
        <ProgressBar current={globalCurrent} total={15} />

        {/* key forces re-mount animation on every new question */}
        <div key={question.id} className="space-y-4 animate-[slideUp_0.35s_ease-out]">
          <LevelBadge level={question.level} label={question.levelLabel} />

          <div className="bg-gray-900 rounded-2xl border border-gray-800 hover:border-gray-700 transition-colors duration-200 overflow-hidden">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
            <p className="px-6 py-5 text-white text-lg sm:text-xl font-medium leading-relaxed">
              {question.statement}
            </p>
          </div>

          {answered === null ? (
            <div className="grid grid-cols-2 gap-3">
              <button
                aria-label="Responder Verdadeiro"
                onClick={() => handleAnswer(true)}
                className="py-4 bg-emerald-900/30 hover:bg-emerald-800/50 border border-emerald-800/50 hover:border-emerald-600/60 text-emerald-300 font-semibold text-base rounded-xl transition-all duration-150 min-h-[56px] cursor-pointer active:scale-[0.98]"
              >
                <span className="flex items-center justify-center gap-2">
                  <span className="text-lg leading-none">✓</span>
                  Verdadeiro
                </span>
              </button>
              <button
                aria-label="Responder Falso"
                onClick={() => handleAnswer(false)}
                className="py-4 bg-red-900/30 hover:bg-red-800/50 border border-red-900/50 hover:border-red-700/60 text-red-300 font-semibold text-base rounded-xl transition-all duration-150 min-h-[56px] cursor-pointer active:scale-[0.98]"
              >
                <span className="flex items-center justify-center gap-2">
                  <span className="text-lg leading-none">✗</span>
                  Falso
                </span>
              </button>
            </div>
          ) : (
            <FeedbackOverlay
              isCorrect={isCorrect}
              explanation={question.explanation}
              onNext={handleNext}
            />
          )}
        </div>
      </div>
    </div>
  );
}
