import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { OrderContent } from "../../components/OrderContent/OrderContent";
import {
  WEBSOCKET_CONNECTION_CLOSED,
  WEBSOCKET_CONNECTION_REQUEST,
} from "../../services/constants";
import { WEBSOCKET_URL } from "../../utils/constants";
import { getCookie } from "../../utils/helpers";

export const OrderPage = () => {
  const location = useLocation();
  const { orderId } = useParams<{ orderId: string }>();
  const dispatch = useDispatch();

  const webSocketUnauthorised = `${WEBSOCKET_URL}/all`;
  const webSocketAuthorised = `${WEBSOCKET_URL}?token=${getCookie(
    "accessToken"
  )}`;

  useEffect(() => {
    dispatch({
      type: WEBSOCKET_CONNECTION_REQUEST,
      payload:
        location.pathname === "/feed"
          ? webSocketUnauthorised
          : webSocketAuthorised,
    });
    return () => {
      dispatch({ type: WEBSOCKET_CONNECTION_CLOSED });
    };
  }, [
    dispatch,
    location.pathname,
    orderId,
    webSocketAuthorised,
    webSocketUnauthorised,
  ]);

  return (
    <div className="mt-30">
      <OrderContent />
    </div>
  );
};
