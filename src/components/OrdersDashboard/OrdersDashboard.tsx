import { useAppSelector } from "../../services/types";
import { OrderStatus } from "../../services/types/data";
import OrdersDashboardStyles from "./OrdersDashboardStyles.module.css";

const MAX_ORDERS_TO_SHOW = 20;

export const OrdersDashboard = () => {
  const { orders, ordersTotalQuantity, ordersTodayQuantity } = useAppSelector(
    (state) => state.websocketState
  );

  const lastOrdersDone = orders.slice(0,MAX_ORDERS_TO_SHOW).filter(
    (order) => order.status === OrderStatus.DONE
  );
  const lastOrdersInProgress = orders.slice(0, MAX_ORDERS_TO_SHOW).filter(
    (order) => order.status === OrderStatus.IN_PROGRESS
  );

  return (
    <div className={OrdersDashboardStyles.container}>
      <div className={OrdersDashboardStyles.status__container}>
        <div>
          <p className="text text_type_main-medium">Готовы:</p>
          <ul
            className={`${OrdersDashboardStyles.status__list} ${OrdersDashboardStyles.status__list_success} mt-6`}
          >
            {lastOrdersDone?.map((order) => (
              <li key={order.number} className="text text_type_digits-default">
                {order.number}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text text_type_main-medium">В работе:</p>
          <ul className={`${OrdersDashboardStyles.status__list} mt-6`}>
            {lastOrdersInProgress.map((order) => (
              <li key={order.number}
                className={`${OrdersDashboardStyles.status__number} text text_type_digits-default`}
              >
                {order.number}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="text text_type_main-medium mt-15">
        Выполнено за все время:
      </p>
      <span className={`${OrdersDashboardStyles.accent} text text_type_digits-large`}>{ordersTotalQuantity}</span>
      <p className="text text_type_main-medium mt-15">Выполнено за сегодня:</p>
      <span className={`${OrdersDashboardStyles.accent} text text_type_digits-large`}>{ordersTodayQuantity}</span>
    </div>
  );
};
