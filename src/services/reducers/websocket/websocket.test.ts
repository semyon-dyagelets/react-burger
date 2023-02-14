import {
  webSocketConnectionClosedAction,
  webSocketConnectionFailedAction,
  webSocketConnectionRequestAction,
  webSocketConnectionSuccessAction,
  webSocketGetOrdersAction,
} from "../../actions/websocket";
import { initialState, websocketReducer } from "./websocket";

describe("Websocket reducer", () => {
  it("should return initial state", () => {
    // @ts-ignore
    expect(websocketReducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should handle websocket connecting request", () => {
    const url = "wss://norma.nomoreparties.space/orders";
    const stateAtRequest = {
      ...initialState,
    };
    expect(
      websocketReducer(undefined, webSocketConnectionRequestAction(url))
    ).toEqual(stateAtRequest);
  });

  it("should handle websocket connecting success", () => {
    const stateAfterSuccess = {
      ...initialState,
      websocketConnected: true,
    };
    expect(
      websocketReducer(undefined, webSocketConnectionSuccessAction())
    ).toEqual(stateAfterSuccess);
  });

  it("should handle websocket connecting failed", () => {
    const stateAfterFailure = {
      ...initialState,
      websocketConnected: false,
    };
    expect(
      websocketReducer(undefined, webSocketConnectionFailedAction())
    ).toEqual(stateAfterFailure);
  });

  it("should handle websocket connecting closed", () => {
    const stateAfterClosing = {
      ...initialState,
      websocketConnected: false,
    };
    expect(
      websocketReducer(undefined, webSocketConnectionClosedAction())
    ).toEqual(stateAfterClosing);
  });

  it("should handle websocket get orders", () => {
    const successfullRespone = {
      success: true,
      orders: [
        {
          ingredients: [
            "60d3463f7034a000269f45e7",
            "60d3463f7034a000269f45e9",
            "60d3463f7034a000269f45e8",
          ],
          _id: "",
          status: "done",
          number: 1001,
          createdAt: "2021-06-23T14:43:22.587Z",
          updatedAt: "2021-06-23T14:43:22.603Z",
          name: "Space флюоресцентный бургер",
        },
        {
          ingredients: [
            "60d3463f7034a000269f45e9",
            "60d3463f7034a000269f45e8",
            "60d3463f7034a000269f45ea",
          ],
          _id: "",
          status: "done",
          number: 2001,
          createdAt: "2021-07-24T14:43:22.587Z",
          updatedAt: "2021-07-24T14:43:22.603Z",
          name: "Space флюоресцентный бургер",
        },
      ],
      total: 99,
      totalToday: 13,
    };
    const stateWithOrders = {
      ...initialState,
      orders: [
        {
          ingredients: [
            "60d3463f7034a000269f45e7",
            "60d3463f7034a000269f45e9",
            "60d3463f7034a000269f45e8",
          ],
          _id: "",
          status: "done",
          number: 1001,
          createdAt: "2021-06-23T14:43:22.587Z",
          updatedAt: "2021-06-23T14:43:22.603Z",
          name: "Space флюоресцентный бургер",
        },
        {
          ingredients: [
            "60d3463f7034a000269f45e9",
            "60d3463f7034a000269f45e8",
            "60d3463f7034a000269f45ea",
          ],
          _id: "",
          status: "done",
          number: 2001,
          createdAt: "2021-07-24T14:43:22.587Z",
          updatedAt: "2021-07-24T14:43:22.603Z",
          name: "Space флюоресцентный бургер",
        },
      ],
      ordersTodayQuantity: 13,
      ordersTotalQuantity: 99,
    };
    expect(
      websocketReducer(undefined, webSocketGetOrdersAction(successfullRespone))
    ).toEqual(stateWithOrders);
  });
});
