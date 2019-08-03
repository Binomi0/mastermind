import { combineReducers } from 'redux';

import gameReducer from './gameReducer';
import settingsReducer from './settingsReducer';
import scoreReducer from './scoreReducer';

export default combineReducers({
    game: gameReducer,
    settings: settingsReducer,
    score: scoreReducer,
});

