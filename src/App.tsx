import { useState } from 'react';
import GameBoard from './components/GameBoard/GameBoard';
import Sidebar from './components/Sidebar/Sidebar';
import Timer from './components/Timer/Timer';
import { useMemoryGame } from './GameLogic/useMemoryGame';
import './App.scss';

function App() {
  const { pairsLeft, score, resetGame, isWin, ...restProps } = useMemoryGame();
  const [started, setStarted] = useState(false);
  const [isLose, setIsLose] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);

  const handleLose = () => setIsLose(true);

  const handleRestart = () => {
    setIsLose(false);
    setStarted(false);
    resetGame();
    setResetTrigger(rt => rt + 1); // minden restartnál növeljük
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>memory game</h1>
      </header>
      {!started ? (
        <button
          className="start-btn"
          onClick={() => setStarted(true)}
        >
          Start
        </button>
      ) : isWin ? (
        <div className="win-screen">
          <h2>Congratulations! You won!</h2>
          <p>Your score: {score}</p>
          <button onClick={handleRestart}>Play Again</button>
        </div>
      ) : isLose ? (
        <div className="win-screen">
          <h2>Time's up! You lost!</h2>
          <button onClick={handleRestart}>Try Again</button>
        </div>
      ) : (
        <div className="game-layout">
          <GameBoard {...restProps} />
          <Sidebar
            score={score}
            pairsLeft={pairsLeft}
            started={started}
            isWin={isWin}
            resetGame={handleRestart}
          >
            <Timer
              started={started}
              isWin={isWin}
              onLose={handleLose}
              duration={20}
              resetTrigger={resetTrigger}
            />
          </Sidebar>
        </div>
      )}
    </div>
  );
}

export default App;
