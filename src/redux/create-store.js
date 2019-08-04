import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import customReduxMiddlewares from './middlewares';
import rootReducer from '../reducers';

export default (initialState = {}) => {
  const middlewares = [...customReduxMiddlewares];

  // Redux Dev Tools
  const composeEnhancers = composeWithDevTools({});

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares)),
  );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const reducers = require('../reducers').default;
      store.replaceReducer(reducers(store.asyncReducers));
    });
  }

  return store;
};
