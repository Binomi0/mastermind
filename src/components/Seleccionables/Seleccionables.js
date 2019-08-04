import React from 'react';
import { connect } from 'react-redux';
import Seleccionable from '../Seleccionable';
import { actions } from '../../reducers/gameReducer';
import './seleccionable.scss';

class Seleccionables extends React.Component {
  render() {
    const { handleValidate, turnFilled, availableColors } = this.props;
    return (
      <div className="seleccionable">
        <div className="fichas">
          {availableColors.map((color, index) => (
            <Seleccionable key={color} color={color} index={index + 1} />
          ))}
        </div>
        <button disabled={!turnFilled} onClick={handleValidate}>
          Validar jugada
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ game }) => ({
  turnFilled: game.turnFilled,
  availableColors: game.availableColors,
});

const mapDispatchToProps = { ...actions };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Seleccionables);
