import createReducer from '../redux/create-reducer';
import { SET_LEVEL } from '../action-types';

export const setLevel = (level) => (dispatch) => {
    dispatch({type: SET_LEVEL.SET})
};

export const actions = {
    setLevel,
};

const INITIAL_STATE = {
    level: 5,
};

const ACTION_HANDLERS = {
    [SET_LEVEL.SET]: (state, {payload}) => ({...state, level: payload})
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);