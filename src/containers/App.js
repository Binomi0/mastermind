import React from 'react';

import { connect } from 'react-redux';
import MainGame from '../components/MainGame';
import Dashboard from '../components/Dashboard/Dashboard';
import './App.scss';

const App = ({ gameStarted }) => (
  <div className="App">{!gameStarted ? <Dashboard /> : <MainGame />}</div>
);

const mapStateToProps = ({ game }) => ({
  gameStarted: game.gameStarted,
});

export default connect(mapStateToProps)(App);
