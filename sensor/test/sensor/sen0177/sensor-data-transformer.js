let chai = require('chai');
let expect = chai.expect;

describe('SensorDataTransformer', () => {
  const SensorDataTransformer = require('../../../services/sensor/sen0177/sensor-data-transformer');

  it('Should properly convert integer values', () => {
    let parseInt = SensorDataTransformer.parseInt32;

    expect(parseInt([0, 0])).to.be.equals(0);
    expect(parseInt([0, 10])).to.be.equals(10);
    expect(parseInt([0, 128])).to.be.equals(128);
    expect(parseInt([1, 0])).to.be.equals(256);
    expect(parseInt([1, 1])).to.be.equals(257);
    expect(parseInt([34, 36])).to.be.equals(8740);
  });

  it('Should properly calculate checksum', () => {
    let frame = [66, 77, 0, 28, 0, 36, 0, 71, 0, 77, 0, 0, 0, 0, 0, 0, 2, 254, 1, 25, 0, 131, 0, 65, 0, 22, 0, 13, 0, 0, 3, 100]
    expect(SensorDataTransformer.validateChecksum(frame)).to.be.true;
    // Break the checksum
    frame[31] = 99;
    expect(SensorDataTransformer.validateChecksum(frame)).to.be.false;
  });

  it('Should properly read values from sensor\'s frame', () => {
    let frame = [66, 77, 0, 28, 0, 45, 0, 89, 0, 96, 0, 0, 0, 0, 0, 0, 3, 200, 1, 106, 0, 172, 0, 78, 0, 35, 0, 15, 0, 0, 3, 243];

    const transformed = SensorDataTransformer.transform(frame);

    expect(transformed.pm1).to.be.equals(45);
    expect(transformed.pm25).to.be.equals(89);
    expect(transformed.pm10).to.be.equals(96);
  });
});
