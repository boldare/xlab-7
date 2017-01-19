const firebase = require("firebase-admin");

firebase.initializeApp({
  credential: firebase.credential.cert("./config/xlab-sensor.json"),
  databaseURL: "https://xlab-sensor.firebaseio.com"
});

module.exports = firebase;
