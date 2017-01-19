import React,{ PropTypes } from 'react';
import { Row, Col } from 'react-materialize';
import PollutionLevelsIndicator from './pollution-levels-indicator';

class Pm25PollutionLevelsIndicator extends React.Component {
  constructor() {
    super();

    this.levels = [
      { lower: 0, upper: 12, class: 'black-text light-green', key: 'veryGood', label: 'Bardzo dobra' },
      { lower: 13, upper: 36, class: 'black-text light-green lighten-2', key: 'good', label: 'Dobra' },
      { lower: 37, upper: 60, class: 'black-text lime', key: 'moderate', label: 'Umiarkowana' },
      { lower: 61, upper: 84, class: 'black-text amber lighten-1', key: 'sufficient', label: 'Dostateczna' },
      { lower: 85, upper: 120, class: 'black-text grey', key: 'bad', label: 'Zła' },
      { lower: 120, class: 'grey darken-4', key: 'veryBad', label: 'Bardzo zła' }
    ];
  }

  render() {
    return (
      <PollutionLevelsIndicator
        pollutionValue={this.props.pollutionValue}
        levels={this.levels}
        label='Poziom zanieczyszczenia pyłem PM 2.5'
        indicator='pm_25' />
    )
  }
}

Pm25PollutionLevelsIndicator.propTypes = {
  pollutionValue: PropTypes.number
}

export default Pm25PollutionLevelsIndicator
