module.exports = class ValidationError extends Error {
  constructor(type, message) {
    super();
    this.type = type;
    this.message = message;
  }
};
