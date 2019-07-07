import React, { Component } from 'react';

import * as levels from '../../utils/constants';
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
    this.props.setGameStarted(true);
    this.context.resetGame(this.state.level);
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

  handleSelectLevel = (e) => {
    let level;
    switch (e.currentTarget.value) {
      case '5':
        level = {
          items: [...levels.easyGame],
          name: 'easyGame',
        };
        break;
      case '6':
        level = {
          items: [...levels.mediumGame],
          name: 'mediumGame',
        };
        break;
      case '7':
        level = {
          items: [...levels.hardGame],
          name: 'hardGame',
        };
        break;
      case '8':
        level = {
          items: [...levels.extraHardGame],
          name: 'extraHardGame',
        };
        break;
      default:
        level = {
          items: [...levels.easyGame],
          name: 'easyGame',
        };
        break;
    }
    this.setState({ level });
  };

  render() {
    const { filled, playerName, level } = this.state;
    return (
      <div className="dashboard">
        <h1>MasterMind Game</h1>
        {filled && (
          <div>
            <h3>Bienvenido {playerName}</h3>
            {level ? (
              <button className="new-game-button" onClick={this.handleNewGame}>
                Nueva Partida
              </button>
            ) : (
              <select onChange={this.handleSelectLevel}>
                <option value={null}>Elige un nivel</option>
                <option value={5}>5 - Fácil</option>
                <option value={6}>6 - Intermedio</option>
                <option value={7}>7 - Difícil</option>
                <option value={8}>8 - Olvídalo</option>
              </select>
            )}

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
