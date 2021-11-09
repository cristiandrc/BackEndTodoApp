const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const TaskService = require('../services/task.service');

const validateHandler = require('../middlewares/validator.handler');
const {
  createTaskSchema,
  updateUserSchema,
} = require('../schemas/task.schema');

const service = new TaskService();
const router = express.Router();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const userId = req.user.sub;
      if (!userId) next(boom.badRequest());

      const userTasks = await service.find(userId);
      res.status(200).json(userTasks);
    } catch (err) {
      next(boom.badRequest(err));
    }
  }
);

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
