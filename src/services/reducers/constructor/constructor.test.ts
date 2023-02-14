import {
  addBunToConstructorAction,
  addMainToConstructorAction,
  deleteBunFromConstructorAction,
  deleteMainFromConstructorAction,
  setNewOrderOfMainsInConstructorAction,
} from "../../actions/constructor";
import { IngredientType } from "../../types/data";
import { constructorReducer, initialState } from "./constructor";

describe("Constructor reducer", () => {
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
  };

  const twoMainIngredients = [firstMainIngredient, secondMainIngredient];

  it("should return initial state", () => {
    // @ts-ignore
    expect(constructorReducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should handle adding bun to constructor", () => {
    const stateWithBun = {
      ...initialState,
      buns: [bunTestIngredient, bunTestIngredient],
    };
    expect(
      constructorReducer(
        undefined,
        addBunToConstructorAction(bunTestIngredient)
      )
    ).toEqual(stateWithBun);
  });

  it("should handle deleting bun from constructor", () => {
    const stateWithoutBun = {
      ...initialState,
      buns: [],
    };
    expect(
      constructorReducer(undefined, deleteBunFromConstructorAction())
    ).toEqual(stateWithoutBun);
  });

  it("should handle adding main to constructor", () => {
    const stateWithMain = {
      ...initialState,
      mains: [firstMainIngredient],
    };
    expect(
      constructorReducer(
        undefined,
        addMainToConstructorAction(firstMainIngredient)
      )
    ).toEqual(stateWithMain);
  });

  it("should handle deleting main from constructor", () => {
    const stateWithoutMain = {
      ...initialState,
      mains: [],
    };
    expect(
      constructorReducer(
        { ...initialState, mains: twoMainIngredients },
        deleteMainFromConstructorAction(firstMainIngredient)
      )
    ).toEqual(stateWithoutMain);
  });

  it("should handle setting new order of ingredients", () => {
    const updatedtState = {
      ...initialState,
      mains: [secondMainIngredient, firstMainIngredient],
    };
    expect(
      constructorReducer(
        { ...initialState, mains: twoMainIngredients },
        setNewOrderOfMainsInConstructorAction([
          secondMainIngredient,
          firstMainIngredient,
        ])
      )
    ).toEqual(updatedtState);
  });
});
