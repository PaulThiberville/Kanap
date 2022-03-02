import { renderCart, renderTotal } from "./renders/cartRender.js";
import { getCart, getTotal } from "./services/cartService.js";

init();

/**
 * Call functions to display each item of the cart
 * then add form action url to confirmation page
 */
function init() {
  const cart = getCart();
  const itemsElement = document.getElementById("cart__items");
  renderCart(itemsElement, cart);

  const total = getTotal(cart);
  renderTotal(total);

  const form = document.querySelector(".cart__order__form");
  form.action = "/front/html/confirmation.html";
}
