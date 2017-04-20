const fetch = require('node-fetch');
const url = require('url');

class WaqiPollutionDataFetcher {
  constructor(waqiConfig) {
    this.config = waqiConfig;
  }

  fetch(city) {
    let apiUrl = url.parse(url.resolve(this.config.baseUrl, `feed/@${city.id}/`));
    apiUrl.query = {token: this.config.token};

    return fetch(url.format(apiUrl))
        .then((response) => response.text())
        .then((body) => this.transform(JSON.parse(body)));
  }

  supports(city) {
    return ('waqi' == city.type);
  }

  transform(response) {
    let data = {};

    data.name = response.data.city ? response.data.city.name : null;
    data.pm25 = response.data.iaqi.pm25 ? response.data.iaqi.pm25.v : null;
    data.pm10 = response.data.iaqi.pm10 ? response.data.iaqi.pm10.v : null;
    data.temp = response.data.iaqi.pm10 ? response.data.iaqi.t.v : null;
    data.pressure = response.data.iaqi.pm10 ? response.data.iaqi.p.v : null;
    data.date = Date.now();

    return data;
  }
}

module.exports = WaqiPollutionDataFetcher;
