const WaqiPollutionDataFetcher = require('./waqi-pollution-data-fetcher');
const XSolveSensorPollutionDataFetcher = require('./xs-sensor-pollution-data-fetcher');

class PollutionDataFetcher {
  constructor(config) {
    this.config = config;
    this.fetchers = [];
    this.fetchers.push(new WaqiPollutionDataFetcher(this.config.waqiApi));
    this.fetchers.push(new XSolveSensorPollutionDataFetcher());
  }

  fetch(city) {
    return this.fetchers.find(fetcher => fetcher.supports(city))
      .fetch(city);
  }
}

module.exports = PollutionDataFetcher;
