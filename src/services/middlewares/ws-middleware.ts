import { Middleware, MiddlewareAPI } from "redux";
import { TWebSocketActions } from "../types/data";

export const webSocketMiddleware = (
  wsActions: TWebSocketActions
): Middleware => {
  return ((store: MiddlewareAPI) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { wsInit, wsSendOrder, onOpen, onClose, onError, onMessage } =
        wsActions;
      const { type, payload } = action;

      if (type === wsInit) {
        socket = new WebSocket(payload);
      }

      if (type === wsInit && socket?.readyState === 1) {
        socket.close();
      }
      
      if (socket) {
        socket.onopen = (event) => {
          dispatch({
            type: onOpen,
            payload: event,
          });
        };
        socket.onerror = (event) => {
          dispatch({
            type: onError,
            payload: event,
          });
        };
        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...rest } = parsedData;
          dispatch({
            type: onMessage,
            payload: rest,
          });
        };
        socket.onclose = (event) => {
          dispatch({
            type: onClose,
            payload: event,
          });
        };

        if (type === wsSendOrder) {
          const message = payload;
          socket.send(JSON.stringify(message));
        }
      }
      next(action);
    };
  }) as Middleware;
};
