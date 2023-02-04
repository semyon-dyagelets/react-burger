
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { OrderContent } from "../../components/OrderContent/OrderContent";
import { getOrder } from "../../services/actions/order";
import { WEBSOCKET_CONNECTION_CLOSED, WEBSOCKET_CONNECTION_REQUEST } from "../../services/constants";
import { useAppDispatch } from "../../services/types";
import { WEBSOCKET_URL } from "../../utils/constants";
import { getCookie } from "../../utils/helpers";

export const OrderPage = () => {
  const location = useLocation();
  const { orderId } = useParams<{ orderId: string }>();
  const appDispatch = useAppDispatch();
  const dispatch = useDispatch();

  const webSocketUnauthorised = `${WEBSOCKET_URL}/all`;
  const webSocketAuthorised = `${WEBSOCKET_URL}?token=${getCookie(
    "accessToken"
  )}`;

  useEffect(() => {
    appDispatch(getOrder(Number(orderId)));
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
  }, [appDispatch, dispatch, location.pathname, orderId, webSocketAuthorised, webSocketUnauthorised]);

    return (
      <div className="mt-30">
        <OrderContent/>
      </div>
    );
  };
  