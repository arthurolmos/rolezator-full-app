const admin = require("firebase-admin");
const { logger } = require("firebase-functions");
const Unauthorized = require("../errors/Unauthorized");

module.exports = {
  adminAuthorization: async (req, res, next) => {
    try {
      const uid = req.get("Uid");
      if (!uid) throw new Unauthorized();
      logger.log("Uid", uid);

      const user = await admin.auth().getUser(uid);

      if (user.customClaims && user.customClaims.admin) {
        next();
      } else {
        throw new Unauthorized();
      }
    } catch (err) {
      next(err);
    }
  },

  // adminAuthorization: async (req, res, next) => {
  //   const idToken = req.get("Authorization");

  //   logger.log("idToken", idToken);

  //   const claims = await admin.auth().verifyIdToken(idToken);
  //   logger.log("claims", claims);

  //   if (claims.admin) {
  //     return next();
  //   } else {
  //     throw new Unauthorized();
  //   }
  // },

  userAuthorization: async (req, res, next) => {
    try {
      const tokenId = req.get("TokenId");
      if (!tokenId) throw new Unauthorized();
      logger.log("tokenId", tokenId);

      const decodedToken = await admin.auth().verifyIdToken(tokenId);
      if (decodedToken.uid) {
        req.tokenId = decodedToken.uid;
        next();
      } else {
        throw new Unauthorized();
      }
    } catch (err) {
      next(err);
    }
  },
};
