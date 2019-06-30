import React, { Component } from 'react';
import { GameContext } from '../../context/game';

import Records from '../Records';
import './dashboard.css';

export default class Dashboard extends Component {
  state = { showRecords: true };

  handleNewGame = (resetGame) => {
    this.props.setGame(1);
    // console.log('this.context', this.context);
    this.context.resetGame();
  };

  handleShowRecords = () => {
    this.setState({ showRecords: true });
  };

  render() {
    // console.log('this.props', this.props);
    // console.log('this.context', this.context);
    return (
      <GameContext.Consumer>
        {(game) => {
          console.log('game', game.resetGame());
          return (
            <div className="dashboard">
              <h1>MasterMind Game</h1>
              <button className="new-game-button" onClick={this.handleNewGame}>
                Nueva Partida
              </button>
              <hr />
              <button
                className="new-game-button"
                onClick={this.handleShowRecords}
              >
                Records
              </button>
              {this.state.showRecords && <Records />}
            </div>
          );
        }}
      </GameContext.Consumer>
    );
  }
}

Dashboard.contextType = GameContext;
