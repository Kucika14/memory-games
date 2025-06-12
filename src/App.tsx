import { useState } from 'react';
import GameBoard from './components/GameBoard/GameBoard';
import Sidebar from './components/Sidebar/Sidebar';
import './App.scss';

function App() {
  const [started, setStarted] = useState(false);

  // Dummy values for now
  const score = 0;
  const pairsLeft = 4;

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
      ) : (
        <div className="game-layout">
          <Sidebar score={score} pairsLeft={pairsLeft} />
          <GameBoard />
        </div>
      )}
    </div>
  );
}

export default App;
