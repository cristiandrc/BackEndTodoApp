const express = require('express');
const routerApp = require('./routes/');

const app = express();

//parcel JSON
app.use(express.json());

routerApp(app);

app.listen(3000, () => console.log('listen http://localhost:3000'));
