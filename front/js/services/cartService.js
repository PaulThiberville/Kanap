/**
 * Set the value of cart in localStorage to _cart
 * @param { Array } _cart
 */
function setCart(_cart) {
  localStorage.setItem("cart", JSON.stringify(_cart));
}

/**
 * Set the value of cart in localStorage to an empty string
 */
function deleteCart() {
  localStorage.setItem("cart", null);
}

/**
 * Return the cart array from local storage
 * @return { Array }
 */
function getCart() {
  let cart = JSON.parse(localStorage.getItem("cart"));
  if (cart == null) {
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  return cart;
}
/**
 * Add item to the cart in localStorage
 * @param { Object } _product
 * @param { String } _color
 * @param { String } _quantity
 */
function addItemInCart(_product, _color, _quantity) {
  console.log("Trying to add item : ", _product, _color, _quantity);
  let cart = getCart();
  let exist = false;
  cart.forEach((product) => {
    if (product.product._id == _product._id && product.color == _color) {
      product.quantity = parseInt(product.quantity) + parseInt(_quantity);

      console.log(
        "Updating cart item : ",
        _product._id,
        " Quantity :",
        _quantity,
        " Color :",
        _color
      );
      exist = true;
    }
  });
  if (exist == false) {
    let newProduct = {};
    newProduct.product = _product;
    newProduct.color = _color;
    newProduct.quantity = _quantity;
    cart.push(newProduct);

    console.log(
      "Adding new cart item : ",
      _product._id,
      " Quantity :",
      _quantity,
      " Color :",
      _color
    );
  }
  setCart(cart);
  console.log("Cart : ", getCart());
}
/**
 * Remove item from the cart in localStorage
 * @param { String } _id
 * @param { String } _color
 */
function removeItemInCart(_id, _color) {
  let cart = getCart();
  console.log("try to remove :", _id, _color);
  console.log("From : ", cart);
  cart.forEach((product, index) => {
    if (product.product._id == _id && product.color == _color) {
      cart.splice(index, 1);
    }
  });
  console.log("Cart after removing item  : ", cart);
  setCart(cart);
}

/**
 * Update the quantity in the cart in localStorage
 * @param { String } _id
 * @param { String } _color
 */
function setItemQuantityInCart(_id, _color, _quantity) {
  let cart = getCart();
  cart.forEach((product) => {
    if (product.product._id == _id && product.color == _color) {
      product.quantity = parseInt(_quantity);
    }
  });
  setCart(cart);
}

/**
 * Return the total price and quantity of products in the cart as an object
 * @param { Array } _cart
 * @returns { Object }
 */
function getTotal(_cart) {
  let price = 0;
  let quantity = 0;
  console.log("Try to calculate total from cart : ", _cart);
  if (_cart) {
    _cart.forEach((item) => {
      for (let i = 0; i < item.quantity; i++) {
        price += parseInt(item.product.price);
        quantity++;
      }
    });
  }
  console.log("Total :");
  console.log("Price : ", price, "Quantity : ", quantity);
  return { price, quantity };
}

export {
  getCart,
  getTotal,
  addItemInCart,
  removeItemInCart,
  setItemQuantityInCart,
  deleteCart,
};
