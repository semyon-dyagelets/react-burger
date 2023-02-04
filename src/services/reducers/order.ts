import { TCreateOrderActions } from "../actions/order";
import {
  CREATE_ORDER_FAILED,
  CREATE_ORDER_LOADING,
  CREATE_ORDER_SUCCESS,
} from "../constants/index";

type TOrdersState = {
  orderReceiptNumber: string,
  orderLoading: boolean,
  orderFailed: boolean,
}

const initialState: TOrdersState = {
  orderReceiptNumber: "0000",
  orderLoading: false,
  orderFailed: false,
};

export const orderReducer = (state = initialState, action: TCreateOrderActions): TOrdersState => {
  switch (action.type) {
    case CREATE_ORDER_LOADING: {
      return {
        ...state,
        orderLoading: true,
      };
    }
    case CREATE_ORDER_SUCCESS: {
      return {
        ...state,
        orderReceiptNumber: action.orderReceiptNumber,
        orderLoading: false,
        orderFailed: false,
      };
    }
    case CREATE_ORDER_FAILED: {
      return {
        ...state,
        orderReceiptNumber: "0000",
        orderLoading: false,
        orderFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};
