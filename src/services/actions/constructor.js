import { omitQuantityAddCustomId } from "../../utils/convertors";

export const ADD_BUN_TO_CONSTRUCTOR = "ADD_BUN_TO_CONSTRUCTOR";
export const DELETE_BUN_FROM_CONSTRUCTOR = "DELETE_BUN_FROM_CONSTRUCTOR";
export const ADD_MAIN_TO_CONSTRUCTOR = "ADD_MAIN_TO_CONSTRUCTOR";
export const DELETE_MAIN_FROM_CONSTRUCTOR = "DELETE_MAIN_FROM_CONSTRUCTOR";
export const SET_NEW_ORDER_OF_MAINS = "SET_NEW_ORDER_OF_MAINS";

export const addBunFromIngredientToConstructor = (ingredient) => {
  return (dispatch) => {
    dispatch({
      type: ADD_BUN_TO_CONSTRUCTOR,
      payload: omitQuantityAddCustomId(ingredient),
    });
  };
};

export const addMainFromIngredientsToConstructor = (ingredient) => {
  return (dispatch) => {
    dispatch({
      type: ADD_MAIN_TO_CONSTRUCTOR,
      payload: omitQuantityAddCustomId(ingredient),
    });
  };
};
