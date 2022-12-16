import { useDrag } from "react-dnd";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ingredientPropTypes } from "../../../utils/types";

import IngredientCardStyles from "./IngredientCardStyles.module.css";

export const IngredientCard = ({ ingredient, onIngridientCardClick }) => {
  const { image, name, price, quantityInOrder } = ingredient;
  const [, dragRef] = useDrag({
    type: "ingridientToDrag",
    item: ingredient,
  });

  return (
    <>
      <li
        className={IngredientCardStyles.card}
        onClick={onIngridientCardClick}
        ref={dragRef}
      >
        {quantityInOrder > 0 && (
          <Counter count={quantityInOrder} size="default" extraClass="m-1" />
        )}
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
      </li>
    </>
  );
};

IngredientCard.propTypes = {
  ingredient: ingredientPropTypes.isRequired,
  onIngridientCardClick: PropTypes.func.isRequired,
};
