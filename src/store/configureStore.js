import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware, routerActions } from 'connected-react-router';
import createRootReducer from '../reducers';

export const history = createBrowserHistory();
const rootReducer = createRootReducer(history);

export function configureStore(initialState) {
  const middleWare = [];
  const enhancers = [];

  middleWare.push(thunk);

  const router = routerMiddleware(history);
  middleWare.push(router);

  // DevTools Config
  const actionCreators = {
    ...routerActions
  };

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        actionCreators
      })
    : compose;
  
  enhancers.push(applyMiddleware(...middleWare));
  const enhancer = composeEnhancers(...enhancers);

  // Create store
  const store = createStore(rootReducer, initialState, enhancer);

  return store;
};
