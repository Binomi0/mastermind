import createReducer from '../redux/create-reducer';
import {
  RESET_GAME,
  START_GAME,
  SET_USER_MOVEMENT,
  SET_COLOR,
  SET_GAME_TURN,
  SET_GAME_WIN,
  SET_GAME_LOST,
  SET_TURN_FILLED,
  SET_GAME_FINISHED,
  UPDATE_TIMER,
} from '../action-types';
import { shuffle } from '../utils/helpers';
import * as validations from '../utils/validations';
import { calculateScore } from './scoreReducer';
import { addNotification } from '../reducers/notificationReducer';

export const setUserSelectedMovement = (item, column) => (dispatch) => {
  dispatch({ type: SET_USER_MOVEMENT.SET, payload: { item, column } });
};

const resetGame = () => (dispatch) => {
  dispatch({ type: RESET_GAME.SET });
};

export const startGame = () => (dispatch, getState) => {
  const {
    level: { items },
  } = getState().settings;

  const newLevel = {
    availableColors: [...items],
    result: shuffle([...items]).splice(0, 4),
  };
  dispatch({ type: START_GAME.SET, payload: newLevel });
};

export const setGameFinished = () => (dispatch) => {
  dispatch({ type: SET_GAME_FINISHED });
};

export const handleSetMovement = ({
  color,
  activeColumn,
  movement,
  itemColors,
}) => (dispatch) => {
  if (movement / activeColumn > 4) {
    return;
  }

  const newTurn = {
    selectedColor: color,
    itemColors: {
      ...itemColors,
      [activeColumn]: {
        ...itemColors[activeColumn],
        [movement]: color,
      },
    },
    movement: movement + 1,
  };
  dispatch({ type: SET_COLOR.SET, payload: newTurn });
};

const handleValidate = (callback) => (dispatch, getState) => {
  const { result, activeColumn, itemColors, validation } = getState().game;

  const turn = Object.values(itemColors[activeColumn]);
  const isRowFilled = validations.isRowFilled(turn);

  // Any of the items are not colured
  if (!isRowFilled) {
    return;
  }

  const match = validations.getMatch(turn, result);

  // Fills `gameFinish` list with matched results identified with number 2
  const gameFinish = match.filter((item) => item === 2);

  // 4 items are equal to 2 so player wins
  if (gameFinish.length === 4) {
    dispatch(calculateScore());
    dispatch({ type: SET_GAME_WIN.SET });
    callback(true);
    return;
  }

  // Last column was filled so game over
  if (activeColumn === 10) {
    dispatch({ type: SET_GAME_LOST.SET });
    callback(true);
    return;
  }

  dispatch({
    type: SET_GAME_TURN.SET,
    payload: {
      validation: {
        ...validation,
        [activeColumn]: match,
      },
      activeColumn: activeColumn + 1,
      turnFilled: false,
    },
  });

  const position = gameFinish.length;
  const colores = match.length;
  const notification = {
    title: '',
    message: `Has acertado ${position} posición y ${colores} colores`,
  };
  dispatch(addNotification(notification));
};

const handleTurn = () => (dispatch) => {
  const { activeColumn, itemColors } = this.props;
  const turn = Object.values(itemColors[activeColumn]);
  const isRowFilled = validations.isRowFilled(turn);
  if (!isRowFilled) {
    dispatch({ type: SET_TURN_FILLED, payload: false });
  } else {
    dispatch({ type: SET_TURN_FILLED, payload: true });
  }
};

const updateTimer = (timer) => (dispatch) => {
  dispatch({ type: UPDATE_TIMER.SET, payload: timer });
};

export const actions = {
  resetGame,
  startGame,
  setUserSelectedMovement,
  handleSetMovement,
  handleValidate,
  handleTurn,
  updateTimer,
  setGameFinished,
};

const INITIAL_STATE = {
  activeColumn: 1,
  availableColors: [],
  gameStarted: false,
  gameWin: false,
  gameLost: false,
  itemColors: {
    1: {
      1: '',
      2: '',
      3: '',
      4: '',
    },
    2: {
      5: '',
      6: '',
      7: '',
      8: '',
    },
    3: {
      9: '',
      10: '',
      11: '',
      12: '',
    },
    4: {
      13: '',
      14: '',
      15: '',
      16: '',
    },
    5: {
      17: '',
      18: '',
      19: '',
      20: '',
    },
    6: {
      21: '',
      22: '',
      23: '',
      24: '',
    },
    7: {
      25: '',
      26: '',
      27: '',
      28: '',
    },
    8: {
      29: '',
      30: '',
      31: '',
      32: '',
    },
    9: {
      33: '',
      34: '',
      35: '',
      36: '',
    },
    10: {
      37: '',
      38: '',
      39: '',
      40: '',
    },
  },
  movement: 1,
  result: [],
  selectedColor: 'white',
  turnFilled: false,
  timeElapsed: 0,
  validation: {
    1: [0, 0, 0, 0],
    2: [0, 0, 0, 0],
    3: [0, 0, 0, 0],
    4: [0, 0, 0, 0],
    5: [0, 0, 0, 0],
    6: [0, 0, 0, 0],
    7: [0, 0, 0, 0],
    8: [0, 0, 0, 0],
    9: [0, 0, 0, 0],
    10: [0, 0, 0, 0],
  },
};

const ACTION_HANDLERS = {
  [RESET_GAME.SET]: () => INITIAL_STATE,
  [START_GAME.SET]: (state, { payload }) => ({
    ...state,
    ...payload,
    gameStarted: true,
  }),
  [SET_USER_MOVEMENT.SET]: (state, { payload }) => ({
    ...state,
    movement: payload.item,
    activeColumn: payload.column,
  }),
  [SET_COLOR.SET]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),
  [SET_GAME_WIN.SET]: (state) => ({
    ...state,
    gameWin: true,
  }),
  [SET_GAME_LOST.SET]: (state) => ({
    ...state,
    gameLost: true,
  }),
  [SET_GAME_TURN.SET]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),
  [SET_GAME_FINISHED]: (state) => ({ ...state, gameStarted: false }),
  [UPDATE_TIMER.SET]: (state, { payload }) => ({
    ...state,
    timeElapsed: payload,
  }),
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
