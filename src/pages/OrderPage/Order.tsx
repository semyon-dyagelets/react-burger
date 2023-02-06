import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { OrderContent } from "../../components/OrderContent/OrderContent";
import { webSocketConnectionClosedAction } from "../../services/actions/websocket";
import { WEBSOCKET_CONNECTION_REQUEST } from "../../services/constants";
import { useAppDispatch } from "../../services/types";
import { WEBSOCKET_URL } from "../../utils/constants";
import { getCookie } from "../../utils/helpers";

import OrderStyles from "./OrderStyles.module.css";

export const OrderPage = () => {
  const location = useLocation();
  const { orderId } = useParams<{ orderId: string }>();
  const dispatch = useAppDispatch();

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
      dispatch(webSocketConnectionClosedAction());
    };
  }, [
    dispatch,
    location.pathname,
    orderId,
    webSocketAuthorised,
    webSocketUnauthorised,
  ]);

  return (
    <div className={`${OrderStyles.container} mt-30`}>
      <OrderContent />
    </div>
  );
};
