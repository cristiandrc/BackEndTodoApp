const express = require('express');
const routerApp = require('./routes/');

//import err middleware
const {
  logErrors,
  errorHandler,
  notFoundHandler,
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
app.use(errorHandler);

app.listen(3000, () => console.log('listen http://localhost:3000'));
