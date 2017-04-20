const config = require('./config/config');
const PollutionDataFetcher = require('./services/pollution-data-fetcher');

const pollutionDataFetcher = new PollutionDataFetcher(config);
const firebaseAdmin = require("firebase-admin");
const cron = require('node-cron');

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert("./config/xlab-smog.json"),
  databaseURL: config.firebase.databaseUrl
});

const saveToFirebase = (city) => (response) => {
  firebaseAdmin.database().ref(city.key).once('value').then(function(snapshot) {
    var ref = firebaseAdmin.database().ref(city.key);

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

function fetchData() {
  config.cities.forEach((city) => {
    pollutionDataFetcher.fetch(city).then(saveToFirebase(city))
  });
}

fetchData();

setInterval(fetchData, config.apiInterval * 1000)
