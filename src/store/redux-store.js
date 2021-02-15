import { applyMiddleware, combineReducers, compose, createStore,  } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { appReducer } from './appReducer';
import { authReducer } from './authReducer';
import { profileReducer } from './profileReducer';
import { newsReducer } from './newsReducer';

let rootReducer = combineReducers({
  app: appReducer,
  authPage: authReducer,
  profilePage: profileReducer,
  newsPage: newsReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunkMiddleware)
))

export default store;