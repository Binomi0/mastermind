import createReducer from '../redux/create-reducer';
import { SET_SCORE } from '../action-types';

const MAX_COLUMNS = 11;

export const calculateScore = () => (dispatch, getState) => {
  const { timeElapsed, activeColumn } = getState().game;
  const {
    level: { bonus },
  } = getState().settings;

  const finishColumn = MAX_COLUMNS - activeColumn;
  const timeBonus = 300 - timeElapsed;

  const score = timeBonus * finishColumn + bonus;

  dispatch(setScore(score));
};

export const setScore = (points) => (dispatch) => {
  dispatch({ type: SET_SCORE.SET, payload: points });
};

export const actions = {
  setScore,
  calculateScore,
};

const INITIAL_STATE = {
  points: 0,
};

const ACTION_HANDLERS = {
  [SET_SCORE.SET]: (state, { payload }) => ({ ...state, points: payload }),
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
