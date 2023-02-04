import { getIngredients } from "../../utils/api";
import {
  DECREASE_INGREDIENT_COUNT,
  FETCH_INGREDIENTS_ERROR,
  FETCH_INGREDIENTS_REQUEST,
  FETCH_INGREDIENTS_SUCCESS,
  INCREASE_INGREDIENT_COUNT,
} from "../constants";
import { AppDispatch } from "../types";
import { TIngredient, TIngredientInApp } from "../types/data";

export interface IFetchIngredientsRequestAction {
  readonly type: typeof FETCH_INGREDIENTS_REQUEST;
}

export interface IFetchIngredientsSuccessAction {
  readonly type: typeof FETCH_INGREDIENTS_SUCCESS;
  readonly ingredients: ReadonlyArray<TIngredientInApp>;
}

export interface IFetchIngredientsErrorAction {
  readonly type: typeof FETCH_INGREDIENTS_ERROR;
}

export interface IIncreaseIngredientAction {
  readonly type: typeof INCREASE_INGREDIENT_COUNT;
  readonly ingredientToAdd: TIngredientInApp;
}

export interface IDecreaseIngredientAction {
  readonly type: typeof DECREASE_INGREDIENT_COUNT;
  readonly ingredientToRemove: TIngredientInApp;
}

export type TIngredientsActions =
  | IFetchIngredientsRequestAction
  | IFetchIngredientsSuccessAction
  | IFetchIngredientsErrorAction
  | IIncreaseIngredientAction
  | IDecreaseIngredientAction;

export const fetchIngredientsRequestAction =
  (): IFetchIngredientsRequestAction => ({
    type: FETCH_INGREDIENTS_REQUEST,
  });

export const fetchIngredientsSuccessAction = (
  ingredients: ReadonlyArray<TIngredientInApp>
): IFetchIngredientsSuccessAction => ({
  type: FETCH_INGREDIENTS_SUCCESS,
  ingredients,
});

export const fetchIngredientsErrorAction =
  (): IFetchIngredientsErrorAction => ({
    type: FETCH_INGREDIENTS_ERROR,
  });

export const increaseIngredientAction = (
  ingredientToAdd: TIngredientInApp
): IIncreaseIngredientAction => ({
  type: INCREASE_INGREDIENT_COUNT,
  ingredientToAdd,
});

export const decreaseIngredientAction = (
  ingredientToRemove: TIngredientInApp
): IDecreaseIngredientAction => ({
  type: DECREASE_INGREDIENT_COUNT,
  ingredientToRemove,
});

export const fetchIngredients = () => (dispatch: AppDispatch) => {
  dispatch(fetchIngredientsRequestAction());
  getIngredients().then((response) => {
    if (response.data) {
      const ingredientsWithQuantity = response.data.map(
        (ingredient: TIngredient) => ({
          ...ingredient,
          quantityInOrder: 0,
        })
      );
      dispatch(fetchIngredientsSuccessAction(ingredientsWithQuantity));
    } else {
      dispatch(fetchIngredientsErrorAction());
    }
  });
};
