import React, { Component } from 'react';

export default class Record extends Component {
  render() {
    const { player, score } = this.props.record;

    return (
      <div>
        {player}: {score}
      </div>
    );
  }
}
