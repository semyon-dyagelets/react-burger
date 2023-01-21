import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { IngredientProps } from "../../../utils/types";

import IngredientDetailsStyles from "./IngredientDetailsStyles.module.css";

export const IngredientDetails = () => {
  const [ingredientToShow, setIngredientToShow] = useState<IngredientProps>();
  const ingredients: IngredientProps[] = useSelector((state: any) => state.ingredientsState.ingredients);
  const { ingredientId } = useParams<{ ingredientId: string }>();

  useEffect(() => {
    let itemToShow = ingredients.find(({ _id }) => _id === ingredientId);
    setIngredientToShow(itemToShow);
  }, [ingredientId, ingredients]);

  return ingredientToShow ? (
    <div className={IngredientDetailsStyles.modal__container}>
      <p
        className={`${IngredientDetailsStyles.modal__title} text text_type_main-large`}
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
        >
          Калории,ккал
          <span className="text_type_digits-default">
            {ingredientToShow.calories}
          </span>
        </li>
        <li
          className={`${IngredientDetailsStyles.modal__nutrient} text text_type_main-default text_color_inactive`}
        >
          Белки, г
          <span className="text_type_digits-default">
            {ingredientToShow.proteins}
          </span>
        </li>
        <li
          className={`${IngredientDetailsStyles.modal__nutrient} text text_type_main-default text_color_inactive`}
        >
          Жиры, г
          <span className="text_type_digits-default">
            {ingredientToShow.fat}
          </span>
        </li>
        <li
          className={`${IngredientDetailsStyles.modal__nutrient} text text_type_main-default text_color_inactive`}
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
