import {
  CREATE_ORDER_FAILED,
  CREATE_ORDER_LOADING,
  CREATE_ORDER_SUCCESS,
} from "../actions/order";

const initialState = {
  orderReceiptNumber: "0000",
  orderLoading: false,
  orderFailed: false,
};

export const orderReducer = (state = initialState, action) => {
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
