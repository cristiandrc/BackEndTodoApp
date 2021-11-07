const express = require('express');
const UserService = require('../services/user.service');

const service = new UserService();

const router = express.Router();

router.get('/', (req, res) => {
  const task = service.find();
  res.status(200).json(task);
});

router.post('/', (req, res) => {
  const { body } = req;
  const newTask = service.create(body);
  res.json(newTask);
});

module.exports = router;
