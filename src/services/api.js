import { AUTH_URL, BASE_URL } from "../utils/constants";

import { refreshTokenFromCookie } from "../utils/helpers";

export async function getIngredients() {
  const response = await fetch(`${BASE_URL}/ingredients`);
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  const { data } = await response.json();
  return data;
}

export async function fetchUserData(accessToken) {
  const response = await fetch(`${AUTH_URL}/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const result = await response.json();
  return result;
}

export async function updateUserData(
  accessToken,
  updatedName,
  updatedEmail,
  updatedPassword
) {
  const response = await fetch(`${AUTH_URL}/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      name: updatedName,
      email: updatedEmail,
      password: updatedPassword,
    }),
  });
  const result = await response.json();
  return result;
}

export async function sendOrder(orderData) {
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

export async function restorePassword(userEmail) {
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

export async function saveNewPassword(newPassword, userToken) {
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

export async function signUp(email, password, name) {
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

export async function signIn(userEmail, userPassword) {
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
      token: refreshTokenFromCookie,
    }),
  });
  const result = await response.json();
  return result;
}

export async function getNewToken() {
  const response = await fetch(`${AUTH_URL}/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: refreshTokenFromCookie,
    }),
  });
  const result = await response.json();
  return result;
}
