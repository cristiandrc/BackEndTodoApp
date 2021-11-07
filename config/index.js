require('dotenv').config();

const config = {
  port: process.env.PORT,
  urlDb: process.env.URI_DB,
};

module.exports = { config };
