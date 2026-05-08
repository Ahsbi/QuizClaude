interface Props {
  level: 1 | 2 | 3;
  label: string;
}

const levelConfig: Record<number, { badge: string; dot: string }> = {
  1: { badge: 'bg-emerald-950/60 text-emerald-300 border-emerald-800/50', dot: 'bg-emerald-400' },
  2: { badge: 'bg-blue-950/60 text-blue-300 border-blue-800/50',          dot: 'bg-blue-400'    },
  3: { badge: 'bg-orange-950/60 text-orange-300 border-orange-800/50',    dot: 'bg-orange-400'  },
};

export default function LevelBadge({ level, label }: Props) {
  const { badge, dot } = levelConfig[level];
  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border ${badge}`}>
      <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${dot}`} />
      Nível {level} · {label}
    </span>
  );
}
