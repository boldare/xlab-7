import React, { PropTypes } from 'react';
import { Input, option, Row } from 'react-materialize';

const SingleDropdown = ({ cities, label, callback }) => {
    let items = [];

    cities.forEach((city, index) => {
        items.push(
            <option key={ index } value={ city }>
                { city }
            </option>
        );
    });

    return (
        <Row>
            <Input
                s={12}
                type='select'
                label="Wybierz miasto"
                defaultValue={ label }
                onChange={(e) => callback(e)}
            >
                { items }
            </Input>
        </Row>
    )
}

SingleDropdown.propTypes = {
    cities: PropTypes.arrayOf(PropTypes.string.isRequired),
    label: PropTypes.string.isRequired,
    callback: PropTypes.func.isRequired
}

export default SingleDropdown
