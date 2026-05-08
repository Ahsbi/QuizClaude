import { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { useQuiz } from '../hooks/useQuiz';
import { questions } from '../data/questions';
import { supabase } from '../lib/supabase';
import type { LeaderboardEntry } from '../lib/supabase';

interface Badge {
  emoji: string;
  title: string;
  message: string;
}

function getBadge(score: number): Badge {
  if (score <= 5)  return { emoji: '🌱', title: 'Explorador',    message: 'Você está começando sua jornada com Claude Code!' };
  if (score <= 10) return { emoji: '⚡', title: 'Practitioner',  message: 'Você já tem uma boa base sobre Claude Code!' };
  if (score <= 13) return { emoji: '🚀', title: 'Expert',        message: 'Impressionante! Você domina o Claude Code!' };
  return            { emoji: '🏆', title: 'Claude Master', message: 'Parabéns! Você é um verdadeiro mestre do Claude Code!' };
}

export default function ResultScreen() {
  const { state, dispatch } = useQuiz();
  const celebrated = useRef(false);
  const [copied, setCopied] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loadingBoard, setLoadingBoard] = useState(false);

  const badge = getBadge(state.score);
  const wrongQuestions = questions.filter(
    (q) => state.answers[q.id] !== undefined && state.answers[q.id] !== q.answer
  );

  useEffect(() => {
    if (!celebrated.current && state.score >= 11) {
      celebrated.current = true;
      confetti({ particleCount: 150, spread: 90, origin: { y: 0.5 } });
    }
  }, [state.score]);

  async function fetchLeaderboard() {
    if (!supabase) return;
    setLoadingBoard(true);
    const { data } = await supabase
      .from('leaderboard')
      .select('id, player_name, score, badge, created_at')
      .order('score', { ascending: false })
      .order('created_at', { ascending: true })
      .limit(10);
    if (data) setLeaderboard(data as LeaderboardEntry[]);
    setLoadingBoard(false);
  }

  async function handleSaveScore() {
    if (!supabase) return;
    const name = playerName.trim();
    if (!name) return;
    setSaving(true);
    setSaveError('');
    const { error } = await supabase.from('leaderboard').insert({
      player_name: name,
      score: state.score,
      badge: badge.title,
    });
    setSaving(false);
    if (error) {
      setSaveError('Erro ao salvar. Tente novamente.');
    } else {
      setSaved(true);
      fetchLeaderboard();
    }
  }

  async function handleShare() {
    const text = `Fiz o quiz "Você conhece o Claude Code?" e acertei ${state.score} de 15!\n\nBadge: ${badge.emoji} ${badge.title}\n\n${badge.message}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard indisponível
    }
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-start px-4 py-10 animate-[fadeIn_0.5s_ease-out]">
      <div className="w-full max-w-xl space-y-6">

        {/* Badge card */}
        <div className="relative bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden text-center">
          <div className="h-1 bg-gradient-to-r from-amber-600 via-amber-400 to-orange-400" />
          <div className="px-6 py-8 space-y-3">
            <div className="text-6xl select-none">{badge.emoji}</div>
            <h1 className="text-3xl font-bold text-white">
              {state.score}{' '}
              <span className="text-gray-500 font-normal text-2xl">de 15 corretas</span>
            </h1>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/25 rounded-full">
              <span className="text-amber-300 font-semibold text-sm">{badge.title}</span>
            </div>
            <p className="text-gray-400 text-sm">{badge.message}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => dispatch({ type: 'RESTART' })}
            className="flex-1 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-600 text-white font-medium rounded-xl transition-all duration-150 min-h-[48px] cursor-pointer"
          >
            Tentar Novamente
          </button>
          <button
            onClick={handleShare}
            className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-gray-950 font-semibold rounded-xl transition-all duration-150 min-h-[48px] cursor-pointer shadow-md shadow-amber-500/20"
          >
            {copied ? 'Copiado! ✓' : 'Compartilhar Resultado'}
          </button>
        </div>

        {/* Leaderboard — only shown when Supabase is configured */}
        {supabase && <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <div className="px-5 pt-5 pb-4 space-y-3">
            <h2 className="text-sm font-semibold text-gray-200">Entrar no ranking</h2>

            {!saved ? (
              <>
                <div className="flex gap-2">
                  <input
                    type="text"
                    maxLength={30}
                    placeholder="Seu nome ou apelido"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSaveScore()}
                    className="flex-1 bg-gray-800 border border-gray-700 focus:border-amber-500/60 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 text-sm outline-none transition-colors duration-150"
                    aria-label="Nome para o ranking"
                  />
                  <button
                    onClick={handleSaveScore}
                    disabled={saving || !playerName.trim()}
                    className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-gray-950 font-semibold rounded-xl transition-colors duration-150 text-sm cursor-pointer"
                  >
                    {saving ? '...' : 'Salvar'}
                  </button>
                </div>
                {saveError && <p className="text-red-400 text-xs">{saveError}</p>}
              </>
            ) : (
              <p className="text-emerald-400 text-sm">✓ Score salvo! Veja o ranking abaixo.</p>
            )}

            {!saved && leaderboard.length === 0 && (
              <button
                onClick={fetchLeaderboard}
                className="text-amber-400 hover:text-amber-300 text-xs underline underline-offset-2 transition-colors cursor-pointer"
              >
                Ver ranking atual
              </button>
            )}
          </div>

          {(saved || leaderboard.length > 0) && (
            <div className="border-t border-gray-800">
              <div className="px-5 py-3">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Top 10</h3>
                {loadingBoard ? (
                  <p className="text-gray-500 text-sm py-2">Carregando...</p>
                ) : (
                  <ol className="space-y-1.5">
                    {leaderboard.map((entry, i) => {
                      const isMe = entry.player_name === playerName.trim() && saved;
                      return (
                        <li
                          key={entry.id}
                          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                            isMe
                              ? 'bg-amber-900/30 border border-amber-700/40'
                              : 'bg-gray-800/60'
                          }`}
                        >
                          <span className="text-gray-500 w-5 text-xs font-medium">{i + 1}.</span>
                          <span className="flex-1 text-white truncate font-medium">{entry.player_name}</span>
                          <span className="text-gray-500 text-xs">{entry.badge}</span>
                          <span className="text-amber-400 font-bold tabular-nums">{entry.score}/15</span>
                        </li>
                      );
                    })}
                  </ol>
                )}
              </div>
            </div>
          )}
        </div>}

        {/* Wrong answers */}
        {wrongQuestions.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-base font-semibold text-gray-300">
              Onde você errou ({wrongQuestions.length})
            </h2>
            <div className="space-y-2.5">
              {wrongQuestions.map((q) => (
                <div
                  key={q.id}
                  className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden"
                >
                  <div className="h-px bg-gradient-to-r from-transparent via-red-800/60 to-transparent" />
                  <div className="p-4 space-y-2">
                    <p className="text-xs text-gray-500 font-medium">
                      Pergunta {q.id} · {q.levelLabel}
                    </p>
                    <p className="text-white text-sm font-medium">{q.statement}</p>
                    <p className="text-xs text-amber-400">
                      Resposta correta:{' '}
                      <span className="font-semibold">{q.answer ? 'Verdadeiro' : 'Falso'}</span>
                    </p>
                    <p className="text-xs text-gray-400 leading-relaxed">{q.explanation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {wrongQuestions.length === 0 && (
          <div className="text-center text-gray-400 text-sm py-2">
            Parabéns — você não errou nenhuma! 🎉
          </div>
        )}

        {/* CTA */}
        <div className="text-center pb-4">
          <a
            href="https://docs.anthropic.com/pt/docs/claude-code/overview"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-400 hover:text-amber-300 text-sm underline underline-offset-4 transition-colors"
          >
            Aprenda mais → documentação oficial do Claude Code
          </a>
        </div>
      </div>
    </div>
  );
}
