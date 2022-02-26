import { getProducts } from "./services/productsService.js";
import { renderItems } from "./renders/indexRender.js";

(async () => {
  const products = await getProducts(); // All produts from api
  const itemsElement = document.getElementById("items"); // Element we want to fill with item elements
  renderItems(itemsElement, products); // Fill itemsElement;
})();
