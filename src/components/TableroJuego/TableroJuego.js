import React, { memo } from 'react';

import Column from '../Column/Column';
import './tablero-juego.css';
import { GameContext } from '../../context/game';

const TableroJuego = memo(function TableroJuego() {
  return (
    <GameContext.Consumer>
      {({ activeColumn, itemColors }) => (
        <div className="tablero-juego">
          {Object.keys(itemColors)
            .map((columnIndex) => (
              <Column
                key={columnIndex}
                column={columnIndex}
                isColumnActive={activeColumn === Number(columnIndex)}
              />
            ))
            .reverse()}
        </div>
      )}
    </GameContext.Consumer>
  );
});

export default TableroJuego;
