import React, { memo } from 'react';

import Validation from '../Validation';
import { GameContext } from '../../context/game';

import './validations.scss';

const Validations = memo(function Validations() {
  return (
    <GameContext.Consumer>
      {({ activeColumn, validation }) => (
        <div className="validations">
          {Object.keys(validation).map((column) => (
            <Validation
              key={column}
              validItems={validation[column]}
              active={activeColumn === column}
            />
          ))}
        </div>
      )}
    </GameContext.Consumer>
  );
});

export default Validations;
