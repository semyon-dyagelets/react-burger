import { ingredientPropTypes } from "../../../utils/types";
import IngredientDetailsStyles from "./IngredientDetailsStyles.module.css";

export const IngredientDetails = ({ selectedIngredient }) => {
  const {
    calories,
    carbohydrates,
    fat,
    image_large: imageLarge,
    name,
    proteins,
  } = selectedIngredient;

  return (
    <div className={IngredientDetailsStyles.modal__container}>
      <p
        className={`${IngredientDetailsStyles.modal__title} text text_type_main-large`}
      >
        Детали ингредиента
      </p>
      <img
        className={IngredientDetailsStyles.modal__image}
        src={imageLarge}
        alt={name}
      />
      <h3 className="text text_type_main-medium mt-4">{name}</h3>
      <ul className={`${IngredientDetailsStyles.modal__nutrients} mt-8`}>
        <li
          className={`${IngredientDetailsStyles.modal__nutrient} text text_type_main-default text_color_inactive`}
        >
          Калории,ккал
          <span className="text_type_digits-default">{calories}</span>
        </li>
        <li
          className={`${IngredientDetailsStyles.modal__nutrient} text text_type_main-default text_color_inactive`}
        >
          Белки, г<span className="text_type_digits-default">{proteins}</span>
        </li>
        <li
          className={`${IngredientDetailsStyles.modal__nutrient} text text_type_main-default text_color_inactive`}
        >
          Жиры, г<span className="text_type_digits-default">{fat}</span>
        </li>
        <li
          className={`${IngredientDetailsStyles.modal__nutrient} text text_type_main-default text_color_inactive`}
        >
          Углеводы, г
          <span className="text_type_digits-default">{carbohydrates}</span>
        </li>
      </ul>
    </div>
  );
};

IngredientDetails.propTypes = {
  selectedIngredient: ingredientPropTypes.isRequired,
};
