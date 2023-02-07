import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { OrderList } from "../../components/OrderList/OrderList";
import { OrdersDashboard } from "../../components/OrdersDashboard/OrdersDashboard";
import { webSocketConnectionClosedAction } from "../../services/actions/websocket";
import { WEBSOCKET_CONNECTION_REQUEST } from "../../services/constants";
import { useAppDispatch } from "../../services/types";
import { WEBSOCKET_URL } from "../../utils/constants";

import FeedPageStyles from "./FeedPageStyles.module.css";

export const FeedPage = () => {
  const location = useLocation();
  const appDispatch = useAppDispatch();
  const webSocketUnauthorised = `${WEBSOCKET_URL}/all`;

  useEffect(() => {
    appDispatch({
      type: WEBSOCKET_CONNECTION_REQUEST,
      payload: webSocketUnauthorised,
    });
    return () => {
      appDispatch(webSocketConnectionClosedAction());
    };
  }, [appDispatch, location.pathname, webSocketUnauthorised]);

  return (
    <section>
      <h1 className="text text_type_main-large mt-10">Лента заказов</h1>
      <div className={`${FeedPageStyles.container} mt-5`}>
        <OrderList />
        <OrdersDashboard />
      </div>
    </section>
  );
};
