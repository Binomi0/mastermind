import React, { memo } from 'react';
import { GameContext } from '../../context/game';

const Seleccionable = memo(function Seleccionable({ color, index }) {
  return (
    <GameContext.Consumer>
      {({ handleSetColor }) => (
        <div
          onClick={() => handleSetColor(color)}
          className="ficha-seleccionable"
          style={{ background: color }}
        >
          {index}
        </div>
      )}
    </GameContext.Consumer>
  );
});

export default Seleccionable;
