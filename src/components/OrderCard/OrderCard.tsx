import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppSelector } from "../../services/types";
import {
  OrderStatus,
  TIngredientInApp,
  TWebSocketOrder,
} from "../../services/types/data";

import OrderCardStyles from "./OrderCardStyles.module.css";

interface IOrderData {
  order: TWebSocketOrder;
}

const MAX_INGREDIENTS_TO_SHOW = 6;

export const OrderCard = ({ order }: IOrderData) => {
  const {
    number,
    name,
    createdAt,
    ingredients: idsOfIngredients,
    status,
  } = order;
  const { ingredients: ingredientsInMenu } = useAppSelector(
    (store) => store.ingredientsState
  );

  let orderTotalPrice = 0;
  let orderIngredients: TIngredientInApp[] = [];

  const validIngredientIds = idsOfIngredients.filter((id) => id !== null);
  let showMoreNumber = validIngredientIds.length - MAX_INGREDIENTS_TO_SHOW;

  if (idsOfIngredients.length) {
    orderTotalPrice = validIngredientIds.reduce((accum, id) => {
      //@ts-ignore
      const item: TIngredientInApp = ingredientsInMenu.find(
        (item) => item._id === id
      );
      return accum + item!.price;
    }, 0);

    orderIngredients = validIngredientIds.map(
      (id) => ingredientsInMenu.filter((ingredient) => ingredient._id === id)[0]
    );
  }

  return order ? (
    <div className={`${OrderCardStyles.container} p-6`}>
      <div className={OrderCardStyles.details}>
        <span className="text text_type_digits-default">#{number}</span>
        <span className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(createdAt)} />
        </span>
      </div>
      <h2 className="text text_type_main-medium mt-6">{name}</h2>
      <span
        className={`mt-2 text text_type_main-default ${
          status === OrderStatus.DONE && OrderCardStyles.success
        }`}
      >
        {status === OrderStatus.DONE
          ? "Выполнен"
          : status === OrderStatus.IN_PROGRESS
          ? "Готовится"
          : "Создан"}
      </span>
      <div className={`${OrderCardStyles.details} mt-6`}>
        <ul className={OrderCardStyles.ingredients__container}>
          {orderIngredients
            .slice(0, MAX_INGREDIENTS_TO_SHOW)
            .map((ingredient, index) => {
              if (index === MAX_INGREDIENTS_TO_SHOW - 1 && showMoreNumber > 0)
                return (
                  <li className={OrderCardStyles.ingredient} key={index}>
                    <img
                      className={OrderCardStyles.ingredient__image}
                      src={ingredient.image_mobile}
                      alt={ingredient.name}
                    ></img>
                    <span className={`${OrderCardStyles.ingredient__plus} text text_type_digits-default`}>
                      +{showMoreNumber}
                    </span>
                  </li>
                );
              return (
                <li className={OrderCardStyles.ingredient} key={index}>
                  <img
                    className={OrderCardStyles.ingredient__image}
                    src={ingredient.image_mobile}
                    alt={ingredient.name}
                  ></img>
                </li>
              );
            })}
        </ul>
        <div className={OrderCardStyles.price}>
          <span className="text text_type_digits-default">
            {orderTotalPrice}
          </span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  ) : null;
};
