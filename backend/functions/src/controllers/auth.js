const admin = require("firebase-admin");

/**
 * Controls all access to AUTH's functions.
 * For USER's, admininistrative access, check USER controller.
 */

module.exports = {
  addAdminStatus: async (req, res, next) => {
    try {
      const { uid } = req.body;
      const user = await admin.auth().getUser(uid);

      await admin.auth().setCustomUserClaims(uid, { admin: true });

      return res.send(user);
    } catch (err) {
      next(err);
    }
  },

  removeAdminStatus: async (req, res, next) => {
    try {
      const { uid } = req.body;
      const user = await admin.auth().getUser(uid);

      await admin.auth().setCustomUserClaims(uid, { admin: false });

      return res.send(user);
    } catch (err) {
      next(err);
    }
  },
};
