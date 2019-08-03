import createReducer from '../redux/create-reducer';
import { RESET_GAME, START_GAME } from '../action-types';

const resetGame = () => (dispatch) => {
    dispatch({type: RESET_GAME.SET})
}

export const startGame = (param) => (dispatch) => {
    console.log('param', param)
    console.log('dispatch', dispatch)
    dispatch({type: START_GAME.SET})
};

export const actions = {
    resetGame,
    startGame
};

const INITIAL_STATE = {
    score: 0,
    gameStarted: false
};

const ACTION_HANDLERS = {
    [RESET_GAME.SET]: (state) => INITIAL_STATE,
    [START_GAME.SET]: (state) => ({...INITIAL_STATE, gameStarted: true})
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);