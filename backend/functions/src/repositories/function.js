const admin = require("firebase-admin");
const dao = require("../dao/db");
const { logger } = require("firebase-functions");
const db = require("../config/initialize-firebase").db;

module.exports = {
  moveToDelete: (collection, id, document) => {
    document.deletedAt = admin.firestore.FieldValue.serverTimestamp();

    const ref = db.collection(`${collection}_deleted`);
    return dao.setDocument(ref, id, document);
  },

  removeFromUserBlacklist: async (documentId) => {
    logger.log("IM HERE", documentId);

    const items = await db
      .collectionGroup("blacklist")
      .where("id", "==", documentId)
      .get();

    logger.log("NOW IM HERE", items);

    return items.forEach((item) => {
      logger.log("AND NOW IM HERE", item);

      item.ref.delete();
    });
  },
};
