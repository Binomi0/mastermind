import React, { Component } from 'react';

import db from '../../config/firebase';
import Record from '../Record';

import './records.scss';

// function orderScore(a, b) {
//   if (a.score <= b.score) {
//     return 1;
//   }
//   if (a.score > b.score) {
//     return -1;
//   }
//   return 0;
// }

export default class Records extends Component {
  state = {
    records: {},
  };

  componentDidMount() {
    db.ref('score')
      .once('value')
      .then((snapshot) => {
        this.setState({ records: snapshot.val() });
      });
  }

  render() {
    const { records } = this.state;

    return (
      <div className="records">
        <ol className="records-list">
          {Object.keys(records).map((record) => (
            <Record key={record} record={records[record]} />
          ))}
        </ol>
      </div>
    );
  }
}
