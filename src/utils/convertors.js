export const prepareIdsForOrder = (elements) => {
  const elementsIds = elements.map((element) => element._id);
  const resultToSend = { ingredients: elementsIds };
  return resultToSend;
};
