import React,{ PropTypes } from 'react';
import { Row, Col } from 'react-materialize';
import PollutionLevelsIndicator from './pollution-levels-indicator';

class Pm10PollutionLevelsIndicator extends React.Component {
  constructor() {
    super();

    this.levels = [
      { lower: 0, upper: 20, class: 'black-text light-green', key: 'veryGood', label: 'Dobra' },
      { lower: 21, upper: 60, class: 'black-text light-green lighten-2', key: 'good', label: 'Dobra' },
      { lower: 61, upper: 100, class: 'black-text lime', key: 'moderate', label: 'Umiarkowana' },
      { lower: 101, upper: 140, class: 'black-text amber lighten-1', key: 'sufficient', label: 'Dostateczna' },
      { lower: 141, upper: 200, class: 'black-text grey', key: 'bad', label: 'Zła' },
      { lower: 200, class: 'grey darken-4', key: 'veryBad', label: 'Bardzo zła' }
    ];
  }

  render() {
    return (
      <PollutionLevelsIndicator
        pollutionValue={this.props.pollutionValue}
        levels={this.levels}
        label='Poziom zanieczyszczenia pyłem PM 10'
        indicator='pm_10' />
    )
  }
}

Pm10PollutionLevelsIndicator.propTypes = {
  pollutionValue: PropTypes.number
}

export default Pm10PollutionLevelsIndicator
