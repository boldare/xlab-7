class SensorDataStorage {
  constructor() {
    this.buffer = {};
  }

  setData(data) {
    this.buffer = data;
  }

  getData() {
    return this.buffer;
  }
}

module.exports = new SensorDataStorage();
