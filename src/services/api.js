import { INGREDIENTS_URL, ORDERS_URL } from "../utils/constants";

export async function getIngredients() {
  const response = await fetch(INGREDIENTS_URL);
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  const { data } = await response.json();
  return data;
}

export async function sendOrder(orderData) {
  const response = await fetch(ORDERS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });
  const result = await response.json();
  return result;
}
