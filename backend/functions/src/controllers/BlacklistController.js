const repository = require("../repositories/blacklist");

const name = "Blacklist";

module.exports = {
  index: async (req, res) => {
    const { uid } = req.params;

    const resp = await repository.index(uid);

    if (!resp) return res.status(400).json(resp.error);

    return res.status(200).json(resp.docs);
  },

  create: async (req, res) => {
    const { uid } = req.params;

    const resp = await repository.create(uid, req.body);

    if (!resp.result) return res.status(400).json(resp.error);

    return res.status(201).send(`${name} item added succesfully!`);
  },

  update: async (req, res) => {
    const { uid, _id } = req.params;

    const resp = await repository.update(uid, _id, req.body);

    if (!resp.result) return res.status(400).json(resp.error);

    return res.status(200).send(`${name} item updated succesfully!`);
  },

  destroy: async (req, res) => {
    const { uid, _id } = req.params;

    const resp = await repository.destroy(uid, _id);
    if (!resp.result) return res.status(400).json(resp.error);

    return res.status(200).send(`${name} item deleted succesfully!`);
  },

  destroyAll: async (req, res) => {
    const { uid } = req.params;

    const resp = await repository.destroyAll(uid);
    if (!resp.result) return res.status(400).json(resp.error);

    return res.status(200).send(`${name} collection deleted succesfully!`);
  },
};
