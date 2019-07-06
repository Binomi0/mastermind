import React, { memo } from 'react';

import Validation from '../Validation/Validation';
import { GameContext } from '../../context/game';

import './validations.css';

const Validations = memo(function Validations() {
  return (
    <GameContext.Consumer>
      {({ activeColumn, validation, handleValidate }) => (
        <div className="tablero-juego validations">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((column) => (
            <Validation
              key={column}
              validItems={validation[column]}
              active={activeColumn === column}
              onClick={() => handleValidate(activeColumn)}
            />
          ))}
        </div>
      )}
    </GameContext.Consumer>
  );
});

export default Validations;
