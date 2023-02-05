import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../services/types";
import { OrderStatus, TIngredientInApp } from "../../services/types/data";

import OrderContentStyles from "./OrderContentStyles.module.css";

type TIngredientInAppWithCount = TIngredientInApp & { count: number };

export const OrderContent = () => {
  const { orders } = useAppSelector((store) => store.websocketState);
  const { ingredients: ingredientsInMenu } = useAppSelector(
    (store) => store.ingredientsState
  );
  const { orderId } = useParams<{ orderId: string }>();

  let orderIngredients: TIngredientInApp[] = [];
  let orderTotalPrice = 0;
  let ingredientsWithQuantity: TIngredientInAppWithCount[] = [];

  const order = orders.find(({ _id }) => _id === orderId);
  const validIngredientIds = order?.ingredients.filter((id) => id !== null);
  if (validIngredientIds) {
    orderTotalPrice = validIngredientIds.reduce((accum, id) => {
      const item = ingredientsInMenu.find((item) => item._id === id);
      return accum + item!.price;
    }, 0);
    orderIngredients = validIngredientIds.map(
      (id) => ingredientsInMenu.filter((ingredient) => ingredient._id === id)[0]
    );

    let orderIngriedientsWithQuantity = new Map(
      orderIngredients.map((ingriedient) => [
        ingriedient._id,
        { ...ingriedient, count: 0 },
      ])
    );
    for (const { _id } of orderIngredients)
        // @ts-ignore
      orderIngriedientsWithQuantity.get(_id).count++;
      ingredientsWithQuantity = Array.from(orderIngriedientsWithQuantity.values());
  }

  return order ? (
    <>
      <span
        className={`${OrderContentStyles.number} text text_type_digits-default`}
      >
        #{order.number}
      </span>
      <h2 className="mt-10 text text_type_main-medium">{order.name}</h2>
      <span
        className={`mt-3 text text_type_main-default ${
          order.status === OrderStatus.DONE && OrderContentStyles.success
        }`}
      >
        {order.status === OrderStatus.DONE
          ? "Выполнен"
          : order.status === OrderStatus.IN_PROGRESS
          ? "Готовится"
          : "Создан"}
      </span>
      <p className="mt-15 text text_type_main-medium">Состав:</p>
      <ul className={`${OrderContentStyles.ingredients} mt-6 custom-scroll`}>
        {ingredientsWithQuantity?.map((ingredient, index) => (
          <li
            key={index}
            className={`${OrderContentStyles.ingredient} text text_type_digits-default`}
          >
            <img
              src={ingredient.image_mobile}
              alt={ingredient.name}
              className={OrderContentStyles.image}
            />
            <p
              className={`${OrderContentStyles.title} text text_type_main-default`}
            >
              {ingredient.name}
            </p>
            <span className="text text_type_digits-default">
              {`${ingredient.count} × ${ingredient.price}`}
            </span>
          </li>
        ))}
      </ul>
      <div className={`${OrderContentStyles.info} mt-10`}>
        <span className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(order.createdAt)} />
        </span>
        <div className={OrderContentStyles.info}>
          <span className="text text_type_digits-default">
            {orderTotalPrice}
          </span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </>
  ) : null;
};
