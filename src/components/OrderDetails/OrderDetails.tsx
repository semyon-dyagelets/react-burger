import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppSelector } from "../../services/types";
import { Loader } from "../Loader/Loader";

import OrderDetailsStyles from "./OrderDetailsStyles.module.css";

export const OrderDetails = () => {
  const { orderReceiptNumber, orderCreatingLoading } = useAppSelector(
    (state) => state.orderState
  );
  return (
    <>
      <span
        className="text text_type_digits-large"
        data-test-id="modal-order-number"
      >
        {orderReceiptNumber}
      </span>
      <p
        className="text text_type_main-medium mt-8"
        data-test-id="modal-order-title"
      >
        идентификатор заказа
      </p>
      <span className={`${OrderDetailsStyles.modal__approved} mt-15`}>
        {orderCreatingLoading ? <Loader /> : <CheckMarkIcon type="primary" />}
      </span>
      <p className="text text_type_main-default mt-15">
        {orderCreatingLoading
          ? "Отправляем данные о заказе"
          : "Ваш заказ начали готовить"}
      </p>
      <p className="text text_type_main-default text_color_inactive mt-2">
        {orderCreatingLoading
          ? ""
          : "Дождитесь готовности на орбитальной станции"}
      </p>
    </>
  );
};
