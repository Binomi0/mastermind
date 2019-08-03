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
