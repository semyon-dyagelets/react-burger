import { sendOrder } from "../../utils/api";
import {
  CREATE_ORDER_LOADING,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILED,
} from "../constants";
import { AppDispatch } from "../types";
import { TOrderRequest } from "../types/data";

export interface ICreateOrderLoadingAction {
  readonly type: typeof CREATE_ORDER_LOADING;
}

export interface ICreateOrderSuccessAction {
  readonly type: typeof CREATE_ORDER_SUCCESS;
  readonly orderReceiptNumber: string;
}

export interface ICreateOrderFailedAction {
  readonly type: typeof CREATE_ORDER_FAILED;
}

export type TOrderActions =
  | ICreateOrderLoadingAction
  | ICreateOrderSuccessAction
  | ICreateOrderFailedAction

export const createOrderLoadingAction = (): ICreateOrderLoadingAction => ({
  type: CREATE_ORDER_LOADING,
});

export const createOrderSuccessAction = (
  orderReceiptNumber: string
): ICreateOrderSuccessAction => ({
  type: CREATE_ORDER_SUCCESS,
  orderReceiptNumber,
});

export const createOrderFailedAction = (): ICreateOrderFailedAction => ({
  type: CREATE_ORDER_FAILED,
});

export const createOrder =
  (orderRequest: TOrderRequest) => (dispatch: AppDispatch) => {
    dispatch(createOrderLoadingAction());
    sendOrder(orderRequest).then((data) => {
      if (data) {
        dispatch(createOrderSuccessAction(data.order.number));
      } else {
        dispatch(createOrderFailedAction());
      }
    });
  };
