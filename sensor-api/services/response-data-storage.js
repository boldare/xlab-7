class ResponseDataStorage {
  constructor() {
    this.buffor = {};
  }

  setData(data) {
    this.buffor = data;
  }

  getData() {
    return this.buffor;
  }
}

module.exports = new ResponseDataStorage();
