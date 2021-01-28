const dao = require("../dao/auth");

/**
 * Repositorie for USER's CRUD.
 * For USER's, admininistrative access, check auth controller.
 */

module.exports = {
  index: () => {
    return dao.listAllUsers();
  },

  findById: (id) => {
    return dao.findUserById(id);
  },

  findByEmail: async (email) => {
    return dao.findUserByEmail(email);
  },

  create: (data) => {
    return dao.create(data);
  },

  createWithId: (data) => {
    return dao.createUserWithId(data);
  },

  update: async (id, values) => {
    return dao.update(id, values);
  },

  destroy: async (id) => {
    return dao.destroy(id);
  },
};
