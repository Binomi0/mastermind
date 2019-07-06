import React, { Component } from 'react';
import { isEmpty } from 'lodash';

import Records from '../Records';
import './gameFinish.css';
import { GameContext } from '../../context/game';

export default class GameFinish extends Component {
  static contextType = GameContext;

  state = {
    playerName: '',
  };

  handleChange = (e) => {
    e.preventDefault();

    const { value } = e.target;
    this.setState({ playerName: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.playerName) {
      return;
    }
    const { scoreManager } = this.context;

    let records = JSON.parse(localStorage.getItem('mm-records')) || [];
    const newRecord = {
      player: this.state.playerName,
      score: scoreManager.getScore(),
    };

    if (isEmpty(records)) {
      records.push(newRecord);
    }

    const [playerExists] = records.filter(
      (player) => player === this.state.playerName,
    );
    if (!playerExists) {
      records.push(newRecord);
    } else {
      records.map((record) =>
        record.player === this.state.playerName ? newRecord : record,
      );
    }

    localStorage.setItem('mm-records', JSON.stringify(records));
    this.setState({ playerName: '' });
  };

  render() {
    return (
      <GameContext.Consumer>
        {({ scoreManager, resetGame }) => (
          <div className="game-finish">
            <h1>Has Ganado!</h1>
            <p>¡Has conseguido {scoreManager.getScore()} puntos!</p>
            <button className="finish-button" onClick={resetGame}>
              Jugar otra vez
            </button>
            <div className="form">
              <h2>Introduce tu nombre</h2>
              <form onSubmit={this.handleSubmit}>
                <input type="text" onChange={this.handleChange} />
                <input type="submit" value="enviar" />
              </form>
            </div>
            <Records />
          </div>
        )}
      </GameContext.Consumer>
    );
  }
}
