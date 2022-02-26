import { renderCart, renderTotal } from "./renders/cartRender.js";
import { getCart, getTotal, deleteCart } from "./services/cartService.js";
import { postOrder } from "./services/productsService.js";

const form = document.querySelector(".cart__order__form");
init();

/**
 * Call functions to display each item of the cart
 * then add event listener to order button
 */
function init() {
  const cart = getCart();
  const itemsElement = document.getElementById("cart__items");
  renderCart(itemsElement, cart);

  const total = getTotal(cart);
  renderTotal(total);

  const orderButton = document.getElementById("order");
  orderButton.addEventListener("click", (event) => {
    onOrderClicked();
  });
}

/**
 * Triggered by order button when user want to confirm order.
 * * If form is valid , create options then change location to "confirmation.html" whith url param orderId = string returned by postOrder(options)
 */
function onOrderClicked() {
  const cart = getCart();
  const newTotal = getTotal(cart);
  if (
    isFormValid("firstName", "lastName", "address", "city", "email") == true &&
    newTotal.quantity > 0
  ) {
    form.action = "/front/html/confirmation.html";
  } else {
    if (newTotal.quantity <= 0) {
      console.log("No item in cart...");
    }
  }
}

/**
 * Used to check form validity
 * * Return false if at least one of the the element with an id =_args is not valid.
 * @param { String } _args //element id
 * @return {Boolean}
 */
function isFormValid(..._args) {
  let isValid = true;
  let elementIds = _args;
  _args.forEach((value, index) => {
    elementIds[index] = document.getElementById(value);
    if (elementIds[index].checkValidity() == false) {
      console.log(elementIds[index].name + " is not valid");
      isValid = false;
    }
  });
  return isValid;
}



/**
 * Used to generate options object for postOrder(options).
 * * Return options object where options.contact = getContact() and options.products = getProducts()
 * @return { Object } //options
 */
function getOrderOptions() {
  const contactData = getContact(
    "firstName",
    "lastName",
    "address",
    "city",
    "email"
  );
  const cart = getCart();
  const productsData = getProducts(cart);
  const order = { contact: contactData, products: productsData };
  const options = {
    method: "POST",
    body: JSON.stringify(order),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  return options;
}
