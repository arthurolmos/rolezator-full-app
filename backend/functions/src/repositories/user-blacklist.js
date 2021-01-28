const admin = require("firebase-admin");
const dao = require("../dao/db");
const db = require("../config/initialize-firebase").db;

const baseRef = db.collection("users");

module.exports = {
  index: async (uid) => {
    const ref = baseRef.doc(uid).collection("blacklist");

    return dao.getCollection(ref);
  },

  findById: async (uid) => {
    const ref = baseRef.doc(uid);

    return dao.getDocument(ref);
  },

  create: async (uid, blacklistItemId) => {
    const ref = baseRef.doc(uid).collection("blacklist");

    const data = {};
    data.createdAt = admin.firestore.FieldValue.serverTimestamp();

    return dao.setDocument(ref, blacklistItemId, data);
  },

  destroy: async (uid, blacklistItemId) => {
    const ref = db
      .collection("users")
      .doc(uid)
      .collection("blacklist")
      .doc(blacklistItemId);

    return dao.destroyDocument(ref);
  },

  destroyAll: async (uid) => {
    // const ref = db.collection("users").doc(uid).collection("suggestions");
    // const collection = await ref.get();
    // if (collection.size == 0) {
    //   return true;
    // }
    // // Delete documents in a batch
    // let batch = db.batch();
    // collection.docs.forEach((doc) => {
    //   batch.delete(doc.ref);
    // });
    // await batch.commit();
  },
};
