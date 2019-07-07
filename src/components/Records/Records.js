import React, { Component } from 'react';

import db from '../../config/firebase';
import Record from '../Record';

import './records.scss';

function orderScore(a, b) {
  if (a.score <= b.score) {
    return 1;
  }
  if (a.score > b.score) {
    return -1;
  }
  return 0;
}

export default class Records extends Component {
  state = {
    records: [],
  };

  componentDidMount() {
    db.ref('score')
      .once('value')
      .then((snapshot) => {
        this.orderRecords(snapshot.val());
      });
  }

  orderRecords = (records) => {
    const recordList = Object.keys(records)
      .map((r) => ({
        player: records[r].player,
        score: records[r].score,
        time: records[r].time,
      }))
      .sort(orderScore);
    this.setState({ records: recordList });
  };

  render() {
    const { records } = this.state;

    return (
      <div className="records">
        <ol className="records-list">
          {records.length > 0 &&
            records.map((record) => (
              <Record key={record.player} record={record} />
            ))}
        </ol>
      </div>
    );
  }
}
