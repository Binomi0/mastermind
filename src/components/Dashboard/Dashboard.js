import React, { Component } from 'react';

import { GameContext } from '../../context/game';
import Records from '../Records';
import './dashboard.scss';

export default class Dashboard extends Component {
  static contextType = GameContext;

  state = {
    showRecords: false,
    filled: false,
    playerName: '',
  };

  componentDidMount() {
    const playerName = localStorage.getItem('mm-player-name');

    if (playerName) {
      this.setState({ playerName, filled: true });
      this.context.setPlayerName(playerName);
    }
  }

  handleNewGame = () => {
    this.props.setGame(1);
    this.context.resetGame();
  };

  handleShowRecords = () => {
    this.setState(({ showRecords }) => ({ showRecords: !showRecords }));
  };

  handleChange = (e) => {
    this.setState({ playerName: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem('mm-player-name', this.state.playerName);
    this.context.setPlayerName(this.state.playerName);
    this.setState({ filled: true });
  };

  render() {
    const { filled, playerName } = this.state;
    return (
      <div className="dashboard">
        <h1>MasterMind Game</h1>
        {filled && (
          <div>
            <h3>Bienvenido {playerName}</h3>
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
        )}
        <div className="form">
          {!filled && (
            <form onSubmit={this.handleSubmit}>
              <label>Introduce tu nombre</label>
              <input type="text" onChange={this.handleChange} />
              <button type="submit">Enviar</button>
            </form>
          )}
        </div>
      </div>
    );
  }
}
