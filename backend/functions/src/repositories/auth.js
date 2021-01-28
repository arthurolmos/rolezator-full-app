const admin = require("firebase-admin");
const db = require("../config/initialize-firebase").db;
const NotFound = require("../errors/NotFound");
const dao = require("../dao/auth");

const auth = admin.auth();

module.exports = {
  index: async () => {
    const users = await dao.listAllUsers();

    return users;
  },

  findById: async (uid) => {
    const user = await dao.getUserById(uid);

    return user.toJSON();
  },

  findByEmail: async (email) => {
    const user = await dao.getUserByEmail(email);

    return user.toJSON();
  },

  create: async (data) => {
    const user = await dao.createUser(data);
    return user.toJSON();
  },

  createWithId: async (data) => {
    const user = await dao.createUserWithId(data);
    return user.toJSON();
  },

  update: async (uid, values) => {
    const user = await dao.updateUser(uid, values);
    return user.toJSON();
  },

  destroy: async (uid) => {
    await dao.destroyUser(uid);
  },

  destroyAll: async () => {
    await dao.destroyCollection(baseRef, db);
  },

  removeItemFromBlacklist: async (uid, itemId) => {
    const ref = baseRef.doc(uid);

    const user = await dao.getDocument(ref);
    if (user == null) throw new NotFound("User");

    if (user.blacklist.indexOf(itemId) === -1) return;

    user.blacklist.splice(user.blacklist.indexOf(itemId), 1);
    user._updatedAt = admin.firestore.FieldValue.serverTimestamp();

    await dao.updateDocument(ref, user);
  },

  addItemInBlacklist: async (uid, itemId) => {
    const ref = baseRef.doc(uid);

    const user = await dao.getDocument(ref);
    if (user == null) throw new NotFound("User");

    if (user.blacklist.indexOf(itemId) !== -1) return;

    user.blacklist.push(itemId);
    user._updatedAt = admin.firestore.FieldValue.serverTimestamp();

    await dao.updateDocument(ref, user);
  },
};
