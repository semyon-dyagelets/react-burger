import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ColorRing } from "react-loader-spinner";
import { useAppSelector } from "../../services/types";

import OrderDetailsStyles from "./OrderDetailsStyles.module.css";

export const OrderDetails = () => {
  const { orderReceiptNumber, orderCreatingLoading } = useAppSelector(
    (state) => state.orderState
  );
  return (
    <>
      <span className="text text_type_digits-large">{orderReceiptNumber}</span>
      <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
      <span className={`${OrderDetailsStyles.modal__approved} mt-15`}>
        {orderCreatingLoading ? (
          <ColorRing
            visible={true}
            height="24"
            width="24"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#F2F2F3", "#F2F2F3", "#F2F2F3", "#F2F2F3", "#F2F2F3"]}
          />
        ) : (
          <CheckMarkIcon type="primary" />
        )}
      </span>
      <p className="text text_type_main-default mt-15">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive mt-2">
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
};
