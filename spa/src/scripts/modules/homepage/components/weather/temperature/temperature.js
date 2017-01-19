import React,{ PropTypes } from 'react';
import {Row, Col} from 'react-materialize';
import TemperatureIcon from 'babel!svg-react!./temperature-icon.svg?name=TemperatureIcon';

const Temperature = ({ temperature }) => {
  return (
    <Row className="weather-info--container valign-wrapper">
      <Col s={6} className="valign icon">
        <TemperatureIcon />
      </Col>
      <Col s={6} className="valign">
        <p className="weather-info--text">
            { temperature.value || '-'} °C
        </p>
      </Col>
    </Row>
  )
}

Temperature.propTypes = {
  temperature: PropTypes.object.isRequired
}

export default Temperature
