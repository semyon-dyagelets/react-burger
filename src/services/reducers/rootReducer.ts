import { combineReducers } from "redux";
import { constructorReducer } from "./constructor";
import { ingredientsReducer } from "./ingredients";
import { orderReducer } from "./order";
import { userReducer } from "./user";
import { websocketReducer } from "./websocket";

export const rootReducer = combineReducers({
  ingredientsState: ingredientsReducer,
  constructorState: constructorReducer,
  orderState: orderReducer,
  userState: userReducer,
  websocketState: websocketReducer,
});