const admin = require("firebase-admin");
const dao = require("../dao/db");
const db = require("../config/initialize-firebase").db;
const { logger } = require("firebase-functions");

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

  create: async (uid, blacklistItem) => {
    const ref = baseRef.doc(uid).collection("blacklist");

    logger.log("ITEM", blacklistItem);

    blacklistItem.createdAt = admin.firestore.FieldValue.serverTimestamp();

    return dao.setDocument(ref, blacklistItem.id, blacklistItem);
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
