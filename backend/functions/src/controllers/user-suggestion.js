const repo = require("../repositories/user-suggestion");

module.exports = {
  index: async (req, res, next) => {
    try {
      const { uid } = req.params;

      const suggestions = await repo.index(uid);

      return res.status(200).send(suggestions);
    } catch (err) {
      next(err);
    }
  },

  findById: async (req, res, next) => {
    try {
      const { uid, suggestionId } = req.params;

      const suggestion = await repo.findById(uid, suggestionId);

      return res.status(200).send(suggestion);
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      const { uid } = req.params;
      const userSuggestion = req.body;

      await repo.create(uid, userSuggestion);

      return res.status(201).end();
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const { uid, suggestionId } = req.params;
      const values = req.body;

      await repo.update(uid, suggestionId, values);

      const suggestion = await repo.findById(uid, suggestionId);

      return res.status(200).send(suggestion);
    } catch (err) {
      next(err);
    }
  },

  destroy: async (req, res, next) => {
    try {
      const { uid, suggestionId } = req.params;

      await repo.destroy(uid, suggestionId);

      return res.status(204).end();
    } catch (err) {
      next(err);
    }
  },

  destroyAll: async (req, res, next) => {
    try {
      const { uid } = req.params;

      await repo.destroyAll(uid);

      return res.status(204).end();
    } catch (err) {
      next(err);
    }
  },
};
