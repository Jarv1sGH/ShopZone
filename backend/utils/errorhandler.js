class ErrorHandler extends Error {
  // Error is an inbuilt class of node
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor); //captureStackTrace is a method of Error class
  }
}
module.exports = ErrorHandler;
