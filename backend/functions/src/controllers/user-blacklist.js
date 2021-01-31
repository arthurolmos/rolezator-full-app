const repo = require("../repositories/user-blacklist");

module.exports = {
  index: async (req, res, next) => {
    try {
      const { uid } = req.params;

      const blacklist = await repo.index(uid);

      return res.status(200).send(blacklist);
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      const { uid } = req.params;
      const blacklistItem = req.body;

      await repo.create(uid, blacklistItem);

      return res.status(201).send(blacklistItem);
    } catch (err) {
      next(err);
    }
  },

  destroy: async (req, res, next) => {
    try {
      const { uid, blacklistItemId } = req.params;

      await repo.destroy(uid, blacklistItemId);

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
