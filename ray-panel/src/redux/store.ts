import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { reducers as commonReducers } from './reducers/common';
import { reducers as theme } from './reducers/theme';
import { epics as commonEpics } from './epics';
import { createLogger } from 'redux-logger';
import { isNative } from '@ray/env';

const reducers = {
  ...commonReducers,
  ...theme,
};

type Reducers = typeof reducers;

export type ReduxState = { [K in keyof Reducers]: ReturnType<Reducers[K]> };

export const rootReducers = combineReducers(reducers);

const allEpics = [...commonEpics];

export const rootEpics = combineEpics(...allEpics);

const epicMiddleware = createEpicMiddleware();

const isDebuggingInChrome = isNative && __DEV__ && !!window.navigator.userAgent;
const logger = createLogger({
  predicate: () => isDebuggingInChrome,
  collapsed: true,
  duration: true,
});

const middleware = isDebuggingInChrome ? [epicMiddleware, logger] : [epicMiddleware];

function configureStore(initialState?: Partial<ReduxState>) {
  const appliedMiddleware = applyMiddleware(...middleware);

  const store = createStore(rootReducers, initialState, compose(appliedMiddleware));

  epicMiddleware.run(rootEpics);
  return store;
}

export const store = configureStore();
