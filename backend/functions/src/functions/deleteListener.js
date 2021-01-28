const { functions } = require("../config/initialize-firebase");
const { logger } = require("firebase-functions");
const repo = require("../repositories/function");

function deleteListener(collection) {
  return functions.firestore
    .document(`/${collection}/{documentId}`)
    .onDelete((snap, context) => {
      const documentId = context.params.documentId;
      logger.log(`MOVING ${documentId} to deleted!`);

      const document = snap.data();
      repo.moveToDelete(collection, documentId, document);
    });
}

module.exports = deleteListener;
