import React,{ PropTypes } from 'react';
import {Row, Col} from 'react-materialize';
import Pressure from './pressure/pressure';
import Temperature from './temperature/temperature';

const Weather = ({ pollutionValue }) => {
  return (
      <Row>
        <Col s={6}>
          <Temperature temperature={{
            value: pollutionValue.temp,
            unit: pollutionValue.temp_unit
          }} />
        </Col>
        <Col s={6}>
          <Pressure pressure={{
            value: pollutionValue.pressure,
            unit: pollutionValue.pressure_unit
          }} />
        </Col>
        <Col s={12}>
          <div className="divider"></div>
        </Col>
      </Row>
  )
}

Weather.propTypes = {
  pollutionValue: PropTypes.object.isRequired
}

export default Weather
