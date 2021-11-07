const express = require('express');
const TaskService = require('../services/task.service');

const service = new TaskService();
const router = express.Router();

router.get('/', (req, res) => {
  const { userId } = req.body;
  const userTasks = service.find(userId);
  res.json(userTasks);
});

router.post('/', (req, res) => {
  const { body } = req;
  const newTask = service.create(body);
  res.json(newTask);
});

module.exports = router;
