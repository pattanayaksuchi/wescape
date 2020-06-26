/* eslint-disable no-debugger */
import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/products/";

export function getProducts() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function saveProducts(product) {
  return fetch(baseUrl + (product.id || ""), {
    method: product.id ? "PUT" : "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(product),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteProduct(productId) {
  return fetch(baseUrl + productId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
