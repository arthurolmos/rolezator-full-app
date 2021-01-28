const { Router } = require("express");
const { SuggestionController } = require("../controllers");

/**
 * SUGGESTION's route endpoints
 */

const router = Router();

router
  .route("/suggestions")
  .get(SuggestionController.index)
  .post(SuggestionController.create);

router.route("/suggestions/bulk-create").post(SuggestionController.bulkCreate);

router
  .route("/suggestions/:id")
  .get(SuggestionController.findById)
  .put(SuggestionController.update)
  .delete(SuggestionController.destroy);

module.exports = router;
