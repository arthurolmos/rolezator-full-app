const { Router } = require("express");
const { UserController } = require("../controllers");

/**
 * USER's route endpoints
 */

const router = Router();

router.route("/users").get(UserController.index).post(UserController.create);

router.route("/users/findByEmail").post(UserController.findByEmail);

router
  .route("/users/:id")
  .get(UserController.findById)
  .put(UserController.update)
  .delete(UserController.destroy);

module.exports = router;
