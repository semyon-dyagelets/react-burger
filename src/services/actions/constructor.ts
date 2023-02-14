import {
  ADD_BUN_TO_CONSTRUCTOR,
  ADD_MAIN_TO_CONSTRUCTOR,
  DELETE_BUN_FROM_CONSTRUCTOR,
  DELETE_MAIN_FROM_CONSTRUCTOR,
  SET_NEW_ORDER_OF_MAINS,
} from "../constants";
import { TIngredientInApp } from "../types/data";

export interface IAddBunToConstructorAction {
  readonly type: typeof ADD_BUN_TO_CONSTRUCTOR;
  readonly bunToAdd: TIngredientInApp;
}
export interface IDeleteBunFromConstructorAction {
  readonly type: typeof DELETE_BUN_FROM_CONSTRUCTOR;
}
export interface IAddMainToConstructorAction {
  readonly type: typeof ADD_MAIN_TO_CONSTRUCTOR;
  readonly mainToAdd: TIngredientInApp;
}
export interface IDeleteMainFromConstructorAction {
  readonly type: typeof DELETE_MAIN_FROM_CONSTRUCTOR;
  readonly mainToDelete: TIngredientInApp;
}

export interface ISetNewOrderOfMainsInConstructorAction {
  readonly type: typeof SET_NEW_ORDER_OF_MAINS;
  readonly setOfMains: ReadonlyArray<TIngredientInApp>;
}

export type TConstructorActions =
  | IAddBunToConstructorAction
  | IDeleteBunFromConstructorAction
  | IAddMainToConstructorAction
  | IDeleteMainFromConstructorAction
  | ISetNewOrderOfMainsInConstructorAction;

export const addBunToConstructorAction = (
  bunToAdd: TIngredientInApp
): IAddBunToConstructorAction => ({
  type: ADD_BUN_TO_CONSTRUCTOR,
  bunToAdd,
});

export const deleteBunFromConstructorAction =
  (): IDeleteBunFromConstructorAction => ({
    type: DELETE_BUN_FROM_CONSTRUCTOR,
  });

export const addMainToConstructorAction = (
  mainToAdd: TIngredientInApp
): IAddMainToConstructorAction => ({
  type: ADD_MAIN_TO_CONSTRUCTOR,
  mainToAdd,
});

export const deleteMainFromConstructorAction = (
  mainToDelete: TIngredientInApp
): IDeleteMainFromConstructorAction => ({
  type: DELETE_MAIN_FROM_CONSTRUCTOR,
  mainToDelete,
});

export const setNewOrderOfMainsInConstructorAction = (
  setOfMains: ReadonlyArray<TIngredientInApp>
): ISetNewOrderOfMainsInConstructorAction => ({
  type: SET_NEW_ORDER_OF_MAINS,
  setOfMains,
});
