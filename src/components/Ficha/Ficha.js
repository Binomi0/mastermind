import React, { Component, createRef } from 'react';

import { GameContext } from '../../context/game';

import './ficha.css';

export default class Ficha extends Component {
  static contextType = GameContext;

  constructor(props) {
    super(props);

    this.itemRef = createRef();
    this.context = GameContext;
    this.state = {
      color: this.context.selectedColor,
    };
  }

  componentDidMount() {
    // console.log('this.context', this.context);
  }

  handleClick = () => {
    console.log('this.refs', this.itemRef.current);
    const { column, itemIndex, isColumnActive } = this.props;
    const { selectedColor: color, setTurn } = this.context;

    if (isColumnActive) {
      this.setState({ color }, () => {
        setTurn(itemIndex, Number(column));
      });
    }
  };

  render() {
    const { itemIndex, column, isColumnActive } = this.props;
    const { movement } = this.context;

    const active = itemIndex === movement && isColumnActive;

    return (
      <GameContext.Consumer>
        {({ movement }) => (
          <div
            ref={this.itemRef}
            onClick={this.handleClick}
            className={`ficha ficha-${itemIndex} column-${column}${
              active ? ' active' : ''
            }`}
            style={{ background: this.state.color }}
          >
            <div className="ficha-point" />
          </div>
        )}
      </GameContext.Consumer>
    );
  }
}
