function requestAction(action) {
    return {
        REQUEST: `${action}_REQUEST`,
        SUCCESS: `${action}_SUCCESS`,
        FAILURE: `${action}_FAILURE`,
        SET: `${action}_SET`
    }
}

export const RESET_GAME = requestAction('game/RESET_GAME');
export const START_GAME = requestAction('game/START_GAME');
export const SET_LEVEL = requestAction('game/SET_LEVEL');
export const GET_SCORE = requestAction('game/GET_SCORE');