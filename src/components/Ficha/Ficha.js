import React, { Component } from 'react';
import { GameContext } from '../../context/game';

import './ficha.css';

export default class Ficha extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: props.color,
    };
  }

  handleClick = () => {
    const { selectedColor: color, item, columnActive } = this.props;

    if (columnActive) {
      this.setState({ color }, () => {
        this.props.selectColor(color, item);
      });
    }
  };

  render() {
    return (
      <GameContext.Consumer>
        {() => (
          <div
            onClick={this.handleClick}
            className="ficha"
            style={{ background: this.state.color }}
          />
        )}
      </GameContext.Consumer>
    );
  }
}
