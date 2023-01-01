import { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { IngredientDetails } from "../../components/BurgerIngredients/IngredientDetails/IngredientDetails";
import { Modal } from "../../components/Modal/Modal";
import { getIngredients } from "../../services/api";

import IngredientPageStyles from "./IngredientPageStyles.module.css";

export const IngredientPage = () => {
  const [ingredientToShow, setIngredientToShow] = useState(null);
  const { ingredientId } = useParams();

  const history = useHistory();

  const handleCloseModal = (event) => {
    history.push("/");
  };

  const loadIngredientInfo = useCallback(() => {
    getIngredients().then((ingredients) => {
      setIngredientToShow(ingredients.find(({ _id }) => _id === ingredientId));
    });
  }, [ingredientId]);

  useEffect(() => {
    loadIngredientInfo();
  }, [ingredientId, loadIngredientInfo]);

  return ingredientToShow ? (
    <Modal
      onClose={handleCloseModal}
      className={`${IngredientPageStyles.modal__content_ingredient} pt-10 pr-10 pb-15 pl-10`}
      buttonCloseClassName={`${IngredientPageStyles.modal__close_ingridient}`}
    >
      <IngredientDetails selectedIngredient={ingredientToShow} />
    </Modal>
  ) : null;
};
