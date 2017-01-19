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
      .fetch(city.id)
      .then(function (response) {
        saveToFirebase(city, response);
      });
  })
});
