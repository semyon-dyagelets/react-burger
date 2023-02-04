import { TOrderActions } from "../actions/order";
import {
  CREATE_ORDER_FAILED,
  CREATE_ORDER_LOADING,
  CREATE_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  GET_ORDER_LOADING,
  GET_ORDER_SUCCESS,
} from "../constants/index";
import { TWebSocketOrder } from "../types/data";

type TOrdersState = {
  orderReceiptNumber: string;
  orderCreatingLoading: boolean;
  orderCreatingFailed: boolean;
  selectedOrder: TWebSocketOrder | null;
  orderRequestLoading: boolean;
  orderRequestFailed: boolean;
};

const initialState: TOrdersState = {
  orderReceiptNumber: "0000",
  orderCreatingLoading: false,
  orderCreatingFailed: false,
  selectedOrder: null,
  orderRequestLoading: false,
  orderRequestFailed: false,
};

export const orderReducer = (
  state = initialState,
  action: TOrderActions
): TOrdersState => {
  switch (action.type) {
    case CREATE_ORDER_LOADING: {
      return {
        ...state,
        orderCreatingLoading: true,
      };
    }
    case CREATE_ORDER_SUCCESS: {
      return {
        ...state,
        orderReceiptNumber: action.orderReceiptNumber,
        orderCreatingLoading: false,
        orderCreatingFailed: false,
      };
    }
    case CREATE_ORDER_FAILED: {
      return {
        ...state,
        orderReceiptNumber: "0000",
        orderCreatingLoading: false,
        orderCreatingFailed: true,
      };
    }

    case GET_ORDER_LOADING: {
      return {
        ...state,
        orderRequestLoading: true,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequestLoading: false,
        orderCreatingFailed: false,
        selectedOrder: action.order,
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        orderRequestLoading: false,
        orderRequestFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};
