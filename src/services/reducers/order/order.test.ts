import {
  createOrderFailedAction,
  createOrderLoadingAction,
  createOrderSuccessAction,
} from "../../actions/order";
import { initialState, orderReducer } from "./order";

describe("Order reducer", () => {
  it("should return initial state", () => {
    // @ts-ignore
    expect(orderReducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should handle order creating request", () => {
    const stateAtRequest = {
      ...initialState,
      orderCreatingLoading: true,
    };
    expect(orderReducer(undefined, createOrderLoadingAction())).toEqual(
      stateAtRequest
    );
  });

  it("should handle order creating success", () => {
    const sucessfullOrderResponse = {
      success: true,
      name: "Super Burger",
      order: {
        number: "42",
      },
    };
    const stateAfterSuccess = {
      ...initialState,
      orderCreatingLoading: false,
      orderCreatingFailed: false,
      orderReceiptNumber: "42",
    };
    expect(
      orderReducer(
        undefined,
        createOrderSuccessAction(sucessfullOrderResponse.order.number)
      )
    ).toEqual(stateAfterSuccess);
  });

  it("should handle order creating failed", () => {
    const stateAfterFailure = {
      ...initialState,
      orderCreatingLoading: false,
      orderCreatingFailed: true,
    };
    expect(orderReducer(undefined, createOrderFailedAction())).toEqual(
      stateAfterFailure
    );
  });
});
