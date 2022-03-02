/**
 * Call renderItemPreview() for each product in _products
 * @param { Element } _parent
 * @param { Array } _products
 */
function renderItems(_parent, _products) {
  if (_products) {
    _products.forEach((product) => {
      const itemPreview = renderItemPreview(
        product._id,
        product.imageUrl,
        product.altTxt,
        product.name,
        product.description
      );
      _parent.appendChild(itemPreview);
    });
  }
}

/**
 * Create an element displaying product properties then set the element as child of element with id "items"
 * @param { String } _id
 * @param { String } _imageUrl
 * @param { String } _altTxt
 * @param { String } _name
 * @param { String } _description
 */
function renderItemPreview(_id, _imageUrl, _altTxt, _name, _description) {
  let link = document.createElement("a");
  let product = document.createElement("article");
  let image = document.createElement("img");
  let name = document.createElement("h3");
  let description = document.createElement("p");

  link.href = `./product.html?id=${_id}`;
  image.src = _imageUrl;
  image.alt = _altTxt;

  name.classList.add("productName");
  description.classList.add("productDescription");

  name.textContent = _name;
  description.textContent = _description;

  link.appendChild(product);
  product.appendChild(image);
  product.appendChild(name);
  product.appendChild(description);

  return link;
}

export { renderItems };
