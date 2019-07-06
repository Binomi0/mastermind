import React, { memo } from 'react';

import Validation from '../Validation/Validation';
import { GameContext } from '../../context/game';

import './validations.css';

const Validations = memo(function Validations() {
  return (
    <GameContext.Consumer>
      {({ activeColumn, validation }) => (
        <div className="tablero-juego validations">
          {Object.keys(validation)
            .map((column) => (
              <Validation
                key={column}
                validItems={validation[column]}
                active={activeColumn === column}
              />
            ))
            .reverse()}
        </div>
      )}
    </GameContext.Consumer>
  );
});

export default Validations;
