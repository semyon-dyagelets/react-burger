import { TIngredientsActions } from "../actions/ingredients";
import {
  FETCH_INGREDIENTS_REQUEST,
  FETCH_INGREDIENTS_SUCCESS,
  FETCH_INGREDIENTS_ERROR,
  INCREASE_INGREDIENT_COUNT,
  DECREASE_INGREDIENT_COUNT,
} from "../constants/index";
import { TIngredientInApp } from "../types/data";

type TIngredientsState = {
  ingredients: ReadonlyArray<TIngredientInApp>;
  ingredientsLoading: boolean;
  ingredientsFailed: boolean;
};

const initialState: TIngredientsState = {
  ingredients: [],
  ingredientsLoading: false,
  ingredientsFailed: false,
};

export const ingredientsReducer = (
  state = initialState,
  action: TIngredientsActions
): TIngredientsState => {
  switch (action.type) {
    case INCREASE_INGREDIENT_COUNT: {
      const itemAddedBefore = state.ingredients.find(
        (ingredient) => ingredient._id === action.ingredientToAdd._id
      );
      if (itemAddedBefore) {
        return {
          ...state,
          ingredients: state.ingredients.map((ingredient) =>
            ingredient._id === action.ingredientToAdd._id
              ? {
                  ...ingredient,
                  quantityInOrder: ingredient.quantityInOrder! + 1,
                }
              : ingredient
          ),
        };
      }
      return {
        ...state,
        ingredients: [...state.ingredients, action.ingredientToAdd],
      };
    }
    case DECREASE_INGREDIENT_COUNT: {
      const itemAddedBefore = state.ingredients.find(
        (ingredient) => ingredient._id === action.ingredientToRemove._id
      );
      if (itemAddedBefore) {
        return {
          ...state,
          ingredients: state.ingredients.map((ingredient) =>
            ingredient._id === action.ingredientToRemove._id
              ? {
                  ...ingredient,
                  quantityInOrder: ingredient.quantityInOrder! - 1,
                }
              : ingredient
          ),
        };
      }
      return state;
    }
    case FETCH_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsLoading: true,
      };
    }
    case FETCH_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsLoading: false,
        ingredientsFailed: false,
        ingredients: action.ingredients,
      };
    }
    case FETCH_INGREDIENTS_ERROR: {
      return {
        ...state,
        ingredients: [],
        ingredientsLoading: false,
        ingredientsFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};
