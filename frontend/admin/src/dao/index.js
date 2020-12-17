import firebase from "firebase";

const dao = {
  getInstance() {
    return firebase.firestore();
  },

  getUserRef() {
    const auth = firebase.auth();
    const db = firebase.firestore();

    const user = auth.currentUser;

    if (user) return db.collection("users").doc(user.uid);
    return null;
  },

  getFirebaseTime(date) {
    return firebase.firestore.Timestamp.fromDate(date);
  },

  async getDocument(ref) {
    const resp = await ref.get().catch((err) => {
      console.log("ERROR ON GETTING DOCUMENT", err);
    });

    if (resp.exists) {
      const doc = resp.data();
      doc.id = resp.id;

      return doc;
    }

    return null;
  },

  async getCollection(ref) {
    const snapshot = await ref.get().catch((err) => {
      console.log("ERROR ON GETTING COLLECTION", err);
    });

    const docs = [];
    await snapshot.forEach((doc) => {
      const item = doc.data();
      item.id = doc.id;

      docs.push(item);
    });

    return docs;
  },

  async createDocument(ref, data) {
    data._createdAt = firebase.firestore.FieldValue.serverTimestamp();
    data._updatedAt = firebase.firestore.FieldValue.serverTimestamp();

    const docRef = await ref.add(data).catch((err) => {
      console.log("ERROR ON ADDING DOCUMENT", err);
    });

    return docRef.id;
  },

  async setDocumentWithId(ref, data) {
    data._createdAt = firebase.firestore.FieldValue.serverTimestamp();
    data._updatedAt = firebase.firestore.FieldValue.serverTimestamp();

    const docRef = await ref.set(data).catch((err) => {
      console.log("ERROR ON SETTING DOCUMENT WITH ID", err);
    });

    return docRef.id;
  },

  async updateDocument(ref, data) {
    data._updatedAt = firebase.firestore.FieldValue.serverTimestamp();

    await ref.update(data);
  },

  async deleteDocument(ref) {
    await ref.delete();
  },
};

export default dao;
