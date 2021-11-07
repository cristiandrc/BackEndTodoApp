const express = require('express');
const routerApp = require('./routes/');
const { config } = require('./config');
require('./lib/mongo').connect();

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
