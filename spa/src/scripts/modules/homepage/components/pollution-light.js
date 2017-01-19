import React,{ PropTypes } from 'react';
import { Row, Col } from 'react-materialize';

const PollutionLight = ({ type, pollutionValue }) => {
  let label;
  let pollutionLevelClass;
  let pollutionLevelClasses = {
    veryGood: 'light-green accent-4',
    good: 'light-green accent-2',
    moderate: 'yellow accent-3',
    sufficient: 'orange accent-3',
    bad: 'deep-orange accent-3',
    veryBad: 'red accent-4',
    unkown: 'grey'
  }

  function setPollutionLevelForPm25() {
    if (pollutionValue >= 0 && pollutionValue <= 12) {
      pollutionLevelClass = pollutionLevelClasses.veryGood;

      return;
    }

    if (pollutionValue >= 13 && pollutionValue <= 36) {
      pollutionLevelClass = pollutionLevelClasses.good;

      return;
    }

    if (pollutionValue >= 37 && pollutionValue <= 60) {
      pollutionLevelClass = pollutionLevelClasses.moderate;

      return;
    }

    if (pollutionValue >= 61 && pollutionValue <= 84) {
      pollutionLevelClass = pollutionLevelClasses.sufficient;

      return;
    }

    if (pollutionValue >= 85 && pollutionValue <= 120) {
      pollutionLevelClass = pollutionLevelClasses.bad;

      return;
    }

    if (pollutionValue > 120) {
      pollutionLevelClass = pollutionLevelClasses.veryBad;

      return;
    }

    pollutionLevelClass = pollutionLevelClasses.unkown;
  }

  function setPollutionLevelForPm10() {
    if (pollutionValue >= 0 && pollutionValue <= 20) {
      pollutionLevelClass = pollutionLevelClasses.veryGood;

      return;
    }

    if (pollutionValue >= 21 && pollutionValue <= 60) {
      pollutionLevelClass = pollutionLevelClasses.good;

      return;
    }

    if (pollutionValue >= 61 && pollutionValue <= 100) {
      pollutionLevelClass = pollutionLevelClasses.moderate;

      return;
    }

    if (pollutionValue >= 101 && pollutionValue <= 140) {
      pollutionLevelClass = pollutionLevelClasses.sufficient;

      return;
    }

    if (pollutionValue >= 141 && pollutionValue <= 200) {
      pollutionLevelClass = pollutionLevelClasses.bad;

      return;
    }

    if (pollutionValue > 200) {
      pollutionLevelClass = pollutionLevelClasses.veryBad;

      return;
    }

    pollutionLevelClass = pollutionLevelClasses.unkown;
  }

  switch (type) {
    case 'PM_25':
      label = 'Poziom zanieczyszczenia pyłem PM 2.5';
      setPollutionLevelForPm25();
      break;
    case 'PM_10':
      label = 'Poziom zanieczyszczenia pyłem PM 10';
      setPollutionLevelForPm10();
      break;
    default:
      label = 'Nieokreślony typ kontrolki';
  }

  let className = type.toLowerCase() + ' black-text valign-wrapper ' + pollutionLevelClass;

  return (
    <Row className={className}>
      <Col s={12} className="valign center-align">{label}</Col>
      <Col s={12}>{ pollutionValue ? `${pollutionValue} μm/m³` : 'Brak danych' } </Col>
    </Row>
  )
}

PollutionLight.propTypes = {
  type: PropTypes.string.isRequired,
  pollutionValue: PropTypes.number.isRequired
}

export default PollutionLight
