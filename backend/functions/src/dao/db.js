const NotFound = require("../errors/NotFound");

module.exports = {
  getCollection: async (ref) => {
    const collection = await ref.get().catch((err) => {
      throw new FirebaseError(err.message);
    });

    const docs = [];
    collection.forEach((doc) => {
      const item = doc.data();
      item.id = doc.id;

      docs.push(item);
    });

    return docs;
  },

  getDocument: async (ref) => {
    const resp = await ref.get().catch((err) => {
      throw new FirebaseError(err.message);
    });
    if (!!!resp.exists) throw new NotFound("Doc");

    const doc = resp.data();
    doc.id = resp.id;

    return doc;
  },

  addDocument: async (ref, data) => {
    return await ref.add(data).catch((err) => {
      throw new FirebaseError(err.message);
    });
  },

  setDocument: async (ref, id, data) => {
    return await ref
      .doc(id)
      .set(data)
      .catch((err) => {
        throw new FirebaseError(err.message);
      });
  },

  updateDocument: async (ref, values) => {
    const doc = await ref.get().catch((err) => {
      throw new FirebaseError(err.message);
    });
    if (!!!doc.exists) throw new NotFound("Doc");

    await ref.update(values);
  },

  destroyDocument: async (ref) => {
    const doc = await ref.get().catch((err) => {
      throw new FirebaseError(err.message);
    });
    if (!!!doc.exists) throw new NotFound("Doc");

    await ref.delete();
  },

  destroyCollection: async (ref, db) => {
    const collection = await ref.get().catch((err) => {
      throw new FirebaseError(err.message);
    });

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

  destroySelected: async (ref, db, selected) => {
    const collection = await ref.get().catch((err) => {
      throw new FirebaseError(err.message);
    });

    if (collection.size == 0) {
      return true;
    }

    // Delete documents in a batch
    let batch = db.batch();
    collection.docs.forEach((doc) => {
      if (selected.includes(doc.id)) batch.delete(doc.ref);
    });

    await batch.commit();
  },
};
