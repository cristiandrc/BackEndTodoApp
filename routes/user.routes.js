const express = require('express');
const boom = require('@hapi/boom');
const UserService = require('../services/user.service');

const { createUserSchema } = require('../schemas/user.schema');

const validateHandler = require('../middlewares/validator.handler');

const service = new UserService();

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const task = await service.find();
    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
});

router.post('/', validateHandler(createUserSchema), async (req, res, next) => {
  try {
    const { body } = req;
    const newUser = await service.create(body);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
