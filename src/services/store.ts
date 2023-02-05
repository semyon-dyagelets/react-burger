import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { webSocketMiddleware } from "./middlewares/ws-middleware";

import { rootReducer } from "./reducers/rootReducer";
import { webSocketActions } from "./types/data";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk, webSocketMiddleware(webSocketActions))
);
export const store = createStore(rootReducer, enhancer);
