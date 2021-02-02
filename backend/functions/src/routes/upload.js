const { Router } = require("express");
const UploadController = require("../controllers/UploadController");
const { adminAuthorization } = require("../middlewares/authorization");

/**
 * UPLOAD's route endpoints
 */

const router = Router();

router
  .route("/suggestions/upload")
  .post(adminAuthorization, UploadController.createSuggestionsFromCsv);

module.exports = router;
