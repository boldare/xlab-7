const SensorDataTransformer = require('./sensor-data-transformer');
const responseDataStorage = require('./response-data-storage');
const firebase = require('./firebase-configuration');
const sensorDataTransformer = new SensorDataTransformer();

class SensorDataCollector {
  collect() {
    let response = [];

    firebase.database().ref('/').on('value', function(snapshot, prev) {
      const data = snapshot.val();
      if (!data) return;

      var transformedData = sensorDataTransformer.transform(data);

      if (SensorDataTransformer.STATUS_OK == transformedData.status) {
        response.push(transformedData);

        if (response.length >= 3) {
          response.push({
            date: Date.now()
          });

          responseDataStorage.setData(response);
          response = [];
        }
      }
    });
  }
}

module.exports = new SensorDataCollector();
