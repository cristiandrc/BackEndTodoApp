const express = require('express');
const boom = require('@hapi/boom');
const TaskService = require('../services/task.service');

const validateHandler = require('../middlewares/validator.handler');
const {
  createTaskSchema,
  updateUserSchema,
} = require('../schemas/task.schema');

const service = new TaskService();
const router = express.Router();

router.get('/', async (req, res, next) => {
  const { userId } = req.body;
  if (!userId) next(boom.badRequest());

  const userTasks = await service.find(userId);
  res.status(200).json(userTasks);
});

router.post('/', validateHandler(createTaskSchema), async (req, res, next) => {
  try {
    const { body } = req;
    const newTask = await service.create(body);
    res.status(201).json(newTask);
  } catch (err) {
    next(err);
  }
});

router.patch('/', validateHandler(updateUserSchema), async (req, res, next) => {
  try {
    const data = req.body;
    const taskUpdate = await service.update(data);
    res.json(taskUpdate);
  } catch (err) {
    next(err);
  }
});

router.delete(
  '/',
  validateHandler(updateUserSchema),
  async (req, res, next) => {
    try {
      const data = req.body;
      const taskDeleted = await service.delete(data);
      res.json(taskDeleted);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
