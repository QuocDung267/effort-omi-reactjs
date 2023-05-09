import { createStore, applyMiddleware, compose } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import throttle from "lodash.throttle";
import { loadFromLocalStorage, saveToLocalStorage } from "../config/localStore";

import rootReducer from "./rootReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleWare = [logger, thunk];

const store = createStore(
  rootReducer,
  loadFromLocalStorage(),
  composeEnhancers(applyMiddleware(...middleWare))
);

store.subscribe(
  throttle(() => {
    saveToLocalStorage({
      user: store.getState().user,
      project: store.getState().project,
      dashboard: store.getState().dashboard,
      common: store.getState().common,
    });
  }, 1000)
);

export default store;
