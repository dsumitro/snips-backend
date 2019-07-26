/**
 * Error object containing user-friendly message and
 * an HTTP status code
 * @param {string} message user-friendly error message that can eb displayed in the front end
 * @param {*} status HTTP status code
 */
class httpStatusError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.status = status;
  }
}
module.exports = httpStatusError;
