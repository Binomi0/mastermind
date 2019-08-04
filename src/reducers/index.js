import { combineReducers } from 'redux';

import gameReducer from './gameReducer';
import settingsReducer from './settingsReducer';
import scoreReducer from './scoreReducer';
import userReducer from './userReducer';
import notificationReducer from './notificationReducer';

export default combineReducers({
  game: gameReducer,
  settings: settingsReducer,
  score: scoreReducer,
  notification: notificationReducer,
  user: userReducer,
});
