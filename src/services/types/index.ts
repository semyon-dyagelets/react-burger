import { store } from "../store";
import {
  TypedUseSelectorHook,
  useSelector as selectorHook,
  useDispatch as dispatchHook,
} from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { TOrderActions } from "../actions/order";
import { TUserActions } from "../actions/user";
import { TConstructorActions } from "../actions/constructor";
import { TIngredientsActions } from "../actions/ingredients";
import { TWebSocketFeedActions } from "../actions/websocket";

export type AppActions =
  | TOrderActions
  | TUserActions
  | TConstructorActions
  | TIngredientsActions
  | TWebSocketFeedActions
export type AppDispatch = ThunkDispatch<RootState, never, AppActions>;
export const useAppDispatch = () => dispatchHook<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook;

export type RootState = ReturnType<typeof store.getState>;
