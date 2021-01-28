class NotFound extends Error {
  constructor(entity) {
    super();

    this.message = `${entity} not found!`;
  }
}

module.exports = NotFound;
