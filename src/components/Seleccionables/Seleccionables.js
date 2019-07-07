import React, { memo } from 'react';

import { colors } from '../../utils/constants';
import Seleccionable from '../Seleccionable/Seleccionable';
import { GameContext } from '../../context/game';

import './seleccionable.scss';

const Seleccionables = memo(function Seleccionables() {
  return (
    <GameContext.Consumer>
      {({ handleValidate, turnFilled }) => (
        <div className="seleccionable">
          <div className="fichas">
            {Object.keys(colors).map((color, index) => (
              <Seleccionable key={color} color={color} index={index + 1} />
            ))}
          </div>
          <button disabled={!turnFilled} onClick={handleValidate}>
            Validar jugada
          </button>
        </div>
      )}
    </GameContext.Consumer>
  );
});

export default Seleccionables;
