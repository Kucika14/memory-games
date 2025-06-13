import { useState } from 'react';
import GameBoard from './components/GameBoard/GameBoard';
import Sidebar from './components/Sidebar/Sidebar';
import { useMemoryGame } from './GameLogic/useMemoryGame';
import './App.scss';

function App() {
  const { pairsLeft, score, resetGame, isWin, ...restProps } = useMemoryGame();

  const [started, setStarted] = useState(false);


  return (
    <div className="App">
      <header className='app-header'>
        <h1>Memory Game</h1>
      </header>
      {!started ? (
        <button
          className="start-btn"
          onClick={() => setStarted(true)}
        >
          Start
        </button>
      ) : isWin ?
        (
          <div className="win-screen">
            <h2>Congratulations! You won!</h2>
            <p>Your score: {score}</p>
            <button onClick={resetGame}>Play Again</button>
          </div>
        )
        : (
          <div className="game-layout">
            <GameBoard {...restProps} />
            <Sidebar score={score} pairsLeft={pairsLeft} />
          </div>
        )}
    </div>
  );
}

export default App;
