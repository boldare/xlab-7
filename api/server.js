const config = require('./config/default');

const pollutionDataFetcher = require('./services/pollution-data-fetcher');
const localSensorPollutionDataFetcher = require('./services/local-sensor-pollution-data-fetcher');

var admin = require("firebase-admin");
var cron = require('node-cron');

admin.initializeApp({
  credential: admin.credential.cert("./config/xlab-smog.json"),
  databaseURL: "https://xlab-smog.firebaseio.com"
});

function saveToFirebase(city, response) {
  admin.database().ref(city.key).once('value').then(function(snapshot) {
    var ref = admin.database().ref(city.key);

    if (!snapshot.val()) {
      ref.set({
        name: response.name,
        values: {}
      });
    }

    var newRef = ref.child('values').push();

    newRef.set(response);
  });
}

cron.schedule('*/30 * * * * *', function(){
  config.cities.forEach((city) => {
    if ('gliwice-sensor' == city.key) {
      localSensorPollutionDataFetcher
        .fetch()
        .then(function (response) {
          saveToFirebase(city, response);
        });

      return;
    }

    pollutionDataFetcher
      .fetch(city.latitude, city.longitude)
      .then(function (response) {
        saveToFirebase(city, response);
      });
  })
});

var allowCrossDomain = function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'x-access-token, Content-Type, Authorization, Content-Length, X-Requested-With');

    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    }
    else {
        next();
    }
};

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/json'}));
app.use(allowCrossDomain);

app.listen(3000, () => {
    console.log('listening on: ', 3000)
});

const IndexController = require('./controller/index');

app
  .route('/api/index')
  .get(IndexController.helloWorld);

module.exports = app;
