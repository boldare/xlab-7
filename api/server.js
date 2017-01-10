const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('config');
const allowCrossDomain = require('./headers/cross-domain');

const IndexController = require('./controller/index');

const API_BASE = "/api/";
const INDEX_BASE = API_BASE + "index";

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/json'}));
app.use(allowCrossDomain);

let port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('listening on: ', port)
});

app.route(INDEX_BASE)
    .get(IndexController.helloWorld);

module.exports = app;
