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

  updateInputValidationPatterns();
}

/**
 * Update the pattern attribute of form inputs elements to
 * match awaited url params formats on confirmation page
 */
function updateInputValidationPatterns() {
  const namesPattern =
    "^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$";
  const addressesPattern =
    "^[0-9a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$";
  const emailPattern =
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$";

  const firstName = document.getElementById("firstName");
  firstName.pattern = namesPattern;

  const lastName = document.getElementById("lastName");
  lastName.pattern = namesPattern;

  const address = document.getElementById("address");
  address.pattern = addressesPattern;

  const city = document.getElementById("city");
  city.pattern = addressesPattern;

  const email = document.getElementById("email");
  email.pattern = emailPattern;
}
