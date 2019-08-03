import createReducer from '../redux/create-reducer';
import { SET_SCORE } from '../action-types';

const DEFAULT_SCORE = 0;

export const setScore = (points = DEFAULT_SCORE, bonus = DEFAULT_SCORE) => (
  dispatch,
) => {
  dispatch({ type: SET_SCORE.SET, payload: { points, bonus } });
};

export const actions = {
  setScore,
};

const INITIAL_STATE = {
  points: 0,
  bonus: 0,
};

const ACTION_HANDLERS = {
  [SET_SCORE.SET]: (state, { payload }) => ({ ...state, ...payload }),
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
