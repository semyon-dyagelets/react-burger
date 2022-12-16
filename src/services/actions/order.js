import { sendOrder } from "../api";

export const CREATE_ORDER_LOADING = "CREATE_ORDER_LOADING";
export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";
export const CREATE_ORDER_FAILED = "CREATE_ORDER_FAILED";

export const createOrder = (orderRequest) => {
  return (dispatch) => {
    dispatch({ type: CREATE_ORDER_LOADING });
    sendOrder(orderRequest)
      .then((data) =>
        dispatch({
          type: CREATE_ORDER_SUCCESS,
          orderReceiptNumber: data.order.number,
        })
      )
      .catch(dispatch({ type: CREATE_ORDER_FAILED }));
  };
};
