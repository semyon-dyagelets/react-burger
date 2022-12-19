import {
  OPEN_INGREDIENT_DETAILS,
  CLOSE_INGREDIENT_DETAILS,
} from "../actions/details";

const initialState = {
  selectedIngridient: null,
};

export const detailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_INGREDIENT_DETAILS: {
      return {
        ...state,
        selectedIngridient: action.payload,
      };
    }
    case CLOSE_INGREDIENT_DETAILS: {
      return {
        ...state,
        selectedIngridient: null,
      };
    }
    default: {
      return state;
    }
  }
};
