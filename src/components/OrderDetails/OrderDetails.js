import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import OrderDetailsStyles from "./OrderDetailsStyles.module.css";

export const OrderDetails = () => {
  return (
    <>
      <span className="text text_type_digits-large">034536</span>
      <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
      <span className={`${OrderDetailsStyles.modal__approved} mt-15`}>
        <CheckMarkIcon type="primary" />
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
