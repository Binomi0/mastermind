import React, { Component } from 'react';
import { GameContext } from '../../context/game';

import Records from '../Records';
import './dashboard.css';

export default class Dashboard extends Component {
  static contextType = GameContext;

  state = { showRecords: false };

  handleNewGame = () => {
    this.props.setGame(1);
    // console.log('this.context', this.context);
    this.context.resetGame();
  };

  handleShowRecords = () => {
    this.setState(({ showRecords }) => ({ showRecords: !showRecords }));
  };

  render() {
    return (
      <div className="dashboard">
        <h1>MasterMind Game</h1>
        <button className="new-game-button" onClick={this.handleNewGame}>
          Nueva Partida
        </button>
        <hr />
        <button className="new-game-button" onClick={this.handleShowRecords}>
          Records
        </button>
        {this.state.showRecords && <Records />}
      </div>
    );
  }
}
