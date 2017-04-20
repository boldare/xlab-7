import React from 'react';
import {Row, Col} from 'react-materialize';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as HomepageActions from '../actions/homepage-actions';
import { assignWith, isUndefined, concat } from 'lodash';
import MultilineChart from './multiline-chart';
import Pm25PollutionLevelsIndicator from './indicator/pm25-pollution-levels-indicator';
import Pm10PollutionLevelsIndicator from './indicator/pm10-pollution-levels-indicator';
import SingleDropdown from './dropdowns/single-dropdown';
import MultipleCheckbox from './dropdowns/multiple-checkbox';
import Loader from './loader/loader';
import Weather from './weather/weather';
import fireBaseService from '../../../utils/firebase-service';

const DISPLAYED_VALUES_NUMBER = 1000;
const defaultCities = ['gliwice', 'xsolve-hq', 'krakow', 'pekin'];

class HomepageContainer extends React.Component {
    componentDidMount() {
        fireBaseService.setOnUpdateCallback((newData) => {
            for(var city in newData) {
                let values = this.values(newData[city].values);
                newData[city].values = values.slice(values.length - DISPLAYED_VALUES_NUMBER);
            }

            this.props.actions.receivedFirebaseData(newData);
        });
    }

    selectCity(e) {
        this.props.actions.selectCity(e.target.value);
    }

    selectMultipleCities(e) {
      const value = e.nativeEvent.target.value;
      const checked = e.nativeEvent.target.checked;

      let selectedValues = this.props.selectedCities;

      const i = selectedValues.indexOf(value);
      if(i != -1) {
          selectedValues.splice(i, 1);
      } else {
          selectedValues.push(value);
      }

        this.props.actions.selectCities(selectedValues.slice(0));
    }

    values(obj) {
      return Object.keys(obj).map(function (key) { return obj[key]; });
    }

    getLatestPollutionForCity() {
        let values = this.props.firebaseData[this.props.selectedCity].values;

        return values[values.length - 1];
    }

    getCitiesForMultiCheckbox() {
        return defaultCities.filter((city) => {
          return city != this.props.selectedCity;
        });
    }

    getDataSetForCharts() {
      let chartData = [];
      let citiesToBeShown = concat(this.props.selectedCities, this.props.selectedCity);

      citiesToBeShown.forEach((city) => {
          chartData.unshift(this.props.firebaseData[city]);
      });

      return chartData;
    }

    render() {
        if (!this.props.firebaseData) {
            return (<Loader/>);
        }

        let newestCityPollutionValue = this.getLatestPollutionForCity();
        let updatedChartData = this.getDataSetForCharts();

        return (
            <div className="container">
              <h2 className="center-align">Xlab #7</h2>
                  <Row>
                    <Col s={12}>
                      <SingleDropdown
                        cities={ defaultCities }
                        label={ defaultCities[0] }
                        callback={ this.selectCity.bind(this) }
                      />
                    </Col>

                    <Col s={12}>
                      <Weather pollutionValue={newestCityPollutionValue} />
                    </Col>

                    <Col s={12}>
                        <Row>
                          <Col s={6}>
                            <Pm25PollutionLevelsIndicator
                                pollutionValue={ newestCityPollutionValue.pm25 }
                            />
                          </Col>
                          <Col s={6}>
                          <Pm10PollutionLevelsIndicator
                              pollutionValue={ newestCityPollutionValue.pm10 }
                          />
                          </Col>
                        </Row>
                    </Col>

                    <Col s={12}>
                        <div className="divider"></div>
                    </Col>

                    <Col s={12}>
                      <h4 className="center-align">Wybierz miasta do porównania</h4>
                      <MultipleCheckbox
                        cities={ this.getCitiesForMultiCheckbox() }
                        selected = { this.props.selectedCities }
                        callback={ this.selectMultipleCities.bind(this) }
                      />
                    </Col>

                    <Col s={6} className="pollution-chart">
                        <h2 className="center-align">PM 2.5</h2>
                        <MultilineChart
                            pollutionData={ updatedChartData }
                            type='PM_25'
                        />
                    </Col>
                    <Col s={6} className="pollution-chart">
                        <h2 className="center-align">PM 10</h2>
                        <MultilineChart
                            pollutionData={ updatedChartData }
                            type='PM_10'
                        />
                    </Col>
                  </Row>
            </div>
        )
    }
};

HomepageContainer.propTypes = {
    actions: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        firebaseData: state.homepage.firebaseData,
        selectedCities: state.homepage.selectedCities,
        selectedCity: state.homepage.selectedCity
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(HomepageActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomepageContainer);
