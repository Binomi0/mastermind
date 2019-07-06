import React, { Component } from 'react';
import { GameContext } from '../../context/game';

import './header.css';

export default class Header extends Component {
  render() {
    return (
      <GameContext.Consumer>
        {({ selectedColor, score }) => (
          <div className="header">
            <h1>MasterMind Game</h1>
            <h2>Puntuación: {score}</h2>
            {/* <div
              className="selected-color"
              style={{ background: selectedColor }}
            /> */}
          </div>
        )}
      </GameContext.Consumer>
    );
  }
}
