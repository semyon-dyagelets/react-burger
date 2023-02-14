import { combineReducers } from "redux";
import { constructorReducer } from "./constructor/constructor";
import { ingredientsReducer } from "./ingredients/ingredients";
import { orderReducer } from "./order/order";
import { userReducer } from "./user/user";
import { websocketReducer } from "./websocket/websocket";

export const rootReducer = combineReducers({
  ingredientsState: ingredientsReducer,
  constructorState: constructorReducer,
  orderState: orderReducer,
  userState: userReducer,
  websocketState: websocketReducer,
});
