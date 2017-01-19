const SerialPort = require('serialport');
const firebase = require("firebase-admin");

const port = new SerialPort('/dev/ttyACM0', {
  parser: SerialPort.parsers.readline('\n')
});

firebase.initializeApp({
  credential: firebase.credential.cert("./config/xlab-sensor.json"),
  databaseURL: "https://xlab-sensor.firebaseio.com"
});

const reference = firebase.database().ref('/');
port.on('data', function (data) {
  reference.set(data);
  console.log('Sent data: ' + data);
});
