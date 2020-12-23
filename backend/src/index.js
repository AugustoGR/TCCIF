//const { json } = require('express');
const express = require('express'); //it's working ?
const app = express();
const  routes = require('./routes');

app.use(express.json());
app.use(routes);
app.listen(3333);


