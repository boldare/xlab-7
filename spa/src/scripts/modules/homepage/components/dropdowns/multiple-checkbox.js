import React,{ PropTypes } from 'react';
import { Input, option, Row } from 'react-materialize';
import { indexOf } from 'lodash';

class MultipleCheckbox extends React.Component {
  setValues(e) {

    this.props.callback(e);
  }

  render() {
    let items = [];
    this.props.cities.forEach((city, index) => {
      const checked = (indexOf(this.props.selected, city) >= 0) ? true : false;
      items.push(
        <Input
          s={4}
          key={index}
          value={city}
          type='checkbox'
          label= {city}
          checked= {checked}
          onChange={(e) => this.setValues(e)} />
      );
    });

    return (
      <Row className="center-align checkbox--container">
        {items}
      </Row>
    )
  }
}

MultipleCheckbox.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string.isRequired),
  callback: PropTypes.func.isRequired
}

export default MultipleCheckbox
