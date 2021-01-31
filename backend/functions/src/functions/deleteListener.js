const { functions } = require("../config/initialize-firebase");
const repo = require("../repositories/function");

function deleteListener(collection) {
  return functions.firestore
    .document(`/${collection}/{documentId}`)
    .onDelete((snap, context) => {
      const documentId = context.params.documentId;

      const document = snap.data();
      //Cretes a backup copy of deleted register in $collection_deleted collection
      repo.moveToDelete(collection, documentId, document);

      //Removes deletes registry from users' blacklist
      repo.removeFromUserBlacklist(documentId);
    });
}

module.exports = deleteListener;
