import { getParams } from "./utils.js";
import { addItemInCart } from "./services/cartService.js";
import { getProduct } from "./services/productsService.js";
import { renderItem } from "./renders/productRender.js";

let product = {};
(async () => {
  const params = getParams(); //Url params
  if (params.id) {
    // Check if urlParams.id exist
    product = await getProduct(params.id); // get product data from api
    renderItem(product); // Fill elements with product data

    const addToCart = document.getElementById("addToCart"); //addToCart button
    addToCart.addEventListener("click", () => {
      onAddItemInCart();
    }); // Add event listener
  }
})();

/**
 * Triggered by addToCart button on click event
 * * Add product to cart with selected color and amount
 */
function onAddItemInCart() {
  const color = document.getElementById("colors");
  const quantity = document.getElementById("quantity");
  if (parseInt(quantity.value) > 0 && parseInt(color.selectedIndex) > 0) {
    addItemInCart(
      product,
      color.options[color.selectedIndex].text,
      quantity.value
    );
    quantity.value = 0;
  }
}
