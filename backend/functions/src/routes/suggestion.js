const { Router } = require("express");
const { SuggestionController } = require("../controllers");
const { adminAuthorization } = require("../middlewares/authorization");

/**
 * SUGGESTION's route endpoints
 */

const router = Router();

router
  .route("/suggestions")
  .get(SuggestionController.index)
  .post(adminAuthorization, SuggestionController.create);

router
  .route(adminAuthorization, "/suggestions/bulk-create")
  .post(SuggestionController.bulkCreate);

router
  .route("/suggestions/:id")
  .get(SuggestionController.findById)
  .put(adminAuthorization, SuggestionController.update)
  .delete(adminAuthorization, SuggestionController.destroy);

module.exports = router;
