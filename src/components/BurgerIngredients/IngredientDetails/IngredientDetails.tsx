import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../services/types";
import { TIngredientInApp } from "../../../services/types/data";

import IngredientDetailsStyles from "./IngredientDetailsStyles.module.css";

export const IngredientDetails = () => {
  const [ingredientToShow, setIngredientToShow] = useState<TIngredientInApp>();
  const { ingredients } = useAppSelector((state) => state.ingredientsState);
  const { ingredientId } = useParams<{ ingredientId: string }>();

  useEffect(() => {
    let itemToShow = ingredients.find(({ _id }) => _id === ingredientId);
    setIngredientToShow(itemToShow);
  }, [ingredientId, ingredients]);

  return ingredientToShow ? (
    <div
      className={IngredientDetailsStyles.modal__container}
      data-test-id="ingredient-modal-container"
    >
      <p
        className={`${IngredientDetailsStyles.modal__title} text text_type_main-large`}
        data-test-id="ingredient-modal-title"
      >
        Детали ингредиента
      </p>
      <img
        className={IngredientDetailsStyles.modal__image}
        src={ingredientToShow.image_large}
        alt={ingredientToShow.name}
      />
      <h3 className="text text_type_main-medium mt-4">
        {ingredientToShow.name}
      </h3>
      <ul className={`${IngredientDetailsStyles.modal__nutrients} mt-8`}>
        <li
          className={`${IngredientDetailsStyles.modal__nutrient} text text_type_main-default text_color_inactive`}
          data-test-id="ingredient-modal-calories"
        >
          Калории,ккал
          <span className="text_type_digits-default">
            {ingredientToShow.calories}
          </span>
        </li>
        <li
          className={`${IngredientDetailsStyles.modal__nutrient} text text_type_main-default text_color_inactive`}
          data-test-id="ingredient-modal-proteins"
        >
          Белки, г
          <span className="text_type_digits-default">
            {ingredientToShow.proteins}
          </span>
        </li>
        <li
          className={`${IngredientDetailsStyles.modal__nutrient} text text_type_main-default text_color_inactive`}
          data-test-id="ingredient-modal-fat"
        >
          Жиры, г
          <span className="text_type_digits-default">
            {ingredientToShow.fat}
          </span>
        </li>
        <li
          className={`${IngredientDetailsStyles.modal__nutrient} text text_type_main-default text_color_inactive`}
          data-test-id="ingredient-modal-carbohydrates"
        >
          Углеводы, г
          <span className="text_type_digits-default">
            {ingredientToShow.carbohydrates}
          </span>
        </li>
      </ul>
    </div>
  ) : null;
};
