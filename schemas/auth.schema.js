const Joi = require('joi');

const password = Joi.string().min(6);
const email = Joi.string().email();
const token = Joi.string();

const updateAuthSchema = Joi.object({
  password: password.required(),
  newPassword: password.required(),
});

const recoveryAuthSchema = Joi.object({
  email: email.required(),
});

const passwordAuthSchema = Joi.object({
  newPassword: password.required(),
  token: token.required(),
});
module.exports = { updateAuthSchema, recoveryAuthSchema, passwordAuthSchema };
