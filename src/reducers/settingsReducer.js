import createReducer from '../redux/create-reducer';
import { SET_LEVEL } from '../action-types';
import * as levels from '../utils/constants';

export const setNewGameLevel = (level) => (dispatch) => {
  let newLevel;
  switch (level) {
    case '5':
      newLevel = {
        id: 5,
        items: [...levels.easyGame],
        name: 'easyGame',
        bonus: 1000,
      };
      break;
    case '6':
      newLevel = {
        id: 6,
        items: [...levels.mediumGame],
        name: 'mediumGame',
        bonus: 3000,
      };
      break;
    case '7':
      newLevel = {
        id: 7,
        items: [...levels.hardGame],
        name: 'hardGame',
        bonus: 6000,
      };
      break;
    case '8':
      newLevel = {
        id: 8,
        items: [...levels.extraHardGame],
        name: 'extraHardGame',
        bonus: 10000,
      };
      break;
    default:
      newLevel = {
        id: 5,
        items: [...levels.easyGame],
        name: 'easyGame',
        bonus: 1000,
      };
      break;
  }
  dispatch({ type: SET_LEVEL.SET, payload: newLevel });
};

export const actions = {
  setNewGameLevel,
};

const INITIAL_STATE = {
  level: null,
};

const ACTION_HANDLERS = {
  [SET_LEVEL.SET]: (state, { payload }) => ({ ...state, level: payload }),
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
