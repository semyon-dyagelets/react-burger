import { v4 as uuid } from "uuid";
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
      const { payload } = action;
      const { quantityInOrder, ...noQuantityElement } = payload;
      const elementWithCustomId = {
        ...noQuantityElement,
        customId: uuid(),
      };
      return {
        ...state,
        buns: [...state.buns, elementWithCustomId, elementWithCustomId],
      };
    }
    case DELETE_BUN_FROM_CONSTRUCTOR: {
      return {
        ...state,
        buns: [],
      };
    }
    case ADD_MAIN_TO_CONSTRUCTOR: {
      const { payload } = action;
      const { quantityInOrder, ...noQuantityElement } = payload;
      const elementWithCustomId = {
        ...noQuantityElement,
        customId: uuid(),
      };
      return {
        ...state,
        mains: [...state.mains, elementWithCustomId],
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
