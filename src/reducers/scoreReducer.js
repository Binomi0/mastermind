import createReducer from '../redux/create-reducer';
import { GET_SCORE } from '../action-types';

export const setScore = (points, bonus) => (dispatch) => {
    dispatch({type: GET_SCORE.SET, payload: {points, bonus}})
};

export const actions = {
    setLevel,
};

const INITIAL_STATE = {
    points: 0,
    bonus: 0,
};

const ACTION_HANDLERS = {
    [GET_SCORE.SET]: (state, {payload}) => ({...state, ...payload})
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);