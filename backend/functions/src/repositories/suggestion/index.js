const admin = require("firebase-admin");

const db = admin.firestore();
const ref = admin.firestore().collection("suggestions");

module.exports = {
  index: async () => {
    try {
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

  findById: async (_id) => {
    try {
      const doc = await ref.doc(_id).get();

      return { result: true, suggestion: doc.data() };
    } catch (error) {
      return { result: false, error };
    }
  },

  create: async (data) => {
    try {
      data._createdAt = admin.firestore.FieldValue.serverTimestamp();
      data._updatedAt = admin.firestore.FieldValue.serverTimestamp();
      await ref.add(data);

      return { result: true };
    } catch (error) {
      return { result: false, error };
    }
  },

  update: async (_id, data) => {
    try {
      const doc = ref.doc(_id);

      data._updatedAt = admin.firestore.FieldValue.serverTimestamp();
      await doc.update(data);

      return { result: true };
    } catch (error) {
      return { result: false, error };
    }
  },

  destroy: async (_id) => {
    try {
      const doc = ref.doc(_id);

      await doc.delete();

      return { result: true };
    } catch (error) {
      return { result: false, error };
    }
  },

  destroyMany: async (selected) => {
    try {
      const collection = await ref.get();

      if (collection.size == 0) {
        return { result: true };
      }

      // Delete documents in a batch
      let batch = db.batch();
      collection.docs.forEach((doc) => {
        if (selected.includes(doc.id)) batch.delete(doc.ref);
      });

      await batch.commit();

      return { result: true };
    } catch (error) {
      return { result: false, error };
    }
  },

  destroyAll: async () => {
    try {
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
