const Joi = require('joi');

const id = Joi.string();
const userId = Joi.string();
const task = Joi.string();

const createTaskSchema = Joi.object({
  id,
  userId,
  task: task.required(),
});

module.exports = { createTaskSchema };
