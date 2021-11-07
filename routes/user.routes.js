const express = require('express');
const UserService = require('../services/user.service');

const { createUserSchema } = require('../schemas/user.schema');

const validateHandler = require('../middlewares/validator.handler');

const service = new UserService();

const router = express.Router();

router.get('/', (req, res) => {
  const task = service.find();
  res.status(200).json(task);
});

router.post('/', validateHandler(createUserSchema), (req, res) => {
  const { body } = req;
  const newTask = service.create(body);
  res.status(201).json(newTask);
});

module.exports = router;
