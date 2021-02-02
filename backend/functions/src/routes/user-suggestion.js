const { Router } = require("express");
const { UserSuggestionController } = require("../controllers");
const { userAuthorization } = require("../middlewares/authorization");

/**
 * USER SUGGESTIONS's route endpoints
 */

const router = Router();

router
  .route("/users/:uid/suggestions")
  .get(UserSuggestionController.index)
  .post(userAuthorization, UserSuggestionController.create);

router
  .route("/users/:uid/suggestions/:suggestionId")
  //   .get(UserSuggestionController.findById)
  // .put(UserSuggestionController.update)
  .delete(userAuthorization, UserSuggestionController.destroy);

module.exports = router;
