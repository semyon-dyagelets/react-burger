import {
  FETCH_INGREDIENTS_REQUEST,
  FETCH_INGREDIENTS_SUCCESS,
  FETCH_INGREDIENTS_ERROR,
  INCREASE_INGREDIENT_COUNT,
  DECREASE_INGREDIENT_COUNT,
} from "../actions/ingredients";

const initialState = {
  ingredients: [],
  ingredientsLoading: false,
  ingredientsFailed: false,
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREASE_INGREDIENT_COUNT: {
      const { payload } = action;
      const itemAddedBefore = state.ingredients.find(
        (ingredient) => ingredient._id === payload._id
      );
      if (itemAddedBefore) {
        return {
          ...state,
          ingredients: state.ingredients.map((ingredient) =>
            ingredient._id === payload._id
              ? {
                  ...ingredient,
                  quantityInOrder: ingredient.quantityInOrder + 1,
                }
              : ingredient
          ),
        };
      }
      return {
        ...state,
        ingredients: [...state.ingredients, payload],
      };
    }
    case DECREASE_INGREDIENT_COUNT: {
      const { payload } = action;
      const itemAddedBefore = state.ingredients.find(
        (ingredient) => ingredient._id === payload._id
      );
      if (itemAddedBefore) {
        return {
          ...state,
          ingredients: state.ingredients.map((ingredient) =>
            ingredient._id === payload._id
              ? {
                  ...ingredient,
                  quantityInOrder: ingredient.quantityInOrder - 1,
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
        ingredients: action.payload,
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
