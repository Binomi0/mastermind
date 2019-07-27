import React, { useEffect, useState } from 'react';

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

export default  () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const orderRecords = (items => {
      const recordList = Object.keys(items)
        .map((r) => ({
          player: items[r].player,
          score: items[r].score,
          time: items[r].time,
        }))
        .sort(orderScore);
      setRecords(recordList);
    });
  
    db.ref('score')
      .once('value')
      .then((snapshot) => {
        orderRecords(snapshot.val());
      });
  }, []);

  
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

