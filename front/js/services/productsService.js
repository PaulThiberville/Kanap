const baseUrl = "http://localhost:3000/api/products";

/**
 * handleError
 * @return { Response }
 */
var handleError = function (err) {
  console.warn(err);
  return new Response(
    JSON.stringify({
      code: 400,
      message: "Network Error",
    })
  );
};

/**
 * Return all the products from api/ as an array
 * @return { Array }
 */
async function getProducts() {
  let response = await fetch(`${baseUrl}/`).catch(handleError);
  if (response.ok) return response.json();
  else return Promise.reject(response);
}

/**
 * Return one product from  api/ as an object
 * @param { string } _id
 * @return { Object }
 */
async function getProduct(_id) {
  let response = await fetch(`${baseUrl}/${_id}`).catch(handleError);
  if (response.ok) return response.json();
  else return Promise.reject(response);
}

/**
 * Return id contained in the response for post on api/order
 * @param { Object } _contact
 * @param { Array } _products
 * @return { Object }
 */
async function postOrder(_contact, _products) {
  const order = { contact: _contact, products: _products };
  const request = {
    method: "POST",
    body: JSON.stringify(order),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  console.log("Order request : ", request);
  let response = await fetch(`${baseUrl}/order`, request);
  if (response.ok) {
    const jsonResponse = response.json();
    return jsonResponse;
  } else return Promise.reject(response);
}

export { getProducts, getProduct, postOrder };
