const deleteListener = require("./deleteListener");

function addDeleteListener(collections) {
  return collections.map((collection) => {
    return deleteListener(collection);
  });
}

module.exports = { addDeleteListener };
