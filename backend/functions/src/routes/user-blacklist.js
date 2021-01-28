const { Router } = require("express");
const { UserBlacklistController } = require("../controllers");

/**
 * USER BLACKLIST's route endpoints
 */

const router = Router();

router
  .route("/users/:uid/blacklist")
  .get(UserBlacklistController.index)
  .post(UserBlacklistController.create);

router
  .route("/users/:uid/blacklist/:blacklistItemId")
  .delete(UserBlacklistController.destroy);

module.exports = router;
