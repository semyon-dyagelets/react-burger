import {
  WEBSOCKET_CONNECTION_CLOSED,
  WEBSOCKET_CONNECTION_FAILED,
  WEBSOCKET_CONNECTION_REQUEST,
  WEBSOCKET_CONNECTION_SUCCESS,
  WEBSOCKET_GET_ORDERS,
  WEBSOCKET_SEND_ORDER,
} from "../constants";
import { TWebSocketOrder, TWebSocketOrdersResponse } from "../types/data";

export interface IWebSocketConnectionRequestAction {
  readonly type: typeof WEBSOCKET_CONNECTION_REQUEST;
  readonly url: string;
}

export interface IWebSocketConnectionSuccessAction {
  readonly type: typeof WEBSOCKET_CONNECTION_SUCCESS;
}

export interface IWebSocketConnectionFailedAction {
  readonly type: typeof WEBSOCKET_CONNECTION_FAILED;
}

export interface IWebSocketConnectionClosedAction {
  readonly type: typeof WEBSOCKET_CONNECTION_CLOSED;
}

export interface IWebSocketGetOrdersAction {
  readonly type: typeof WEBSOCKET_GET_ORDERS;
  readonly payload: TWebSocketOrdersResponse;
}

export interface IWebSocketSendOrderAction {
  readonly type: typeof WEBSOCKET_SEND_ORDER;
  readonly payload: TWebSocketOrder;
}

export type TWebSocketFeedActions =
  | IWebSocketConnectionRequestAction
  | IWebSocketConnectionSuccessAction
  | IWebSocketConnectionFailedAction
  | IWebSocketConnectionClosedAction
  | IWebSocketGetOrdersAction
  | IWebSocketSendOrderAction;

export const webSocketConnectionRequestAction = (
  url: string
): IWebSocketConnectionRequestAction => ({
  type: WEBSOCKET_CONNECTION_REQUEST,
  url,
});

export const webSocketConnectionSuccessAction =
  (): IWebSocketConnectionSuccessAction => ({
    type: WEBSOCKET_CONNECTION_SUCCESS,
  });

export const webSocketConnectionFailedAction =
  (): IWebSocketConnectionFailedAction => ({
    type: WEBSOCKET_CONNECTION_FAILED,
  });

export const webSocketConnectionClosedAction =
  (): IWebSocketConnectionClosedAction => ({
    type: WEBSOCKET_CONNECTION_CLOSED,
  });

export const webSocketGetOrdersAction = (
  payload: TWebSocketOrdersResponse
): IWebSocketGetOrdersAction => ({
  type: WEBSOCKET_GET_ORDERS,
  payload,
});

export const webSocketSendOrderAction = (
  payload: TWebSocketOrder
): IWebSocketSendOrderAction => ({
  type: WEBSOCKET_SEND_ORDER,
  payload,
});
