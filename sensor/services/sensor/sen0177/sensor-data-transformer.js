class SensorDataTransformer {
  transform(data) {
    if (this.validateChecksum(data)) {
      return {
        pm1: this.getPM1(data),
        pm25: this.getPM25(data),
        pm10: this.getPM10(data)
      };
    }

    return null;
  }

  validateChecksum(data) {
    let dataArray = data.slice(0, -2);
    let receiveSum = dataArray.reduce((receiveSum, item) => receiveSum + item);
    let checkSum = this.parseInt32(data.slice(-2));

    return (checkSum == receiveSum);
  }

  parseInt32(arr) {
    return (arr[0] << 8) + arr[1];
  }

  getPM1(data) {
    return this.parseInt32(data.slice(4, 6));
  }

  getPM25(data) {
    return this.parseInt32(data.slice(6, 8));
  }

  getPM10(data) {
    return this.parseInt32(data.slice(8, 10));
  }
}

module.exports = new SensorDataTransformer();
