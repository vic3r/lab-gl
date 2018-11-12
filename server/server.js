require('dotenv').load();

const config = require('./config');
const bodyParser = require('body-parser');
const routes = require('./app/routes/index');
const express = require('express');

const app = new express();
routes(app);
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const server = app.listen(config.port);
const host = server.address().address;
const port = server.address().port;

console.log(`The server is running at http://${host}: ${port}`);
