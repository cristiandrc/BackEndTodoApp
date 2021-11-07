const express = require('express');
const TaskService = require('../services/task.service');

const validateHandler = require('../middlewares/validator.handler');
const { createTaskSchema } = require('../schemas/task.schema');

const service = new TaskService();
const router = express.Router();

router.get('/', (req, res) => {
  const { userId } = req.body;
  const userTasks = service.find(userId);
  res.json(userTasks);
});

router.post('/', validateHandler(createTaskSchema), (req, res) => {
  const { body } = req;
  const newTask = service.create(body);
  res.status(201).json(newTask);
});

module.exports = router;
