const express = require('express');
const passport = require('passport');
const router = express.Router();

const AuthService = require('../services/auth.service');
const service = new AuthService();

const validateHandler = require('../middlewares/validator.handler');
const {
  updateAuthSchema,
  recoveryAuthSchema,
  passwordAuthSchema,
} = require('../schemas/auth.schema');
const { json } = require('express');

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  (req, res, next) => {
    try {
      const user = req.user;
      res.json(service.signToken(user));
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/change-password',
  validateHandler(updateAuthSchema),
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const userId = req.user.sub;
      const { password, newPassword } = req.body;
      const isUpdate = await service.changePassword(
        userId,
        password,
        newPassword
      );

      res.json(isUpdate);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/recovery',
  validateHandler(recoveryAuthSchema),
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const isSend = await service.sendRecovery(email);
      res.json(isSend);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/recovery-password',
  validateHandler(passwordAuthSchema),
  async (req, res, next) => {
    try {
      const { token, newPassword } = req.body;
      const rta = await service.recoveryPassword(token, newPassword);

      res.json(rta);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
