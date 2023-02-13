import { useDrag } from "react-dnd";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import IngredientCardStyles from "./IngredientCardStyles.module.css";
import { TIngredientInApp } from "../../../services/types/data";

interface IngredientCardProps {
  ingredient: TIngredientInApp;
}

export const IngredientCard = ({ ingredient }: IngredientCardProps) => {
  const { image, name, price, quantityInOrder } = ingredient;
  const [, dragRef] = useDrag({
    type: "ingredientToDrag",
    item: ingredient,
  });

  return (
    <div
      className={IngredientCardStyles.card}
      ref={dragRef}
    >
      {quantityInOrder ? (
        <Counter count={quantityInOrder} size="default" extraClass="m-1" />
      ) : null}
      <img src={image} alt={name} />
      <div className={`${IngredientCardStyles.card__price} mt-1`}>
        <span className="text text_type_digits-default mr-1">{price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <p
        className={`${IngredientCardStyles.card__description} text text_type_main-default mt-1`}
      >
        {name}
      </p>
    </div>
  );
};
