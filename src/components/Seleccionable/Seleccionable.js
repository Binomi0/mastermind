import React from 'react';
import { connect } from 'react-redux';
import { handleSetMovement } from '../../reducers/gameReducer';

const Seleccionable = ({ color, index, handleSetMovement }) => {
  return (
    <div
      onClick={() => handleSetMovement(color)}
      className="ficha-seleccionable"
      style={{ background: color }}
    >
      {index}
    </div>
  );
};

const mapDispatchToProps = { handleSetMovement };

export default connect(
  null,
  mapDispatchToProps,
)(Seleccionable);
