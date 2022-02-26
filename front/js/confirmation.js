import { getParams } from "./utils.js";
import { deleteCart, getCart } from "./services/cartService.js";
import { postOrder } from "./services/productsService.js";

const orderIdElement = document.getElementById("orderId"); //orderId element
const awaitedUrlParams = ["firstName", "lastName", "address", "city", "email"];
const params = getParams(); // url params

// Call the async function Init() on load
(async () => {
  await init();
})();
/**
 * Call functions to try to order if contact from UrlsParams and products from cart are valid then display orderId
 */
async function init() {
  if (awaitedUrlParamsExist() == true) {
    console.log("AwaitedUrlParams exists");
    const contact = getContact();
    const products = getProducts();
    console.log("Potential order params : ", contact, products);
    if (isOrderValid(contact, products)) {
      console.log("Order is valid");
      console.log("Trying to post order...");
      const response = await postOrder(contact, products);
      console.log("postOrder returned : ", response);
      orderIdElement.textContent = response.orderId;
      deleteCart();
    }
  }
}

/**
 * Check if url contain awaited contact parameters to process order
 * * return false if at least one of these parameters doesn't exist in UrlParams
 * @returns { boolean }
 */
function awaitedUrlParamsExist() {
  let theyAllExist = true;
  awaitedUrlParams.forEach((value) => {
    if (!params[value]) {
      theyAllExist = false;
    }
  });
  return theyAllExist;
}

/**
 * Create and return contact object for order request based on the value of each url param named like each awaitedUrlParams
 * @returns {Object}
 */
function getContact() {
  let contact = {};
  awaitedUrlParams.forEach((value) => {
    if (params[value]) {
      contact[value] = params[value];
    }
  });
  return contact;
}

/**
 * Create and return products array for order request based on cart saved in localStorage;
 * @return { Object }
 */
function getProducts() {
  const cart = getCart();
  let products = [];
  cart.forEach((product) => {
    for (let i = 0; i < product.quantity; i++) {
      products.push(product.product._id);
    }
  });
  return products;
}
/**
 * Return true if order is valid
 * @param { Object } _order
 * @param { Array } _products
 * @returns { Boolean }
 */
function isOrderValid(_contact, _products) {
  let isValid = false;
  if (_products[0]) {
    isValid = true;
  }
  return isValid;
}
