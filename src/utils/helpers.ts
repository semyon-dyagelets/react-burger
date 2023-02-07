import { v4 as uuid } from "uuid";
import { TIngredientInApp } from "../services/types/data";

export const checkResponse = (response: Response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка ${response.status}`);
};

export const prepareIdsForOrder = (elements: TIngredientInApp[]) => {
  const elementsIds = elements.map((element) => element._id);
  elementsIds.push(elementsIds.shift() as string);
  const resultToSend = { ingredients: elementsIds };
  return resultToSend;
};

export const omitQuantityAddCustomId = (initialElement: TIngredientInApp) => {
  const { quantityInOrder, ...noQuantityElement } = initialElement;
  const elementWithCustomIdandNoQuantity = {
    ...noQuantityElement,
    customId: uuid(),
  };
  return elementWithCustomIdandNoQuantity;
};

export function getCookie(name: string): string | undefined {
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
  props?: { [key: string]: any } & { expires?: number | Date | string }
) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && (exp as Date).toUTCString) {
    props.expires = (exp as Date).toUTCString();
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
