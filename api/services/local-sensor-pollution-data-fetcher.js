var fetch = require('node-fetch');
var config = require('../config/default');

class LocalSensorPollutionDataFetcher {
  fetch() {
    return fetch(config.localSensorApi)
        .then((response) => response.text())
        .then((body) => this.transform(JSON.parse(body)));
  }

  transform(response) {
    var data = {};

    data.name = 'Xsolve HQ';
    data.pm25 = response[0].value ? response[0].value : null;
    data.pm10 = response[1].value ? response[1].value : null;
    data.pm1 = response[2].value ? response[2].value : null;
    data.date = response[3].date;

    return data;
  }
}

module.exports = new LocalSensorPollutionDataFetcher();
