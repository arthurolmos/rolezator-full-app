class FirebaseError extends Error {
  constructor(message) {
    super();

    this.message = message;
  }
}

module.exports = FirebaseError;
