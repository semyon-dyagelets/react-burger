import { v4 as uuid } from "uuid";
import { IngredientProps } from "./types";

export const prepareIdsForOrder = (elements: IngredientProps[]) => {
  const elementsIds = elements.map((element) => element._id);
    elementsIds.push(elementsIds.shift() as string);
    const resultToSend = { ingredients: elementsIds };
    return resultToSend;
};

export const omitQuantityAddCustomId = (initialElement: IngredientProps) => {
  const { quantityInOrder, ...noQuantityElement } = initialElement;
  const elementWithCustomIdandNoQuantity = {
    ...noQuantityElement,
    customId: uuid(),
  };
  return elementWithCustomIdandNoQuantity;
};

export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(
  name: string,
  value: string | number | boolean,
  props?: any
) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function deleteCookie(name: string) {
  const date = new Date();
  date.setTime(date.getTime() + -1 * 24 * 60 * 60 * 1000);
  document.cookie = name + "=; expires=" + date.toUTCString() + "; path=/";
}
