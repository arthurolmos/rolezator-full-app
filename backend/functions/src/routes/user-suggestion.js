const { Router } = require("express");
const { UserSuggestionController } = require("../controllers");

/**
 * USER SUGGESTIONS's route endpoints
 */

const router = Router();

router
  .route("/users/:uid/suggestions")
  .get(UserSuggestionController.index)
  .post(UserSuggestionController.create);

router
  .route("/users/:uid/suggestions/:suggestionId")
  //   .get(UserSuggestionController.findById)
  .put(UserSuggestionController.update)
  .delete(UserSuggestionController.destroy);

module.exports = router;
