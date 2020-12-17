const repository = require("../repositories/suggestion");

const name = "Suggestion";

module.exports = {
  index: async (req, res) => {
    const resp = await repository.index();

    if (!resp) return res.status(400).json(resp.error);

    return res.status(200).json(resp.docs);
  },

  findById: async (req, res) => {
    const { _id } = req.params;

    const resp = await repository.findById(_id);

    if (!resp) return res.status(400).json(resp.error);

    return res.status(200).json(resp.suggestion);
  },

  create: async (req, res) => {
    const resp = await repository.create(req.body);

    if (!resp.result) return res.status(400).json(resp.error);

    return res.status(201).send(`${name} created succesfully!`);
  },

  update: async (req, res) => {
    const { _id } = req.params;

    const resp = await repository.update(_id, req.body);

    if (!resp.result) return res.status(400).json(resp.error);

    return res.status(200).send(`${name} updated succesfully!`);
  },

  destroy: async (req, res) => {
    const { _id } = req.params;

    const resp = await repository.destroy(_id);
    if (!resp.result) return res.status(400).json(resp.error);

    return res.status(200).send(`${name} deleted succesfully!`);
  },

  destroyMany: async (req, res) => {
    const resp = await repository.destroyMany(req.body);
    if (!resp.result) return res.status(400).json(resp.error);

    return res.status(200).send(`${name} deleted succesfully!`);
  },

  destroyAll: async (req, res) => {
    const resp = await repository.destroyAll();
    if (!resp.result) return res.status(400).json(resp.error);

    return res.status(200).send(`${name} collection deleted succesfully!`);
  },
};
