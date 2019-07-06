import React, { Component } from 'react';
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
  render() {
    const records = JSON.parse(localStorage.getItem('mm-records')) || [];
    records.sort(orderScore);
    // console.log('records', records);
    return (
      <div className="records">
        <ol className="records-list">
          {records
            .map((record) => <Record key={record.player} record={record} />)
            .sort(orderScore)}
        </ol>
      </div>
    );
  }
}
