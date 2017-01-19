import React, { PropTypes } from 'react';
import d3 from 'd3';
import {LineChart, Brush} from 'react-d3-components';
import {merge, isObject} from 'lodash';

const MultilineChart = ({ pollutionData, type }) => {
  function tooltipLine(label, data) {
    let date = new Date(data.x);

    let day = addZero(date.getDate());
    let month = addZero(date.getMonth() + 1);
    let year = date.getFullYear();
    let hour = addZero(date.getHours());

    let formattedDate = [day, month, year].join('/') + ' ' + hour + ':00';

		return label + " : " + formattedDate + " - PM: " + data.y;
	}

  function addZero(i) {
      if (i < 10) {
          i = "0" + i;
      }
      return i;
  }

  let preparingChartData = [];
  let preparingChartSeries = [];

  const CONFIG = {
    PM_25: {
      chartYAxis: 'PM 2.5 w ',
      pollutionType: 'pm25'
    },
    PM_10: {
      chartYAxis: 'PM 10 w ',
      pollutionType: 'pm10'
    }
  }

  let typeConfig = CONFIG[type];

  pollutionData.forEach((cityPollutionData) => {
    let currentSerieData = {};

    currentSerieData.label = cityPollutionData.name;
    currentSerieData.values = [];

    cityPollutionData.values.forEach((pollutionValues, i) => {
        currentSerieData.values.push({
            x: new Date(pollutionValues.date),
            y: pollutionValues[typeConfig.pollutionType]
        });
    });

    preparingChartData.push(currentSerieData);
  });

  let chartData = preparingChartData;

  let width = 700;
  let height = 400;
  let margins = {
      left: 100,
      right: 100,
      top: 50,
      bottom: 50
  };

  let lastData = chartData[0].values.length - 1;
  let lower = new Date(chartData[0].values[0].x);
  let upper = new Date(chartData[0].values[lastData].x);

  let xScale = d3.time.scale().domain([lower, upper ]).range([0, 600 - 70]);
  let colorScale = d3.scale.ordinal().range(['#cfd8dc', '#8bc34a', '#795548', '#18ffff', '#00b0ff', '#f57f17']);

  return (
    <LineChart
					data={chartData}
					width={width}
					height={height}
          tooltipHtml={tooltipLine}
          tooltipContained
          colorScale={colorScale}
					margin={margins}
          xAxis={{tickValues: xScale.ticks(d3.time.hour, 1), tickFormat: d3.time.format("%m/%d %H:%M"), label: 'data'}}
					yAxis={{label: 'μm/m³'}}
		/>
  )
}

MultilineChart.propTypes = {
  pollutionData: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
}

export default MultilineChart
