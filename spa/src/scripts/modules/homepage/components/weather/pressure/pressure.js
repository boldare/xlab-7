import React,{ PropTypes } from 'react';
import {Row, Col} from 'react-materialize';
import PressureIcon from 'babel!svg-react!./pressure.svg?name=PressureIcon';

const Pressure = ({ pressure }) => {
  return (
    <Row className="weather-info--container valign-wrapper">
      <Col s={6} className="valign icon">
        <PressureIcon />
      </Col>
      <Col s={6} className="valign">
        <p className="weather-info--text">
            { pressure.value || '-' } hPa</p>
      </Col>
    </Row>
  )
}

Pressure.propTypes = {
  pressure: PropTypes.object.isRequired
}

export default Pressure
