const { Router } = require("express");
const { UserBlacklistController } = require("../controllers");
const { userAuthorization } = require("../middlewares/authorization");

/**
 * USER BLACKLIST's route endpoints
 */

const router = Router();

router
  .route("/users/:uid/blacklist")
  .get(UserBlacklistController.index)
  .post(userAuthorization, UserBlacklistController.create);

router
  .route("/users/:uid/blacklist/:blacklistItemId")
  .delete(userAuthorization, UserBlacklistController.destroy);

module.exports = router;
