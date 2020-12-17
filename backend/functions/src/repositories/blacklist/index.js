const admin = require("firebase-admin");

const db = admin.firestore();

module.exports = {
  index: async (uid) => {
    try {
      const ref = admin
        .firestore()
        .collection("users")
        .doc(uid)
        .collection("blacklist");

      const collection = await ref.get();

      const docs = [];
      collection.forEach((doc) => {
        const item = doc.data();
        item._id = doc.id;

        docs.push(item);
      });

      return { result: true, docs };
    } catch (error) {
      return { result: false, error };
    }
  },

  create: async (uid, data) => {
    try {
      const ref = admin
        .firestore()
        .collection("users")
        .doc(uid)
        .collection("blacklist");

      data._createdAt = admin.firestore.FieldValue.serverTimestamp();
      data._updatedAt = admin.firestore.FieldValue.serverTimestamp();
      await ref.add(data);

      return { result: true };
    } catch (error) {
      return { result: false, error };
    }
  },

  update: async (uid, _id, data) => {
    try {
      const ref = admin
        .firestore()
        .collection("users")
        .doc(uid)
        .collection("blacklist");

      const doc = ref.doc(_id);

      data._updatedAt = admin.firestore.FieldValue.serverTimestamp();
      await doc.update(data);

      return { result: true };
    } catch (error) {
      return { result: false, error };
    }
  },

  destroy: async (uid, _id) => {
    try {
      const ref = admin
        .firestore()
        .collection("users")
        .doc(uid)
        .collection("blacklist");

      const doc = ref.doc(_id);

      await doc.delete();

      return { result: true };
    } catch (error) {
      return { result: false, error };
    }
  },

  destroyAll: async (uid) => {
    try {
      const ref = admin
        .firestore()
        .collection("users")
        .doc(uid)
        .collection("blacklist");

      const collection = await ref.get();

      if (collection.size == 0) {
        return { result: true };
      }

      // Delete documents in a batch
      let batch = db.batch();
      collection.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });

      await batch.commit();

      return { result: true };
    } catch (error) {
      return { result: false, error };
    }
  },
};
