const express = require('express');
const routes = express.Router();
const subController = require('./controllers/SubController');

routes.post('/substituicoes', subController.create);
routes.get('/substituicoes', subController.index);
module.exports = routes;