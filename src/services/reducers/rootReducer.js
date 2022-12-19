import { combineReducers } from "redux";
import { constructorReducer } from "./constructor";
import { detailsReducer } from "./details";
import { ingredientsReducer } from "./ingredients";
import { orderReducer } from "./order";

export const rootReducer = combineReducers({
  ingredientsState: ingredientsReducer,
  detailsState: detailsReducer,
  constructorState: constructorReducer,
  orderState: orderReducer,
});
