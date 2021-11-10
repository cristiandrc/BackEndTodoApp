const Joi = require('joi');

const password = Joi.string().min(6);

const updateAuthSchema = Joi.object({
  password: password.required(),
  newPassword: password.required(),
});

module.exports = { updateAuthSchema };
