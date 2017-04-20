const SerialPort = require('serialport');
const sensorDataTransformer = require('./sensor-data-transformer');
const sensorDataStorage = require('../../sensor-data-storage');
const FrameWithHeaderParser = require('../../frame-with-header-parser');

class SensorDataCollector {
  constructor(sensorConfig) {
    this.frameHeader = [66, 77];
    this.frameLen = 32;
    this.sensorConfig = sensorConfig;
  }

  collect() {
    const port = new SerialPort(this.sensorConfig.serialPort, {
      parser: FrameWithHeaderParser.getParser(this.frameHeader, this.frameLen)
    });

    var sensorConfig = this.sensorConfig;

    port.on('data', function (data) {
      let transformedData = sensorDataTransformer.transform(data);

      if (transformedData != null) {
        let sensorData = {
          values: transformedData,
          time: Date.now(),
          sensorName: sensorConfig.sensorName,
          sensorModel: sensorConfig.sensorModel
        };
        sensorDataStorage.setData(sensorData);
      }
    });
  }
}

module.exports = SensorDataCollector;
