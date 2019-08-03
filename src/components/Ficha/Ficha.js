import React from 'react';
import { connect } from 'react-redux';
import { setUserSelectedMovement } from '../../reducers/gameReducer';
import './ficha.scss';

const Ficha = ({
  itemIndex,
  column,
  isColumnActive,
  movement,
  itemColors,
  setUserSelectedMovement,
}) => {
  const handleClick = () => {
    setUserSelectedMovement(itemIndex, column);
  };

  const active = itemIndex <= movement && isColumnActive;

  return (
    <div
      onClick={handleClick}
      className={`ficha ficha-${itemIndex} column-${column}${
        active ? ' active' : ''
      }`}
      style={{ background: itemColors[column][itemIndex] }}
    />
  );
};

const mapStateToProps = ({ game }) => ({
  itemColors: game.itemColors,
  movement: game.movement,
});

export default connect(
  mapStateToProps,
  { setUserSelectedMovement },
)(Ficha);
