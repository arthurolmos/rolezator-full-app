class ValueNotSupported extends Error {
  constructor(entity) {
    super();

    this.message = `${entity} not supported!`;
  }
}

module.exports = ValueNotSupported;
