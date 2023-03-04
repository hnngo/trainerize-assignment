// Here we setup the middleware to configure the redux store and epic handler

import { AnyAction, applyMiddleware, compose, createStore } from "redux";
import { createEpicMiddleware } from "redux-observable";

import * as API from "../services/Api";
import * as actionType from "./constants";
import * as actions from "./actions";
import epics from "./epics";
import reducers, { RootState } from "./reducers";

export type RootStateType = RootState;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function;
  }
}

const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, RootState>({
  dependencies: API
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create store
function configureStore(initialState?: RootStateType) {
  // configure middlewares
  const middlewares = [epicMiddleware];
  // compose enhancers
  const enhancer = composeEnhancers(applyMiddleware(...middlewares));
  // create store
  return createStore(reducers, initialState, enhancer);
}

const store = configureStore();

epicMiddleware.run(epics);

export { store, actionType, actions };
