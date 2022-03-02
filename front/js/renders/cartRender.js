import {
  getCart,
  removeItemInCart,
  setItemQuantityInCart,
  getTotal,
} from "../services/cartService.js";

/**
 * Call renderCartItem() for each product in _cart then append returned elements to _parent
 * @param { Element } _parent HTML Element to append item elements
 * @param { Array } _cart
 */
function renderCart(_parent, _cart) {
  if (_parent.innerHTML != "") {
    _parent.innerHTML = "";
  }
  _cart.forEach((product) => {
    const item = renderCartItem(
      product.product,
      product.color,
      product.quantity
    );
    _parent.appendChild(item);
  });
}

/**
 * Create and return item element based on  _product, _color and _quantity
 * @param { Object } _product
 * @param { String } _color
 * @param { String } _quantity
 * @return { Element }
 */
function renderCartItem(_product, _color, _quantity) {
  const cartItem = document.createElement("article");
  cartItem.classList = "cart__item";
  cartItem.setAttribute("data-id", _product._id);
  finalCartItem.setAttribute("data-color", _color);

  const imageContainer = document.createElement("div");
  imageContainer.classList = "cart__item__img";
  cartItem.appendChild(imageContainer);

  const image = document.createElement("img");
  image.src = _product.imageUrl;
  image.alt = _product.altTxt;
  imageContainer.appendChild(image);

  const contentContainer = document.createElement("div");
  contentContainer.classList = "cart__item__content";
  cartItem.appendChild(contentContainer);

  const descriptionContainer = document.createElement("div");
  descriptionContainer.classList = "cart__item__content__description";
  contentContainer.appendChild(descriptionContainer);

  const name = document.createElement("h2");
  name.textContent = _product.name;
  descriptionContainer.appendChild(name);

  const color = document.createElement("p");
  color.textContent = _color;
  descriptionContainer.appendChild(color);

  const price = document.createElement("p");
  price.textContent = `${_product.price}€`;
  descriptionContainer.appendChild(price);

  const settingsContainer = document.createElement("div");
  settingsContainer.classList = "cart__item__content__settings";
  contentContainer.appendChild(settingsContainer);

  const quantityContainer = document.createElement("div");
  quantityContainer.classList = "cart__item__content__settings__quantity";
  settingsContainer.appendChild(quantityContainer);

  const quantity = document.createElement("p");
  quantity.textContent = `Qté : `;
  quantityContainer.appendChild(quantity);

  const quantityInput = document.createElement("input");
  quantityInput.type = "number";
  quantityInput.classList = "itemQuantity";
  quantityInput.name = "itemQuantity";
  quantityInput.min = 1;
  quantityInput.max = 100;
  quantityInput.value = _quantity;
  quantityInput.addEventListener("change", () => {
    setItemQuantityInCart(_product._id, _color, quantityInput.value);
    const cart = getCart();
    const total = getTotal(cart);
    renderTotal(total);
  });
  quantityContainer.appendChild(quantityInput);

  const deleteItemContainer = document.createElement("div");
  deleteItemContainer.classList = "cart__item__content__settings__delete";
  settingsContainer.appendChild(deleteItemContainer);

  const deleteItem = document.createElement("p");
  deleteItem.classList = "deleteItem";
  deleteItem.textContent = "Supprimer";
  deleteItem.addEventListener("click", () => {
    removeItemInCart(_product._id, _color);
    const itemsElement = document.getElementById("cart__items");
    const cart = getCart();
    renderCart(itemsElement, cart);
    const total = getTotal(cart);
    renderTotal(total);
  });
  deleteItemContainer.appendChild(deleteItem);

  return cartItem;
}

/**
 * Display total amount of item in cart and total price of the cart based on _total
 * @param { {price: number,quantity: number} } _total
 */
function renderTotal(_total) {
  const totalPriceElement = document.getElementById("totalPrice");
  const totalQuantityElement = document.getElementById("totalQuantity");
  totalPriceElement.textContent = parseInt(_total.price);
  totalQuantityElement.textContent = parseInt(_total.quantity);
}

export { renderCart, renderTotal };
