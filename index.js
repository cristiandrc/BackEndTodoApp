const express = require('express');
const routerApp = require('./routes/');
const passport = require('passport');
const { config } = require('./config');
require('./lib/mongo').connect();

//para user el passport
require('./auth');

//import err middleware
const {
  logErrors,
  errorHandler,
  notFoundHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');

//create app
const app = express();

//parcel JSON
app.use(express.json());

//inicializar el passport
app.use(passport.initialize());

routerApp(app);

//404 notFound
app.use(notFoundHandler);

//middlewares de error
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(config.port, () =>
  console.log(`listen http://localhost:${config.port}`)
);
