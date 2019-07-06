import React, { memo } from 'react';
import { GameContext } from '../../context/game';

const Seleccionable = memo(function Seleccionable({ color, index }) {
  const fichaRef = React.createRef();

  return (
    <GameContext.Consumer>
      {({ changeColor }) => (
        <div
          ref={fichaRef}
          onClick={() => changeColor(color)}
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
