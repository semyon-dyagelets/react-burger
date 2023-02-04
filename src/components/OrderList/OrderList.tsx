import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import {
  WEBSOCKET_CONNECTION_CLOSED,
  WEBSOCKET_CONNECTION_REQUEST,
} from "../../services/constants";

import { useAppSelector } from "../../services/types";
import { WEBSOCKET_URL } from "../../utils/constants";
import { getCookie } from "../../utils/helpers";
import { OrderCard } from "../OrderCard/OrderCard";

import OrderListStyles from "./OrderListStyles.module.css";

export const OrderList = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { url } = useRouteMatch();
  const { orders } = useAppSelector((store) => store.websocketState);
  const { userAuthorised } = useAppSelector((state) => state.userState);
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
  }, [dispatch, location.pathname, userAuthorised, webSocketAuthorised, webSocketUnauthorised]);

  return orders ? (
    <ul className={`${OrderListStyles.list} custom-scroll`}>
      {orders.map((order) => (
        <li key={order._id}>
          <Link
            to={{
              pathname: `${url}/${order._id}`,
              state: { background: location },
            }}
          >
            <OrderCard order={order} />
          </Link>
        </li>
      ))}
    </ul>
  ) : null;
};
