import React, { Component } from 'react';

import { GameContext } from '../../context/game';
import Ficha from '../Ficha/Ficha';

import './column.css';

export default class Column extends Component {
  render() {
    const { isColumnActive, column, selectedItemRef } = this.props;

    return (
      <GameContext.Consumer>
        {() => (
          <div className="tablero-columna">
            <div className={isColumnActive ? 'column-active' : ''}>
              {[0, 1, 2, 3].map((row) => (
                <Ficha
                  selectedItemRef={selectedItemRef}
                  isColumnActive={isColumnActive}
                  key={row}
                  column={column}
                  itemIndex={row}
                />
              ))}
            </div>
          </div>
        )}
      </GameContext.Consumer>
    );
  }
}
