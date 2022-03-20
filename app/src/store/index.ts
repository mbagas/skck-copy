/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import * as reducers from './reducers';
import { applyInterceptors } from './axios';
``;
const rootReducer = combineReducers(reducers);
const composeEnhancers =
  // @ts-ignore
  (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

applyInterceptors(store.dispatch);

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
