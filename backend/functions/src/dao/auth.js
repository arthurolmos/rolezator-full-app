const NotFound = require("../errors/NotFound");
const FirebaseError = require("../errors/FirebaseError");
const admin = require("firebase-admin");

const auth = admin.auth();

module.exports = {
  listAllUsers: async (nextPageToken, users = []) => {
    // List batch of users, 1000 at a time.
    const listUsersResult = await auth
      .listUsers(1000, nextPageToken)
      .catch((err) => {
        throw new FirebaseError(err.message);
      });

    listUsersResult.users.forEach((user) => {
      users.push(user);
    });

    if (listUsersResult.pageToken) {
      listAllUsers(listUsersResult.pageToken, users);
    } else {
      return users;
    }
  },

  findUserById: async (id) => {
    const user = await auth.getUser(id).catch((err) => {
      throw new FirebaseError(err.message);
    });

    return user;
  },

  findUserByEmail: async (email) => {
    const user = await auth.getUserByEmail(email).catch((err) => {
      throw new FirebaseError(err.message);
    });

    return user;
  },

  create: async (data) => {
    const user = await auth
      .createUser({
        email: data.email,
        emailVerified: false,
        phoneNumber: data.phoneNumber,
        password: data.password,
        displayName: data.displayName,
        photoURL: data.photoURL,
        disabled: false,
      })
      .catch((err) => {
        throw new FirebaseError(err.message);
      });

    return user;
  },

  createUserWithId: async (data) => {
    const user = await auth
      .createUser({
        id: data.id,
        email: data.email,
        password: data.password,
        displayName: data.displayName,
        disabled: false,
      })
      .catch((err) => {
        throw new FirebaseError(err.message);
      });

    return user;
  },

  update: async (id, values) => {
    const user = await auth
      .updateUser(id, {
        email: values.email,
        displayName: values.displayName,
        disabled: values.disabled,
      })
      .catch((err) => {
        throw new FirebaseError(err.message);
      });

    return user;
  },

  destroy: async (id) => {
    await auth.deleteUser(id).catch((err) => {
      throw new FirebaseError(err.message);
    });
  },

  isUserAdmin: async (id) => {
    const user = await auth.getUser(id);

    logger.log("REPO USER", user);

    return user.customClaims["admin"];
  },
};
