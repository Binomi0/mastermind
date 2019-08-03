import createReducer from '../redux/create-reducer';
import { SET_PLAYER_NAME } from '../action-types';

const DEFAULT_PLAYER_NAME = 'Guest';

export const setPlayerName = (name = DEFAULT_PLAYER_NAME) => (dispatch) => {
  dispatch({ type: SET_PLAYER_NAME.SET, payload: name });
};

export const actions = {
  setPlayerName,
};

const INITIAL_STATE = {
  name: '',
};

const ACTION_HANDLERS = {
  [SET_PLAYER_NAME.SET]: (state, { payload }) => ({ ...state, name: payload }),
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
