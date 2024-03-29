const boom = require('@hapi/boom');

const logErrors = (err, req, res, next) => {
  console.log('LogErr');
  console.error(err);
  next(err);
};

const errorHandler = (err, req, res, next) => {
  console.log('errHandle');
  console.log(err);
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
};

const boomErrorHandler = (err, req, res, next) => {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  next();
};

const notFoundHandler = (req, res) => {
  const {
    output: { statusCode, payload },
  } = boom.notFound();
  res.status(statusCode).json(payload);
};

module.exports = { logErrors, errorHandler, notFoundHandler, boomErrorHandler };
