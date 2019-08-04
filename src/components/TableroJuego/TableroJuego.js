import React from 'react';
import { connect } from 'react-redux';
import Column from '../Column';
import './tablero-juego.scss';

const TableroJuego = ({ itemColors, activeColumn }) => {
  return (
    <div className="tablero-juego">
      {Object.keys(itemColors).map((columnIndex) => (
        <Column
          key={columnIndex}
          column={columnIndex}
          isColumnActive={activeColumn === Number(columnIndex)}
        />
      ))}
    </div>
  );
};

const mapStateToProps = ({ game }) => ({
  activeColumn: game.activeColumn,
  itemColors: game.itemColors,
});

export default connect(mapStateToProps)(TableroJuego);
