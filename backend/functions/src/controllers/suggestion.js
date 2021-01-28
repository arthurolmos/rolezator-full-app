const repo = require("../repositories/suggestion");

module.exports = {
  index: async (req, res, next) => {
    try {
      const { category } = req.query;
      const suggestions = await repo.index(category);

      return res.status(200).send(suggestions);
    } catch (err) {
      next(err);
    }
  },

  findById: async (req, res, next) => {
    try {
      const { id } = req.params;

      const suggestion = await repo.findById(id);

      return res.status(200).send(suggestion);
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      const data = req.body;

      await repo.create(data);

      return res.status(201).send(data);
    } catch (err) {
      next(err);
    }
  },

  bulkCreate: async (req, res, next) => {
    try {
      const data = req.body;

      await repo.bulkCreate(data);

      return res.status(201).end();
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const values = req.body;

      await repo.update(id, values);

      const suggestion = await repo.findById(id);

      return res.status(200).send(suggestion);
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

  destroyMany: async (req, res, next) => {
    try {
      const selected = req.body;

      await repo.destroyMany(selected);

      return res.status(204).end();
    } catch (err) {
      next(err);
    }
  },

  destroyAll: async (req, res, next) => {
    try {
      await repo.destroyAll();

      return res.status(204).end();
    } catch (err) {
      next(err);
    }
  },
};
