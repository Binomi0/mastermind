import React from 'react';

import {connect} from 'react-redux';
import MainGame from '../components/MainGame';
import Dashboard from '../components/Dashboard/Dashboard';
import './App.scss';
import {startGame as actions} from '../reducers/gameReducer';


function App({gameStarted, startGame}) {
  return (
      <div className="App">
        {!gameStarted ? <Dashboard startGame={startGame} /> : <MainGame />}
      </div>
  );
}

const mapStateToProps = ({game}) => ({
  gameStarted: game.gameStarted,
});

export default connect(mapStateToProps, {startGame: actions})(App);
