import { getOrderByNumber, sendOrder } from "../../utils/api";
import {
  CREATE_ORDER_LOADING,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILED,
  GET_ORDER_LOADING,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
} from "../constants";
import { AppDispatch } from "../types";
import { TOrderRequest, TWebSocketOrder } from "../types/data";

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

export interface IGetOrderLoadingAction {
  readonly type: typeof GET_ORDER_LOADING;
}

export interface IGetOrderSuccessAction {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly order: TWebSocketOrder;
}

export interface IGetOrderFailedAction {
  readonly type: typeof GET_ORDER_FAILED;
}

export type TOrderActions =
  | ICreateOrderLoadingAction
  | ICreateOrderSuccessAction
  | ICreateOrderFailedAction
  | IGetOrderLoadingAction
  | IGetOrderSuccessAction
  | IGetOrderFailedAction;

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

export const getOrderLoadingAction = (): IGetOrderLoadingAction => ({
  type: GET_ORDER_LOADING,
});

export const getOrderSuccessAction = (
  order: TWebSocketOrder
): IGetOrderSuccessAction => ({
  type: GET_ORDER_SUCCESS,
  order,
});

export const getOrderFailedAction = (): IGetOrderFailedAction => ({
  type: GET_ORDER_FAILED,
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

export const getOrder = (orderNumber: number) => (dispatch: AppDispatch) => {
  dispatch(getOrderLoadingAction());
  getOrderByNumber(orderNumber).then((res) => {
    if (res) {
      dispatch(getOrderSuccessAction(res.orders[0]));
    } else {
      dispatch(getOrderFailedAction());
    }
  });
};
