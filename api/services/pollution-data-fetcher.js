var fetch = require('node-fetch');
var config = require('../config/default');

class PollutionDataFetcher {
  fetch(id) {
    const url = `${config.api}/feed/@${id}/?token=${config.token}`;

    /* Without Arrow function
    var that = this;

    return fetch(url)
        .then(function(res) {
            return res.text();
        }).then(function(body) {
            return that.transform(JSON.parse(body));
        });
    */

    // With arrow function this is object on called method
    return fetch(url)
        .then((response) => response.text())
        .then((body) => this.transform(JSON.parse(body)));
  }

  transform(response) {
    var data = {};

    data.name = response.data.city ? response.data.city.name : null;
    data.pm25 = response.data.iaqi.pm25 ? response.data.iaqi.pm25.v : null;
    data.pm10 = response.data.iaqi.pm10 ? response.data.iaqi.pm10.v : null;
    data.temp = response.data.iaqi.pm10 ? response.data.iaqi.t.v : null;
    data.pressure = response.data.iaqi.pm10 ? response.data.iaqi.p.v : null;
    data.date = Date.now();

    return data;
  }
}

module.exports = new PollutionDataFetcher();
