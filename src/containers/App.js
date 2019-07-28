import React from 'react';

import MainGame from '../components/MainGame';
import Dashboard from '../components/Dashboard/Dashboard';
import './App.scss';

function App() {
  const [gameStarted, setGameStarted] = React.useState(false);

  return (
    <div className="App">
      {!gameStarted && <Dashboard setGameStarted={setGameStarted} />}
      {gameStarted && <MainGame setGameStarted={setGameStarted} />}
    </div>
  );
}

export default App;
