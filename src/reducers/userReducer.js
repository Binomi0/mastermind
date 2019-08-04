import createReducer from '../redux/create-reducer';
import { SET_PLAYER_NAME } from '../action-types';

const DEFAULT_PLAYER_NAME = 'Guest';

export const setPlayerName = (name) => (dispatch) => {
  if (!name) {
    const playerName = localStorage.getItem('mm-player-name');
    if (playerName) {
      dispatch({ type: SET_PLAYER_NAME.SET, payload: playerName });
    }
  } else {
    dispatch({ type: SET_PLAYER_NAME.SET, payload: name });
    localStorage.setItem('mm-player-name', name);
  }
};

export const actions = {
  setPlayerName,
};

const INITIAL_STATE = {
  playerName: DEFAULT_PLAYER_NAME,
};

const ACTION_HANDLERS = {
  [SET_PLAYER_NAME.SET]: (state, { payload }) => ({
    ...state,
    playerName: payload,
  }),
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
