import { TOrderRequest } from "../services/types/data";
import { BASE_URL } from "./constants";

import { getCookie, setCookie, checkResponse } from "./helpers";

function request(url: string, options: RequestInit) {
  return fetch(url, options).then(checkResponse);
}

export const getIngredients = async () =>
  await request(`${BASE_URL}/ingredients`, {
    method: "GET",
  });

export const getOrderByNumber = async (oderNumber: number) =>
  await request(`${BASE_URL}/orders/${oderNumber}`, {
    method: "GET",
  });

export const sendOrder = async (orderData: TOrderRequest) =>
  await request(`${BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getCookie("accessToken")}`,
    },
    body: JSON.stringify(orderData),
  });

export const restorePassword = async (userEmail: string) =>
  await request(`${BASE_URL}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: userEmail }),
  });

export const saveNewPassword = async (newPassword: string, userToken: string) =>
  request(`${BASE_URL}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password: newPassword, token: userToken }),
  });

export const signUp = async (email: string, password: string, name: string) =>
  request(`${BASE_URL}/auth/register`, {
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

export const signIn = async (userEmail: string, userPassword: string) =>
  request(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: userEmail,
      password: userPassword,
    }),
  });

export const signOut = async () =>
  await request(`${BASE_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: getCookie("refreshToken"),
    }),
  });

export const getNewToken = async () =>
  await request(`${BASE_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: getCookie("refreshToken"),
    }),
  });

export const fetchWithRefresh = async (url: string, options: RequestInit) => {
  try {
    const res = await request(url, options);
    return res;
  } catch (err: any) {
    if (err.message === "jwt expired" || "Token is invalid") {
      const refreshData = await getNewToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      const { accessToken, refreshToken } = refreshData;
      const extractedAccessToken = accessToken.split("Bearer ")[1];
      setCookie("accessToken", extractedAccessToken);
      setCookie("refreshToken", refreshToken);
      // @ts-ignore
      options.headers.authorization = refreshData.accessToken;
      const res = await request(url, options);
      return res;
    } else {
      return Promise.reject(err);
    }
  }
};

export const fetchUserData = () =>
  fetchWithRefresh(`${BASE_URL}/auth/user`, {
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
  return fetchWithRefresh(`${BASE_URL}/auth/user`, {
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
