import React, { Component } from 'react';

export default class Record extends Component {
  render() {
    const { player, score, time } = this.props.record;

    return (
      <li>
        {player}: {score} ({time} segs.)
      </li>
    );
  }
}
