import React, { memo } from 'react';

import Column from '../Column/Column';
import { GameContext } from '../../context/game';
import './tablero-juego.scss';

const TableroJuego = memo(function TableroJuego() {
  return (
    <GameContext.Consumer>
      {({ activeColumn, itemColors }) => (
        <div className="tablero-juego">
          {Object.keys(itemColors).map((columnIndex) => (
            <Column
              key={columnIndex}
              column={columnIndex}
              isColumnActive={activeColumn === Number(columnIndex)}
            />
          ))}
        </div>
      )}
    </GameContext.Consumer>
  );
});

export default TableroJuego;
