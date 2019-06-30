import React, { Component } from 'react';

import './header.css';

export default class Header extends Component {
  render() {
    const { score } = this.props;
    return (
      <div className="header">
        <h1>MasterMind Game</h1>
        <h2>Puntuación: {score}</h2>
        <div
          className="selected-color"
          style={{ background: this.props.selectedColor }}
        />
      </div>
    );
  }
}
