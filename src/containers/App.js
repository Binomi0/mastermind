import React from 'react';
import 'react-notifications-component/dist/theme.css';
import { connect } from 'react-redux';
import Notification from '../components/Notifications';
import MainGame from '../components/MainGame';
import Dashboard from '../components/Dashboard/Dashboard';
import './App.scss';

const App = ({ gameStarted }) => (
  <div className="App">
    <Notification />
    {!gameStarted ? <Dashboard /> : <MainGame />}
  </div>
);

const mapStateToProps = ({ game }) => ({
  gameStarted: game.gameStarted,
});

export default connect(mapStateToProps)(App);
