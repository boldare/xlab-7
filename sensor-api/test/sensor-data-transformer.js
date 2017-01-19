let chai = require('chai');
let expect = chai.expect;

describe('SensorDataTransformer', () => {
  const SensorDataTransformer = require('../services/sensor-data-transformer');
  const sensorDataTransformer = new SensorDataTransformer();

  it('Should transform data PM2.5: 100  ug/m3', (done) => {
    const transformed = sensorDataTransformer.transform('PM2.5: 100  ug/m3');

    expect(transformed.indicator).to.be.equals('PM2.5');
    expect(transformed.unit).to.be.equals('ug/m3');
    expect(transformed.value).to.be.equals(100);

    done();
  });

  it('Should transform data PM1.0: 100  ug/m3', (done) => {
    const transformed = sensorDataTransformer.transform('PM1.0: 100  ug/m3');

    expect(transformed.indicator).to.be.equals('PM1.0');
    expect(transformed.unit).to.be.equals('ug/m3');
    expect(transformed.value).to.be.equals(100);

    done();
  });

  it('Should transform data PM1 0: 100  ug/m3', (done) => {
    const transformed = sensorDataTransformer.transform('PM1 0: 100  ug/m3');

    expect(transformed.indicator).to.be.equals('PM10');
    expect(transformed.unit).to.be.equals('ug/m3');
    expect(transformed.value).to.be.equals(100);

    done();
  });
});
