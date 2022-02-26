/**
 * Return urlParams as an object
 * @return { Object } // params
 */
function getParams() {
  const params = new URLSearchParams(window.location.search);

  const obj = {};

  // iterate over all keys
  for (const key of params.keys()) {
    if (params.getAll(key).length > 1) {
      obj[key] = params.getAll(key);
    } else {
      obj[key] = params.get(key);
    }
  }

  return obj;
}

export { getParams };
