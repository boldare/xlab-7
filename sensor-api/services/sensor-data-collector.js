const SensorDataTransformer = require('./sensor-data-transformer');
const responseDataStorage = require('./response-data-storage');
const firebase = require('./firebase-configuration');
const sensorDataTransformer = new SensorDataTransformer();

class SensorDataCollector {
  collect() {
    // Write service which will pass all tests in test/sensor.js file
    firebase.database().ref('/').on('value', function(snapshot, prev) {
      const data = snapshot.val();
      console.log("Data from sensor: " + data);
    });
  }
}

module.exports = new SensorDataCollector();
