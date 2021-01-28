const admin = require("firebase-admin");
const dao = require("../dao/db");
const db = require("../config/initialize-firebase").db;

const baseRef = db.collection("users");

module.exports = {
  index: async (uid) => {
    const ref = baseRef.doc(uid).collection("suggestions");

    return dao.getCollection(ref);
  },

  findById: async (uid, suggestionId) => {
    const ref = baseRef.doc(uid).collection("suggestions").doc(suggestionId);

    return dao.getDocument(ref);
  },

  create: async (uid, suggestion) => {
    const ref = baseRef.doc(uid).collection("suggestions");

    suggestion.createdAt = admin.firestore.FieldValue.serverTimestamp();
    suggestion.updatedAt = admin.firestore.FieldValue.serverTimestamp();
    return dao.setDocument(ref, suggestion.id, suggestion);
  },

  update: async (uid, suggestionId, values) => {
    const ref = db
      .collection("users")
      .doc(uid)
      .collection("suggestions")
      .doc(suggestionId);

    values.updatedAt = admin.firestore.FieldValue.serverTimestamp();
    return dao.updateDocument(ref, values);
  },

  destroy: async (uid, suggestionId) => {
    const ref = db
      .collection("users")
      .doc(uid)
      .collection("suggestions")
      .doc(suggestionId);
    return dao.destroyDocument(ref);
  },

  destroyAll: async (uid) => {
    const ref = db.collection("users").doc(uid).collection("suggestions");

    const collection = await ref.get();

    if (collection.size == 0) {
      return true;
    }

    // Delete documents in a batch
    let batch = db.batch();
    collection.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
  },
};
