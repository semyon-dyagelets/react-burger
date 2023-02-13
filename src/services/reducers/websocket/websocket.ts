import { TWebSocketFeedActions } from "../../actions/websocket";
import {
  WEBSOCKET_CONNECTION_CLOSED,
  WEBSOCKET_CONNECTION_FAILED,
  WEBSOCKET_CONNECTION_REQUEST,
  WEBSOCKET_CONNECTION_SUCCESS,
  WEBSOCKET_GET_ORDERS,
} from "../../constants/index";
import { TWebSocketOrder } from "../../types/data";

type TWebSocketState = {
  websocketConnected: boolean;
  orders: TWebSocketOrder[];
  ordersTotalQuantity: number;
  ordersTodayQuantity: number;
};

export const initialState: TWebSocketState = {
  websocketConnected: false,
  orders: [],
  ordersTotalQuantity: 0,
  ordersTodayQuantity: 0,
};

export const websocketReducer = (
  state = initialState,
  action: TWebSocketFeedActions
): TWebSocketState => {
  switch (action.type) {
    case WEBSOCKET_CONNECTION_REQUEST: {
      return {
        ...state,
      };
    }
    case WEBSOCKET_CONNECTION_SUCCESS: {
      return {
        ...state,
        websocketConnected: true,
      };
    }
    case WEBSOCKET_CONNECTION_FAILED: {
      return {
        ...state,
        websocketConnected: false,
      };
    }
    case WEBSOCKET_CONNECTION_CLOSED: {
      return {
        ...state,
        websocketConnected: false,
      };
    }
    case WEBSOCKET_GET_ORDERS: {
      return {
        ...state,
        orders: action.payload.orders,
        ordersTodayQuantity: action.payload.totalToday,
        ordersTotalQuantity: action.payload.total,
      };
    }
    default: {
      return state;
    }
  }
};
