const Joi = require('joi');

const id = Joi.string();
const userId = Joi.string();
const task = Joi.string();
const data = Joi.object();
const completed = Joi.boolean();

const createTaskSchema = Joi.object({
  id,
  userId,
  task: task.required(),
});

const updateUserSchema = Joi.object({
  id: id.required(),
  data: {
    completed,
    task,
  },
});

module.exports = { createTaskSchema, updateUserSchema };
