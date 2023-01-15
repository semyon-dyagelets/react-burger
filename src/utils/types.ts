export interface IngredientProps {
  _id: string,
  name: string,
  type: IngredientType,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string,
  image_mobile?: string,
  image_large?: string,
  quantityInOrder?: number,
  __v: number,
}

export enum IngredientType {
  BUN = "bun", 
  MAIN = "main",
  SAUCE = "sauce",
}