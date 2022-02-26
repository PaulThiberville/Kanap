/**
 * Call functions to update Item texts and image based on _product
 * @param { Object } _product
 */
function renderItem(_product) {
  if (_product) {
    console.log("try to render item : ", _product);
    renderItemImage(_product.imageUrl, _product.altTxt);
    renderItemTxts(_product.name, _product.price, _product.description);
    renderColorSelect(_product.colors);
  }
}

/**
 * Create item's img then set the element as child of the element with class "item__img"
 * @param { String } _imageUrl // href
 * @param { String } _altTxt // alt
 */
function renderItemImage(_imageUrl, _altTxt) {
  const image = document.createElement("img");
  image.setAttribute("src", _imageUrl);
  image.setAttribute("alt", _altTxt);
  document.querySelector(".item__img").appendChild(image);
}

/**
 * Update item name, price and description text elements
 * @param { String } _name
 * @param { String } _price
 * @param { String } _price
 */
function renderItemTxts(_name, _price, _description) {
  const title = document.getElementById("title");
  const price = document.getElementById("price");
  const description = document.getElementById("description");

  title.textContent = _name;
  price.textContent = _price;
  description.textContent = _description;
}

/**
 * Create an element to select color with options based on _colors
 * then set the element as child of element with id "colors"
 * @param { [color:string] } _colors
 */
function renderColorSelect(_colors) {
  _colors.forEach((color) => {
    const option = document.createElement("option");
    option.value = color;
    option.textContent = color;
    document.getElementById("colors").appendChild(option);
  });
}

export { renderItem };
