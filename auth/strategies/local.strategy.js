const { Strategy } = require('passport-local');
const authService = require('../../services/auth.service');

const service = new authService();

const LocalStrategy = new Strategy(
  {
    //para modificar el nombre por defecto que tiene passport para los req
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
    try {
      const user = await service.getUser(email, password);
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
);

module.exports = LocalStrategy;
