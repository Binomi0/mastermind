import React from 'react';
import { connect } from 'react-redux';
import Validation from '../Validation';
import './validations.scss';

const Validations = ({ validation, activeColumn }) => {
  return (
    <div className="validations">
      {Object.keys(validation).map((column) => (
        <Validation
          key={column}
          validItems={validation[column]}
          active={activeColumn === column}
        />
      ))}
    </div>
  );
};

const mapStateToProps = ({ game }) => ({
  activeColumn: game.activeColumn,
  validation: game.validation,
});

export default connect(mapStateToProps)(Validations);
