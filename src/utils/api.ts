import { AUTH_URL, BASE_URL } from "./constants";

import { getCookie, setCookie } from "./helpers";

export async function getIngredients() {
  const response = await fetch(`${BASE_URL}/ingredients`);
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  const { data } = await response.json();
  return data;
}

export async function sendOrder(orderData: string[]) {
  const response = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });
  const result = await response.json();
  return result;
}

export async function restorePassword(userEmail: string) {
  const response = await fetch(`${BASE_URL}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: userEmail }),
  });
  const result = await response.json();
  return result;
}

export async function saveNewPassword(newPassword: string, userToken: string) {
  const response = await fetch(`${BASE_URL}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password: newPassword, token: userToken }),
  });
  const result = await response.json();
  return result;
}

export async function signUp(email: string, password: string, name: string) {
  const response = await fetch(`${AUTH_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),
  });
  const result = await response.json();
  return result;
}

export async function signIn(userEmail: string, userPassword: string) {
  const response = await fetch(`${AUTH_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: userEmail,
      password: userPassword,
    }),
  });
  const result = await response.json();
  return result;
}

export async function signOut() {
  const response = await fetch(`${AUTH_URL}/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: getCookie("refreshToken"),
    }),
  });
  const result = await response.json();
  return result;
}

export async function getNewToken() {
  console.log();
  const response = await fetch(`${AUTH_URL}/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: getCookie("refreshToken"),
    }),
  });
  const result = await response.json();
  return result;
}

export const fetchWithRefresh = async (url: string, options: RequestInit) => {
  const response = await fetch(url, options);
  if (response) {
    const result = await response.json();
    if (
      !result.success &&
      (result.message === "jwt expired" || "Token is invalid")
    ) {
      const refreshData = await getNewToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      const { accessToken, refreshToken } = refreshData;
      const extractedAccessToken = accessToken.split("Bearer ")[1];
      setCookie("accessToken", extractedAccessToken);
      setCookie("refreshToken", refreshToken);
      // @ts-ignore
      options.headers.authorization = accessToken;
      const response = await fetch(url, options);
      const result = await response.json();
      return result;
    }
    return result;
  } else {
    return Promise.reject();
  }
};

export const fetchUserData = () =>
  fetchWithRefresh(`${AUTH_URL}/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });

export const updateUserData = (
  updatedName: string,
  updatedEmail: string,
  updatedPassword: string
) => {
  fetchWithRefresh(`${AUTH_URL}/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getCookie("accessToken")}`,
    },
    body: JSON.stringify({
      name: updatedName,
      email: updatedEmail,
      password: updatedPassword,
    }),
  });
};
