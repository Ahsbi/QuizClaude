import { useQuiz } from '../hooks/useQuiz';
import { questions } from '../data/questions';

const NEXT_LEVEL_LABELS: Record<number, string> = {
  1: 'Técnico Iniciante',
  2: 'Técnico Avançado',
};

const MOTIVATIONAL: Record<number, string> = {
  1: 'Boa largada! Agora vamos ao lado técnico.',
  2: 'Excelente! Prepare-se para o nível avançado.',
};

const ROUND_ICONS: Record<number, string> = {
  1: '💼',
  2: '⚙️',
  3: '🚀',
};

export default function RoundTransition() {
  const { state, dispatch } = useQuiz();

  const roundQuestions = questions.filter((q) => q.level === state.currentRound);
  const roundCorrect = roundQuestions.filter(
    (q) => state.answers[q.id] === q.answer
  ).length;

  return (
    <div className="flex flex-col flex-1 items-center justify-center px-4 py-12 text-center animate-[fadeIn_0.4s_ease-out]">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="space-y-3">
          <div className="text-5xl select-none">{ROUND_ICONS[state.currentRound]}</div>
          <h2 className="text-2xl font-bold text-white">
            Round {state.currentRound} concluído!
          </h2>
          <p className="text-gray-400 text-sm">{MOTIVATIONAL[state.currentRound]}</p>
        </div>

        {/* Score card */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <div className="p-6 space-y-5">
            {/* Round score */}
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-2 font-medium">
                Acertos neste round
              </p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl font-bold text-white">{roundCorrect}</span>
                <span className="text-2xl text-gray-500 font-medium">/5</span>
              </div>
            </div>

            {/* Per-question result dots */}
            <div className="flex justify-center gap-2">
              {roundQuestions.map((q) => {
                const isCorrect = state.answers[q.id] === q.answer;
                return (
                  <div
                    key={q.id}
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border ${
                      isCorrect
                        ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
                        : 'bg-red-500/15 border-red-500/40 text-red-400'
                    }`}
                  >
                    {isCorrect ? '✓' : '✗'}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-3 bg-gray-800/40 border-t border-gray-800">
            <p className="text-gray-500 text-xs">
              Total acumulado:{' '}
              <span className="text-amber-400 font-bold text-sm">{state.score}/15</span>
            </p>
          </div>
        </div>

        <button
          onClick={() => dispatch({ type: 'NEXT_ROUND' })}
          className="group w-full py-4 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-gray-950 font-bold text-base rounded-xl transition-all duration-200 min-h-[56px] shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 hover:-translate-y-0.5 cursor-pointer"
        >
          Continuar para {NEXT_LEVEL_LABELS[state.currentRound]}
          <span className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </button>
      </div>
    </div>
  );
}
