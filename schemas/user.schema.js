const Joi = require('joi');

const id = Joi.string();
const name = Joi.string();
const email = Joi.string().email();
const password = Joi.string().min(6);

const createUserSchema = Joi.object({
  id,
  name: name.required(),
  email: email.required(),
  password: password.required(),
});

module.exports = { createUserSchema };
