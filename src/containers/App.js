import React from 'react';
import { GameContext } from '../context/game';

import MainGame from '../components/MainGame';
import Dashboard from '../components/Dashboard/Dashboard';
import './App.scss';

function App() {
  const [gameStarted, setGameStarted] = React.useState(false);

  return (
    <GameContext.Provider value={GameContext._currentValue}>
      <div className="App">
        {!gameStarted ? (
          <Dashboard setGameStarted={setGameStarted} />
        ) : (
          <MainGame game={gameStarted} />
        )}
      </div>
    </GameContext.Provider>
  );
}

export default App;
