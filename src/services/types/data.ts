import {
  WEBSOCKET_CONNECTION_CLOSED,
  WEBSOCKET_CONNECTION_FAILED,
  WEBSOCKET_CONNECTION_REQUEST,
  WEBSOCKET_CONNECTION_SUCCESS,
  WEBSOCKET_GET_ORDERS,
} from "../constants";

export type TUser = {
  readonly password?: string;
  readonly email: string;
  readonly name: string;
};

export type TAccessToken = string;

export type TRefreshToken = string;

export type TIngredient = {
  _id: string;
  name: string;
  type: IngredientType;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

export enum IngredientType {
  BUN = "bun",
  MAIN = "main",
  SAUCE = "sauce",
}

export enum OrderStatus {
  DONE = "done",
  IN_PROGRESS = "created",
}

export type TIngredientInApp = TIngredient & {
  quantityInOrder?: number;
  customId?: string;
};

export type TOrderRequest = {
  ingredients: string[];
};

export type TWebSocketOrder = {
  ingredients: string[];
  _id: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
  name: string;
};

export type TWebSocketOrdersResponse = {
  orders: TWebSocketOrder[];
  total: number;
  totalToday: number;
};

export type TWebSocketActions = {
  wsInit: string;
  onOpen: string;
  onClose: string;
  onError: string;
  onMessage: string;
};

export const webSocketActions = {
  wsInit: WEBSOCKET_CONNECTION_REQUEST,
  onOpen: WEBSOCKET_CONNECTION_SUCCESS,
  onClose: WEBSOCKET_CONNECTION_CLOSED,
  onError: WEBSOCKET_CONNECTION_FAILED,
  onMessage: WEBSOCKET_GET_ORDERS,
};
