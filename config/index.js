require('dotenv').config();

const config = {
  port: process.env.PORT,
  urlDb: process.env.URI_DB,
  jwtSecretLogin: process.env.JWT_SECRET_LOGIN,
};

module.exports = { config };
