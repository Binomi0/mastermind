import React, { Component } from 'react';

import { GameContext } from '../../context/game';

import './ficha.css';

export default class Ficha extends Component {
  static contextType = GameContext;

  render() {
    const { itemIndex, column, isColumnActive } = this.props;
    const { movement } = this.context;

    const active = itemIndex <= movement && isColumnActive;

    return (
      <GameContext.Consumer>
        {({ itemColors }) => (
          <div
            onClick={this.handleClick}
            className={`ficha ficha-${itemIndex} column-${column}${
              active ? ' active' : ''
            }`}
            style={{ background: itemColors[column][itemIndex] }}
          >
            <div className="ficha-point" />
          </div>
        )}
      </GameContext.Consumer>
    );
  }
}
