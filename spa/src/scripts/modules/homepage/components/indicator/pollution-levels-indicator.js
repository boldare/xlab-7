import React,{ PropTypes } from 'react';
import { Row, Col } from 'react-materialize';

class PollutionLevelsIndicator extends React.Component {
  determineClass(levels, pollutionValue) {
    return levels.find(function (pollutionLevel) {
      return pollutionValue >= pollutionLevel.lower && (pollutionValue <= pollutionLevel.upper || !pollutionLevel.upper);
    });
  }

  render() {
    const { indicator, levels, pollutionValue, label } = this.props;
    const level = this.determineClass(levels, pollutionValue);

    let content = <Row className={`${indicator} valign-wrapper grey darken-4`}>
      <Col s={12} className="valign center-align">
        <b>Dla tego miasta nie ma odczytów wskaźnika {indicator}</b>
      </Col>
    </Row>

    if (pollutionValue) {
      content = <Row className={`${indicator} valign-wrapper ${level.class}`}>
        <Col s={12} className="valign center-align">
          {label} <br />
          <b className="pollution--strong-value">{pollutionValue} µg/m3</b> <br />
          Ocena jakości powietrza: <br />
          <b className="pollution--strong-value">{level.label}</b>
        </Col>
      </Row>
    }

    return (
      <div>
        {content}
      </div>
    )
  }
}

PollutionLevelsIndicator.propTypes = {
  label: PropTypes.string.isRequired,
  pollutionValue: PropTypes.number,
  indicator: PropTypes.string.isRequired,
  levels: PropTypes.array
}

export default PollutionLevelsIndicator
