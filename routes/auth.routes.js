const express = require('express');
const passport = require('passport');
const router = express.Router();

const AuthService = require('../services/auth.service');
const service = new AuthService();

const validateHandler = require('../middlewares/validator.handler');
const { updateAuthSchema } = require('../schemas/auth.schema');

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

module.exports = router;
