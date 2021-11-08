const { Strategy } = require('passport-local');
const authService = require('../../services/auth.service');

const service = new authService();

const LocalStrategy = new Strategy(async (username, password, done) => {
  try {
    const user = await service.getUser(username, password);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = LocalStrategy;
