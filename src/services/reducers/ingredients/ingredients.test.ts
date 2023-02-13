import {
  fetchIngredientsRequestAction,
  fetchIngredientsSuccessAction,
  fetchIngredientsErrorAction,
  increaseIngredientAction,
  decreaseIngredientAction,
} from "../../actions/ingredients";
import { IngredientType } from "../../types/data";
import { ingredientsReducer, initialState } from "./ingredients";

describe("Ingredients reducer", () => {
  const bunTestIngredient = {
    _id: "123456",
    name: "Краторная булка N-200i",
    type: IngredientType.BUN,
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02.png",
    __v: 1,
    quantityInOrder: 0,
  };

  const firstMainIngredient = {
    _id: "654321",
    name: "Филе Люминесцентного тетраодонтимформа",
    type: IngredientType.MAIN,
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: "https://code.s3.yandex.net/react/code/meat-03.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-03.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-03.png",
    __v: 1,
    quantityInOrder: 1,
  };

  const secondMainIngredient = {
    _id: "13579",
    name: "Мясо бессмертных моллюсков Protostomia",
    type: IngredientType.MAIN,
    proteins: 433,
    fat: 244,
    carbohydrates: 33,
    calories: 420,
    price: 1337,
    image: "https://code.s3.yandex.net/react/code/meat-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-02.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-02.png",
    __v: 1,
    quantityInOrder: 0,
  };

  it("should return initial state", () => {
    // @ts-ignore
    expect(ingredientsReducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should handle ingredients fetching request", () => {
    const stateAtRequest = {
      ...initialState,
      ingredientsLoading: true,
    };
    expect(
      ingredientsReducer(undefined, fetchIngredientsRequestAction())
    ).toEqual(stateAtRequest);
  });

  it("should handle ingredients fetching success", () => {
    const sucessfullIngredientsResponse = {
      success: true,
      data: [bunTestIngredient, firstMainIngredient, secondMainIngredient],
    };
    const stateAfterSuccess = {
      ...initialState,
      ingredients: [
        bunTestIngredient,
        firstMainIngredient,
        secondMainIngredient,
      ],
    };
    expect(
      ingredientsReducer(
        undefined,
        fetchIngredientsSuccessAction(sucessfullIngredientsResponse.data)
      )
    ).toEqual(stateAfterSuccess);
  });

  it("should handle ingredients fetching failed", () => {
    const stateAfterFailure = {
      ...initialState,
      ingredientsLoading: false,
      ingredientsFailed: true,
    };
    expect(
      ingredientsReducer(undefined, fetchIngredientsErrorAction())
    ).toEqual(stateAfterFailure);
  });

  it("should handle increasing ingredient count", () => {
    const stateWithOneIngredientInOrder = {
      ...initialState,
      ingredients: [
        bunTestIngredient,
        firstMainIngredient,
        secondMainIngredient,
      ],
    };

    const stateWithTwoIngredientsInOrder = {
      ...initialState,
      ingredients: [
        bunTestIngredient,
        { ...firstMainIngredient, quantityInOrder: 2 },
        secondMainIngredient,
      ],
    };

    expect(
      ingredientsReducer(
        stateWithOneIngredientInOrder,
        increaseIngredientAction(firstMainIngredient)
      )
    ).toEqual(stateWithTwoIngredientsInOrder);
  });

  it("should handle decreasing ingredient count", () => {
    const stateWithoutIngredientsInOrder = {
      ...initialState,
      ingredients: [
        bunTestIngredient,
        {...firstMainIngredient, quantityInOrder: 0 },
        secondMainIngredient,
      ],
    };

    const stateWithOneIngredientInOrder = {
      ...initialState,
      ingredients: [
        bunTestIngredient,
        firstMainIngredient,
        secondMainIngredient,
      ],
    };

    expect(
      ingredientsReducer(
        stateWithOneIngredientInOrder,
        decreaseIngredientAction(firstMainIngredient)
      )
    ).toEqual(stateWithoutIngredientsInOrder);
  });

});


