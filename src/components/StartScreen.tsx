import { useQuiz } from '../hooks/useQuiz';

const levels = [
  {
    num: 1,
    label: 'Negócio',
    icon: '💼',
    numClass: 'text-emerald-400',
    borderClass: 'border-emerald-900/40 hover:border-emerald-700/50',
  },
  {
    num: 2,
    label: 'Técnico Iniciante',
    icon: '⚙️',
    numClass: 'text-blue-400',
    borderClass: 'border-blue-900/40 hover:border-blue-700/50',
  },
  {
    num: 3,
    label: 'Avançado',
    icon: '🚀',
    numClass: 'text-orange-400',
    borderClass: 'border-orange-900/40 hover:border-orange-700/50',
  },
] as const;

export default function StartScreen() {
  const { dispatch } = useQuiz();

  return (
    <div className="flex flex-col items-center justify-center flex-1 px-4 py-12 text-center relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-lg w-full space-y-8 animate-[slideUp_0.45s_cubic-bezier(0.16,1,0.3,1)]">
        {/* Pill badge */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-xs font-medium">
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
            15 perguntas · Verdadeiro ou Falso
          </span>
        </div>

        {/* Title */}
        <div className="space-y-4">
          <div className="text-6xl sm:text-7xl select-none">🤖</div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
            Você conhece o<br />
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Claude Code
            </span>
            ?
          </h1>
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-sm mx-auto">
            Teste seus conhecimentos em 3 níveis progressivos — do conceito ao técnico avançado.
          </p>
        </div>

        {/* Level cards */}
        <div className="grid grid-cols-3 gap-3">
          {levels.map(({ num, label, icon, numClass, borderClass }) => (
            <div
              key={num}
              className={`bg-gray-900/60 border rounded-xl p-3.5 space-y-2 transition-colors duration-200 ${borderClass}`}
            >
              <div className="text-2xl select-none">{icon}</div>
              <div>
                <div className={`text-xs font-bold ${numClass}`}>Nível {num}</div>
                <div className="text-xs text-gray-500 mt-0.5 leading-tight">{label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="pt-2">
          <button
            onClick={() => dispatch({ type: 'START' })}
            className="group w-full sm:w-auto px-12 py-4 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-gray-950 font-bold text-lg rounded-xl transition-all duration-200 min-h-[56px] shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 hover:-translate-y-0.5 cursor-pointer"
          >
            Começar Quiz
            <span className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
