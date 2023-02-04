import { Link, useLocation, useRouteMatch } from "react-router-dom";

import { useAppSelector } from "../../services/types";

import { OrderCard } from "../OrderCard/OrderCard";

import OrderListStyles from "./OrderListStyles.module.css";

export const OrderList = () => {

  const location = useLocation()
  const { url } = useRouteMatch();
  const { orders } = useAppSelector((store) => store.websocketState);

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
