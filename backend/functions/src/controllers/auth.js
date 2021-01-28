const admin = require("firebase-admin");

module.exports = {
  addAdminStatus: async (req, res, next) => {
    try {
      const { uid } = req.params;
      const user = await admin.auth().getUser(uid);

      await admin.auth().setCustomUserClaims(uid, { admin: true });

      return res.send(user);
    } catch (err) {
      next(err);
    }
  },

  removeAdminStatus: async (req, res, next) => {
    try {
      const { uid } = req.params;
      const user = await admin.auth().getUser(uid);

      await admin.auth().setCustomUserClaims(uid, { admin: false });

      return res.send(user);
    } catch (err) {
      next(err);
    }
  },
};
