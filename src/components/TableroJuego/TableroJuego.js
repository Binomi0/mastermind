import React, { Component } from 'react';

import Column from '../Column/Column';
import './tablero-juego.css';

export default class TableroJuego extends Component {
  render() {
    const { active, selectColor } = this.props;
    return (
      <div className="tablero-juego">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((column) => (
          <Column
            key={column}
            selectColor={selectColor}
            active={active === column}
            selectedColor={this.props.selectedColor}
          />
        ))}
      </div>
    );
  }
}
