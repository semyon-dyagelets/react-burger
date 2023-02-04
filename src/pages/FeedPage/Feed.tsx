import { OrderList } from "../../components/OrderList/OrderList";
import { OrdersDashboard } from "../../components/OrdersDashboard/OrdersDashboard";
import FeedPageStyles from "./FeedPageStyles.module.css";

export const FeedPage = () => {
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
