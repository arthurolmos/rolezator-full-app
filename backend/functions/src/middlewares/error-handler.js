const NotFound = require("../errors/NotFound");
const Unauthorized = require("../errors/Unauthorized");
const FirebaseError = require("../errors/FirebaseError");
const ValueNotSupported = require("../errors/ValueNotSupported");

module.exports = (err, req, res, next) => {
  if (err instanceof NotFound) {
    return res.status(404).send(err.message);
  }

  if (err instanceof Unauthorized) {
    return res.status(401).end();
  }

  if (err instanceof FirebaseError) {
    return res.status(400).send(err.message);
  }

  if (err instanceof ValueNotSupported) {
    return res.status(400).send(err.message);
  }

  return res.status(500).send(err.message);
};
