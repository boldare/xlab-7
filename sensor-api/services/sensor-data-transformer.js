class SensorDataTransformer {
  transform(data) {
    const regexExpression = /(^PM[0-9. ]{1,3}):(.*)ug\/m3/;
    const match = data.match(regexExpression);

    if (null != match) {
      return {
        status: SensorDataTransformer.STATUS_OK,
        indicator: match[1].replace(/\s/g, ''),
        value: parseInt(match[2]),
        unit: 'ug/m3'
      };
    }

    return {
      status: SensorDataTransformer.STATUS_ERROR
    };
  }
}

SensorDataTransformer.STATUS_OK = 'ok';
SensorDataTransformer.STATUS_ERROR = 'error';

module.exports = SensorDataTransformer;
