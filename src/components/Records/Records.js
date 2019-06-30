import React, { Component } from 'react';
import Record from '../Record';

export default class Records extends Component {
  render() {
    const records = JSON.parse(localStorage.getItem('mm-records')) || [];
    console.log('records', records);
    return (
      <div>
        RECORDS:
        {records.map((record) => (
          <Record key={record.player} record={record} />
        ))}
      </div>
    );
  }
}
