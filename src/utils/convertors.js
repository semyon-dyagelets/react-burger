import { v4 as uuid } from "uuid";

export const prepareIdsForOrder = (elements) => {
  const elementsIds = elements.map((element) => element._id);
  elementsIds.push(elementsIds.shift());
  const resultToSend = { ingredients: elementsIds };
  return resultToSend;
};

export const omitQuantityAddCustomId = (initialElement) => {
  const { quantityInOrder, ...noQuantityElement } = initialElement;
  const elementWithCustomIdandNoQuantity = {
    ...noQuantityElement,
    customId: uuid(),
  };
  return elementWithCustomIdandNoQuantity;
};
