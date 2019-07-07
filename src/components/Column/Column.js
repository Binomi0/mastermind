import React, { Component } from 'react';

import { GameContext } from '../../context/game';
import Ficha from '../Ficha/Ficha';

import './column.scss';

export default class Column extends Component {
  render() {
    const { isColumnActive, column } = this.props;

    // console.log('Column => column', column);

    return (
      <GameContext.Consumer>
        {({ itemColors }) => (
          <div className="column-item">
            <div className={isColumnActive ? 'column-active' : ''}>
              {Object.keys(itemColors[column]).map((row) => (
                <Ficha
                  isColumnActive={isColumnActive}
                  key={row}
                  column={Number(column)}
                  itemIndex={Number(row)}
                />
              ))}
            </div>
          </div>
        )}
      </GameContext.Consumer>
    );
  }
}
