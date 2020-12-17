const admin = require("firebase-admin");

module.exports = {
  addAdminStatus: async (req, res) => {
    const { uid } = req.params;

    try {
      const user = await admin.auth().getUser(uid);

      await admin.auth().setCustomUserClaims(uid, { admin: true });

      return res.status(200).json(user);
    } catch (error) {
      console.log("error", error);
      return res.status(400).json(error);
    }
  },

  removeAdminStatus: async (req, res) => {
    const { uid } = req.params;

    try {
      const user = await admin.auth().getUser(uid);

      await admin.auth().setCustomUserClaims(uid, { admin: false });

      return res.status(200).json(user);
    } catch (error) {
      console.log("error", error);
      return res.status(400).json(error);
    }
  },
};
