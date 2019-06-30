import React, { Component } from 'react';

import Seleccionable from '../Seleccionable/Seleccionable';
import './seleccionable.css';

export default class Seleccionables extends Component {
  render() {
    const { changeColor, colors } = this.props;
    return (
      <div className="seleccionable">
        <div className="fichas">
          {colors.map((color) => (
            <Seleccionable
              changeColor={changeColor}
              key={color}
              color={color}
            />
          ))}
        </div>
      </div>
    );
  }
}
