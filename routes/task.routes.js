const express = require('express');
const TaskService = require('../services/task.service');

const validateHandler = require('../middlewares/validator.handler');
const { createTaskSchema } = require('../schemas/task.schema');

const service = new TaskService();
const router = express.Router();

router.get('/', async (req, res) => {
  const { userId } = req.body;
  const userTasks = await service.find(userId);
  res.status(200).json(userTasks);
});

router.post('/', validateHandler(createTaskSchema), async (req, res) => {
  const { body } = req;
  const newTask = await service.create(body);
  res.status(201).json(newTask);
});

module.exports = router;
