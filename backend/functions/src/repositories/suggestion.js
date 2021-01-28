const admin = require("firebase-admin");
const dao = require("../dao/db");
const db = require("../config/initialize-firebase").db;
const { logger } = require("firebase-functions");

const baseRef = db.collection("suggestions");

module.exports = {
  index: (query = "") => {
    if (query !== "") {
      const ref = baseRef.where("category", "==", query);

      return dao.getCollection(ref);
    } else {
      return dao.getCollection(baseRef);
    }
  },

  findById: (id) => {
    const ref = baseRef.doc(id);

    return dao.getDocument(ref);
  },

  create: (suggestion) => {
    suggestion.createdAt = admin.firestore.FieldValue.serverTimestamp();
    suggestion.updatedAt = admin.firestore.FieldValue.serverTimestamp();
    return dao.addDocument(baseRef, suggestion);
  },

  bulkCreate: (suggestionArray) => {
    return suggestionArray.forEach((suggestion) => {
      suggestion.createdAt = admin.firestore.FieldValue.serverTimestamp();
      suggestion.updatedAt = admin.firestore.FieldValue.serverTimestamp();
      return dao.addDocument(baseRef, suggestion);
    });
  },

  createWithId: (id, suggestion) => {
    suggestion.createdAt = admin.firestore.FieldValue.serverTimestamp();
    suggestion.updatedAt = admin.firestore.FieldValue.serverTimestamp();

    const ref = db.collection("suggestions_deleted");
    return dao.setDocument(ref, id, suggestion);
  },

  update: (id, values) => {
    const ref = baseRef.doc(id);

    values.updatedAt = admin.firestore.FieldValue.serverTimestamp();
    return dao.updateDocument(ref, values);
  },

  destroy: (id) => {
    const ref = baseRef.doc(id);
    return dao.destroyDocument(ref);
  },

  destroySelected: async (selected) => {
    await dao.destroySelected(baseRef, db, selected);
  },

  destroyAll: async () => {
    await dao.destroyAll(baseRef, db);
  },
};
