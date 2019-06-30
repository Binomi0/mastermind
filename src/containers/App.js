import React from 'react';
import { GameContext } from '../context/game';

import Tablero from '../components/Tablero/Tablero';
import Dashboard from '../components/Dashboard/Dashboard';
import './App.css';

function App() {
  const [game, setGame] = React.useState(0);

  return (
    <GameContext.Provider value={GameContext._currentValue}>
      <div className="App">
        {game === 0 && <Dashboard setGame={setGame} />}
        {game > 0 && <Tablero game={game} />}
      </div>
    </GameContext.Provider>
  );
}

export default App;
