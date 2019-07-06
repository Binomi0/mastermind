import React, { Component } from 'react';
import { GameContext } from '../../context/game';

import './header.css';

export default class Header extends Component {
  static contextType = GameContext;

  render() {
    // console.log('this.context', this.context);
    return (
      <GameContext.Consumer>
        {({ selectedColor, scoreManager }) => {
          // console.log('score', scoreManager.score);
          return (
            <div className="header">
              <h1>MasterMind Game</h1>
              <h2>Puntuación: {scoreManager.score}</h2>
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
