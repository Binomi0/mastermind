import React, { Component } from 'react';

export default class Seleccionable extends Component {
  constructor(props) {
    super(props);
    this.fichaRef = React.createRef();
  }

  handleClick = () => {
    // console.log('this.fichaRef', this.fichaRef.current);
    const { changeColor, color } = this.props;
    changeColor(color);
    this.setState({ color });
  };

  render() {
    return (
      <div
        ref={this.fichaRef}
        onClick={this.handleClick}
        className="ficha-seleccionable"
        style={{ background: this.props.color }}
      />
    );
  }
}
