import { TOrderActions } from "../../actions/order";
import { CREATE_ORDER_FAILED, CREATE_ORDER_LOADING, CREATE_ORDER_SUCCESS } from "../../constants";

type TOrdersState = {
  orderReceiptNumber: string;
  orderCreatingLoading: boolean;
  orderCreatingFailed: boolean;
};

export const initialState: TOrdersState = {
  orderReceiptNumber: "0000",
  orderCreatingLoading: false,
  orderCreatingFailed: false,
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
    default: {
      return state;
    }
  }
};
