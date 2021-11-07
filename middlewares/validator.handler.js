const boom = require('@hapi/boom');

const validatorHandler = (schema, property = 'body') => {
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false }); //{ abortEarly: false } es para que no indique error por error
    if (error) {
      next(boom.badRequest(error));
    }

    next();
  };
};

module.exports = validatorHandler;
