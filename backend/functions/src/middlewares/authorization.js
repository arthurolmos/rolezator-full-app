const admin = require("firebase-admin");
const { logger } = require("firebase-functions");
const Unauthorized = require("../errors/Unauthorized");

module.exports = (req, res, next) => {
  const idToken = req.get("Authorization");

  logger.log("idToken", idToken);

  admin
    .auth()
    .verifyIdToken(idToken)
    .then((claims) => {
      logger.log("claims", claims);

      if (claims.admin) {
        return next();
      } else {
        throw new Unauthorized();
      }
    });
};
