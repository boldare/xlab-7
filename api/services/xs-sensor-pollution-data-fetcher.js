var fetch = require('node-fetch');

class XSolveSensorPollutionDataFetcher {
  fetch(city) {
    return fetch(city.url)
        .then((response) => response.text())
        .then((body) => this.transform(JSON.parse(body)));
  }

  supports(city) {
    return ('xsolve' == city.type);
  }

  transform(response) {
    let data = {};

    data.name = response.sensorName;
    data.pm25 = response.values.pm25 ? response.values.pm25 : null;
    data.pm10 = response.values.pm10 ? response.values.pm10 : null;
    data.pm1 = response.values.pm1 ? response.values.pm1 : null;
    data.date = response.time;

    return data;
  }
}

module.exports = XSolveSensorPollutionDataFetcher;
