const admin = require("firebase-admin");
const dao = require("../dao/db");
const db = require("../config/initialize-firebase").db;

module.exports = {
  moveToDelete: (collection, id, document) => {
    document.deletedAt = admin.firestore.FieldValue.serverTimestamp();

    const ref = db.collection(`${collection}_deleted`);
    return dao.setDocument(ref, id, document);
  },
};
