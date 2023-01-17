import { getIngredients } from "../../utils/api";

export const FETCH_INGREDIENTS_REQUEST = "FETCH_INGREDIENTS_REQUEST";
export const FETCH_INGREDIENTS_SUCCESS = "FETCH_INGREDIENTS_SUCCESS";
export const FETCH_INGREDIENTS_ERROR = "FETCH_INGREDIENTS_ERROR";

export const INCREASE_INGREDIENT_COUNT = "INCREASE_INGREDIENT_COUNT";
export const DECREASE_INGREDIENT_COUNT = "DECREASE_INGREDIENT_COUNT";

export const fetchIngredients = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_INGREDIENTS_REQUEST });
    getIngredients().then((response) => {
      if (response.data) {
        const ingredientsWithQuantity = response.data.map((ingredient) => ({
          ...ingredient,
          quantityInOrder: 0,
        }));
        dispatch({
          type: FETCH_INGREDIENTS_SUCCESS,
          payload: ingredientsWithQuantity,
        });
      } else {
        dispatch({ type: FETCH_INGREDIENTS_ERROR });
      }
    });
  };
};
