import React, { Component } from 'react';
import { GameContext } from '../../context/game';

import './header.scss';

export default class Header extends Component {
  static contextType = GameContext;

  render() {
    return (
      <GameContext.Consumer>
        {({ scoreManager, timeElapsed }) => {
          return (
            <div className="header">
              <h2>MasterMind Game</h2>
              <h3>
                Puntuación: {scoreManager.score} - Tiempo: {timeElapsed}
              </h3>
            </div>
          );
        }}
      </GameContext.Consumer>
    );
  }
}
