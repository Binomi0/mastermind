import React, { Component } from 'react';

import { GameContext } from '../../context/game';

import './ficha.scss';

export default class Ficha extends Component {
  static contextType = GameContext;

  handleClick = () => {
    const { itemIndex, column } = this.props;
    this.context.setUserSelectedMovement(itemIndex, column);
  };

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
