import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { OrderList } from "../../components/OrderList/OrderList";
import { OrdersDashboard } from "../../components/OrdersDashboard/OrdersDashboard";
import { WEBSOCKET_CONNECTION_CLOSED, WEBSOCKET_CONNECTION_REQUEST } from "../../services/constants";
import { WEBSOCKET_URL } from "../../utils/constants";
import FeedPageStyles from "./FeedPageStyles.module.css";

export const FeedPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const webSocketUnauthorised = `${WEBSOCKET_URL}/all`;

  useEffect(() => {
    dispatch({
      type: WEBSOCKET_CONNECTION_REQUEST,
      payload: webSocketUnauthorised
    });
    return () => {
      dispatch({ type: WEBSOCKET_CONNECTION_CLOSED });
    };
  }, [dispatch, location.pathname, webSocketUnauthorised]);

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
