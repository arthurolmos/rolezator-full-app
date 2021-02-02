const { Router } = require("express");
const { AuthController } = require("../controllers");

/**
 * AUTH's route endpoints
 */

const router = Router();

router.route("/auth/admin/add-admin").post(AuthController.addAdminStatus);
router.route("/auth/admin/remove-admin").post(AuthController.removeAdminStatus);

module.exports = router;
