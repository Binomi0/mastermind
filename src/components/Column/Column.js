import React, { Component } from 'react';
import Ficha from '../Ficha/Ficha';

import './column.css';

export default class Column extends Component {
  render() {
    const { selectedColor, active, selectColor } = this.props;

    return (
      <div className="tablero-columna">
        <div className={active ? 'column-active' : ''}>
          {[0, 1, 2, 3].map((row) => (
            <Ficha
              columnActive={active}
              selectColor={selectColor}
              key={row}
              item={row}
              selectedColor={selectedColor}
            />
          ))}
        </div>
      </div>
    );
  }
}
