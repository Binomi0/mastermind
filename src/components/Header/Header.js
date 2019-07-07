import React, { Component } from 'react';
import { GameContext } from '../../context/game';

import './header.scss';

export default class Header extends Component {
  static contextType = GameContext;

  render() {
    // console.log('this.context', this.context);
    return (
      <GameContext.Consumer>
        {({ selectedColor, scoreManager, timeElapsed, playerName }) => {
          // console.log('playerName', playerName);
          // console.log('score', scoreManager.getScore(playerName));
          return (
            <div className="header">
              <h1>MasterMind Game</h1>
              <h2>
                Puntuación: {scoreManager.score} - Tiempo: {timeElapsed}
              </h2>
              <p>
                Pulsa los números para seleccionar un color y Enter para validar
                la jugada.
              </p>
              {/* <div
              className="selected-color"
              style={{ background: selectedColor }}
            /> */}
            </div>
          );
        }}
      </GameContext.Consumer>
    );
  }
}
