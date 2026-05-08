import { QuizContext, useQuizState, useQuizPersistence } from './hooks/useQuiz';
import StartScreen from './components/StartScreen';
import QuizCard from './components/QuizCard';
import RoundTransition from './components/RoundTransition';
import ResultScreen from './components/ResultScreen';

function AppContent() {
  const [state, dispatch] = useQuizState();
  useQuizPersistence(state, dispatch);

  const renderScreen = () => {
    switch (state.status) {
      case 'idle': return <StartScreen />;
      case 'playing': return <QuizCard />;
      case 'round-transition': return <RoundTransition />;
      case 'finished': return <ResultScreen />;
      default: {
        const _exhaustive: never = state.status;
        return _exhaustive;
      }
    }
  };

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      <div className="flex flex-col min-h-dvh bg-gray-950 text-gray-100">
        <header className="border-b border-gray-800/60 px-4 py-3 flex items-center justify-between bg-gray-950/90 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center shadow-lg shadow-amber-500/20 flex-shrink-0">
              <span className="text-gray-950 font-bold text-xs select-none">C</span>
            </div>
            <span className="text-sm font-semibold text-white">
              Claude Code{' '}
              <span className="text-amber-400 font-medium">Quiz</span>
            </span>
          </div>

          <div className="text-xs font-medium">
            {state.status === 'playing' && (
              <span className="text-gray-500">
                Round{' '}
                <span className="text-gray-300">{state.currentRound}</span>
                /3
              </span>
            )}
            {state.status === 'finished' && (
              <span className="text-amber-400">
                {state.score}/15 corretas
              </span>
            )}
          </div>
        </header>

        <main className="flex flex-col flex-1">
          {renderScreen()}
        </main>
      </div>
    </QuizContext.Provider>
  );
}

export default function App() {
  return <AppContent />;
}
