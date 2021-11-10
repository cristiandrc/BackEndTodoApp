const Joi = require('joi');

const password = Joi.string().min(6);
const email = Joi.string().email();

const updateAuthSchema = Joi.object({
  password: password.required(),
  newPassword: password.required(),
});

const recoveryAuthSchema = Joi.object({
  email: email.required(),
});
module.exports = { updateAuthSchema, recoveryAuthSchema };
