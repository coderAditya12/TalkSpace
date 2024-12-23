const errorHandler = (res, statusCode, message) => {
  res.status(statusCode).json(message);
};

module.exports = errorHandler;
