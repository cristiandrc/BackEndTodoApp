const express = require('express');

const userRoutes = require('./user.routes');
const taskRouter = require('./task.routes');
const authRouter = require('./auth.routes');

const routerApp = (app) => {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/user', userRoutes);
  router.use('/task', taskRouter);
  router.use('/auth', authRouter);
};

module.exports = routerApp;
