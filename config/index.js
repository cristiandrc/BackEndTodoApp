require('dotenv').config();

const config = {
  port: process.env.PORT,
  urlDb: process.env.URI_DB,
  jwtSecretLogin: process.env.JWT_SECRET_LOGIN,
  jwtSecretRecovery: process.env.JWT_SECRET_RECOVERY,
  passwordEmail: process.env.PASSWORD_EMAIL,
  email: process.env.EMAIL,
};

module.exports = { config };
