import { TConstructorActions } from "../actions/constructor";
import {
  ADD_BUN_TO_CONSTRUCTOR,
  ADD_MAIN_TO_CONSTRUCTOR,
  DELETE_BUN_FROM_CONSTRUCTOR,
  DELETE_MAIN_FROM_CONSTRUCTOR,
  SET_NEW_ORDER_OF_MAINS,
} from "../constants/index";
import { TIngredientInApp } from "../types/data";

type TConstructorState = {
  buns: TIngredientInApp[];
  mains: TIngredientInApp[];
};

const initialState: TConstructorState = {
  buns: [],
  mains: [],
};

export const constructorReducer = (
  state = initialState,
  action: TConstructorActions
): TConstructorState => {
  switch (action.type) {
    case ADD_BUN_TO_CONSTRUCTOR: {
      return {
        ...state,
        buns: [...state.buns, action.bunToAdd, action.bunToAdd],
      };
    }
    case DELETE_BUN_FROM_CONSTRUCTOR: {
      return {
        ...state,
        buns: [],
      };
    }
    case ADD_MAIN_TO_CONSTRUCTOR: {
      return {
        ...state,
        mains: [...state.mains, action.mainToAdd],
      };
    }
    case DELETE_MAIN_FROM_CONSTRUCTOR: {
      return {
        ...state,
        mains: [...state.mains].filter(
          (element) => element.customId !== action.mainToDelete.customId
        ),
      };
    }
    case SET_NEW_ORDER_OF_MAINS: {
      return {
        ...state,
        mains: Object.assign([], action.setOfMains),
      };
    }
    default: {
      return state;
    }
  }
};
