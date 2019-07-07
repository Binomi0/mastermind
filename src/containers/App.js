import React from 'react';
import { GameContext } from '../context/game';

import MainGame from '../components/MainGame';
import Dashboard from '../components/Dashboard/Dashboard';
import './App.scss';

function App() {
  const [game, setGame] = React.useState(0);

  return (
    <GameContext.Provider value={GameContext._currentValue}>
      <div className="App">
        {game === 0 && <Dashboard setGame={setGame} />}
        {game > 0 && <MainGame game={game} />}
      </div>
    </GameContext.Provider>
  );
}

export default App;
