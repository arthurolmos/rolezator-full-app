const NotFound = require("../errors/NotFound");
const repo = require("../repositories/user");
const { UserSerializer } = require("../serializer/Serializer");

/**
 * Controls all access to USER's CRUD.
 * For USER's, admininistrative access, check auth controller.
 */

module.exports = {
  index: async (req, res, next) => {
    try {
      const users = await repo.index();

      const serializer = new UserSerializer();

      return res.status(200).send(serializer.serialize(users));
    } catch (err) {
      next(err);
    }
  },

  findById: async (req, res, next) => {
    try {
      const { id } = req.params;

      const user = await repo.findById(id);
      if (!user) throw new NotFound();

      const serializer = new UserSerializer();
      return res.status(200).send(serializer.serialize(user));
    } catch (err) {
      next(err);
    }
  },

  findByEmail: async (req, res, next) => {
    try {
      const { email } = req.body;

      const user = await repo.findByEmail(email);
      if (!user) throw new NotFound();

      const serializer = new UserSerializer();
      return res.status(200).send(serializer.serialize(user));
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      const { displayName, email, password } = req.body;

      const data = {
        displayName,
        email,
        password,
      };

      await repo.create(data);

      return res.status(201).end();
    } catch (err) {
      next(err);
    }
  },

  createWithId: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { displayName, email, password } = req.body;

      const data = {
        id,
        displayName,
        email,
        password,
      };

      await repo.createWithId(data);

      return res.status(201).end();
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { displayName, email, disabled } = req.body;

      const values = {
        displayName,
        email,
        disabled,
      };

      await repo.update(id, values);

      return res.status(204).end();
    } catch (err) {
      next(err);
    }
  },

  destroy: async (req, res, next) => {
    try {
      const { id } = req.params;

      await repo.destroy(id);

      return res.status(204).end();
    } catch (err) {
      next(err);
    }
  },
};
