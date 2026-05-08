interface Props {
  current: number;
  total: number;
}

const ROUND_FILL = ['bg-emerald-400', 'bg-blue-400', 'bg-orange-400'];
const ROUND_ACTIVE = ['bg-emerald-400/40', 'bg-blue-400/40', 'bg-orange-400/40'];

export default function ProgressBar({ current, total }: Props) {
  const currentRound = Math.ceil(current / 5);

  return (
    <div className="w-full space-y-2.5">
      <div className="flex justify-between items-center text-xs">
        <span className="text-gray-400">
          Pergunta <span className="text-white font-semibold">{current}</span> de {total}
        </span>
        <span className="text-gray-400">
          Round <span className="text-white font-semibold">{currentRound}</span>/3
        </span>
      </div>

      <div className="flex gap-1.5">
        {[0, 1, 2].map((round) => (
          <div key={round} className="flex gap-0.5 flex-1">
            {[0, 1, 2, 3, 4].map((q) => {
              const idx = round * 5 + q + 1;
              const filled = idx < current;
              const active = idx === current;
              return (
                <div
                  key={q}
                  className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                    filled
                      ? ROUND_FILL[round]
                      : active
                        ? ROUND_ACTIVE[round]
                        : 'bg-gray-800'
                  }`}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
