import {
  ADD_BUN_TO_CONSTRUCTOR,
  ADD_MAIN_TO_CONSTRUCTOR,
  DELETE_BUN_FROM_CONSTRUCTOR,
  DELETE_MAIN_FROM_CONSTRUCTOR,
  SET_NEW_ORDER_OF_MAINS,
} from "../actions/constructor";

const initialState = {
  buns: [],
  mains: [],
};

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUN_TO_CONSTRUCTOR: {
      return {
        ...state,
        buns: [...state.buns, action.payload, action.payload],
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
        mains: [...state.mains, action.payload],
      };
    }
    case DELETE_MAIN_FROM_CONSTRUCTOR: {
      return {
        ...state,
        mains: [...state.mains].filter(
          (element) => element.customId !== action.payload.customId
        ),
      };
    }
    case SET_NEW_ORDER_OF_MAINS: {
      return {
        ...state,
        mains: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
