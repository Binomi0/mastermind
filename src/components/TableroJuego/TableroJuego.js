import React, { memo } from 'react';

import Column from '../Column/Column';
import './tablero-juego.css';
import { GameContext } from '../../context/game';

const TableroJuego = memo(function TableroJuego({ selectedItemRef }) {
  return (
    <GameContext.Consumer>
      {({ activeColumn }) => (
        <div className="tablero-juego">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((columnIndex) => (
            <Column
              selectedItemRef={selectedItemRef}
              key={columnIndex}
              column={columnIndex}
              isColumnActive={activeColumn === columnIndex}
            />
          ))}
        </div>
      )}
    </GameContext.Consumer>
  );
});

export default TableroJuego;
