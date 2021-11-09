const { Strategy, ExtractJwt } = require('passport-jwt');
const { config } = require('../../config');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecretLogin,
};

const JwtStrategy = new Strategy(options, (payload, done) => {
  console.log(`object`, payload);
  return done(null, payload);
});

module.exports = JwtStrategy;
