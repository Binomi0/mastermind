function requestAction(action) {
  return {
    REQUEST: `${action}_REQUEST`,
    SUCCESS: `${action}_SUCCESS`,
    FAILURE: `${action}_FAILURE`,
    SET: `${action}_SET`,
  };
}

export const RESET_GAME = requestAction('game/RESET_GAME');
export const START_GAME = requestAction('game/START_GAME');
export const SET_LEVEL = requestAction('game/SET_LEVEL');
export const SET_SCORE = requestAction('game/SET_SCORE');
export const SET_PLAYER_NAME = requestAction('game/SET_PLAYER_NAME');
export const SET_USER_MOVEMENT = requestAction('game/SET_USER_MOVEMENT');
export const SET_COLOR = requestAction('game/SET_COLOR');
export const SET_GAME_TURN = requestAction('game/SET_GAME_TURN');
export const SET_GAME_WIN = requestAction('game/SET_GAME_WIN');
export const SET_GAME_LOST = requestAction('game/SET_GAME_LOST');
export const SET_TURN_FILLED = requestAction('game/SET_TURN_FILLED');
export const SET_GAME_FINISHED = requestAction('game/SET_GAME_FINISHED');
export const UPDATE_TIMER = requestAction('game/UPDATE_TIMER');
export const ADD_NOTIFICATION = requestAction('game/ADD_NOTIFICATION');
export const RESET_LEVEL = requestAction('game/RESET_LEVEL');
