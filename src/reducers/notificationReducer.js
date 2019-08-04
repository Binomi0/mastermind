import createReducer from '../redux/create-reducer';
import { ADD_NOTIFICATION } from '../action-types';

export const addNotification = (notification) => (dispatch) => {
  dispatch({ type: ADD_NOTIFICATION.SET, payload: notification });
};

export const actions = {
  addNotification,
};

const INITIAL_STATE = {
  title: 'Título',
  message: 'Mensaje',
  type: 'info',
  duration: 3000,
};

const ACTION_HANDLERS = {
  [ADD_NOTIFICATION.SET]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
