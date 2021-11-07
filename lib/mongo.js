const { config } = require('../config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const connect = async () => {
  await mongoose.connect(config.urlDb, { useNewUrlParser: true });
  console.log('[DB] conectada con exito');
};

module.exports = { connect };
