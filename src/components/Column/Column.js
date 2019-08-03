import React from 'react';
import { connect } from 'react-redux';
import Ficha from '../Ficha';
import './column.scss';

const Column = ({ itemColors, isColumnActive, column }) => {
  return (
    <div className="column-group">
      <div className={`column-item${isColumnActive ? ' column-active' : ''}`}>
        {Object.keys(itemColors[column]).map((row) => (
          <Ficha
            isColumnActive={isColumnActive}
            key={row}
            column={Number(column)}
            itemIndex={Number(row)}
          />
        ))}
      </div>
      {isColumnActive && (
        <span role="img" aria-label="arrow-up">
          ⬆️
        </span>
      )}
    </div>
  );
};

const mapStateToProps = ({ game }) => ({
  itemColors: game.itemColors,
});

export default connect(mapStateToProps)(Column);
