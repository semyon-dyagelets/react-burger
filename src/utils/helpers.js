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

export function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export const refreshTokenFromCookie = getCookie("refreshToken");

export const accessTokenFromCookie = getCookie("accessToken");

export function setCookie(name, value, props) {
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

export function deleteCookie(name) {
  setCookie(name, null, { expires: -1 });
}
