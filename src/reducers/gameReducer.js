import createReducer from '../redux/create-reducer';
import { RESET_GAME, START_GAME } from '../action-types';

const resetGame = () => (dispatch) => {
  dispatch({ type: RESET_GAME.SET });
};

export const startGame = (param) => (dispatch) => {
  dispatch({ type: START_GAME.SET });
};

export const actions = {
  resetGame,
  startGame,
};

const INITIAL_STATE = {
  gameStarted: false,
  result: [],
  playerName: '',
  availableColors: [],
  level: '',
};

const ACTION_HANDLERS = {
  [RESET_GAME.SET]: () => INITIAL_STATE,
  [START_GAME.SET]: (state) => ({ ...state, gameStarted: true }),
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
