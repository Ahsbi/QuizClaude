import { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface Props {
  isCorrect: boolean;
  explanation: string;
  onNext: () => void;
}

export default function FeedbackOverlay({ isCorrect, explanation, onNext }: Props) {
  useEffect(() => {
    if (isCorrect) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#fcd34d', '#10b981', '#60a5fa'],
      });
    }
  }, [isCorrect]);

  return (
    <div className={isCorrect ? '' : 'animate-[shake_0.4s_ease-in-out]'}>
      <div
        className={`rounded-2xl border overflow-hidden animate-[scaleIn_0.25s_ease-out] ${
          isCorrect
            ? 'bg-emerald-950/60 border-emerald-700/50'
            : 'bg-red-950/60 border-red-800/50'
        }`}
      >
        {/* Top accent bar */}
        <div
          className={`h-1 ${
            isCorrect
              ? 'bg-gradient-to-r from-emerald-600 to-emerald-400'
              : 'bg-gradient-to-r from-red-700 to-red-500'
          }`}
        />

        <div className="p-5 space-y-4">
          <div className="flex items-start gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm ${
                isCorrect ? 'bg-emerald-500 text-white' : 'bg-red-600 text-white'
              }`}
            >
              {isCorrect ? '✓' : '✗'}
            </div>
            <div className="space-y-1.5 text-left">
              <p className={`font-bold text-base ${isCorrect ? 'text-emerald-300' : 'text-red-300'}`}>
                {isCorrect ? 'Correto!' : 'Incorreto!'}
              </p>
              <p className="text-gray-300 text-sm leading-relaxed">{explanation}</p>
            </div>
          </div>

          <button
            onClick={onNext}
            className="w-full py-2.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-600 text-white font-medium rounded-xl transition-all duration-150 text-sm cursor-pointer active:scale-[0.99]"
          >
            Próxima pergunta →
          </button>
        </div>
      </div>
    </div>
  );
}
