import 'whatwg-fetch';

export function selectCities(selectedCities) {
    return (dispatch) => {
        dispatch({
            type: 'CITIES_SELECT',
            selectedCities: selectedCities
        });
    };
}

export function selectCity(city) {
    return (dispatch) => {
        dispatch({
            type: 'CITY_SELECT',
            selectedCity: city
        });
    };
}

export function receivedFirebaseData(firebaseData) {
	return (dispatch) => {
		dispatch({
		  type: 'FIREBASE_DATA_RECEIVED',
			firebaseData: firebaseData
		});
	};
}

export function updateData(newData, updatedChartData) {
	return (dispatch) => {
		dispatch({
			type: 'DATA_UPDATE',
			pollutionData: newData,
            pollutionChartData: updatedChartData,
            cities: Object.keys(newData)
		});
	};
}

export function updateChartData(selectedCities, data) {
	return (dispatch) => {
		dispatch({
			type: 'CHART_DATA_UPDATE',
			pollutionChartData: updatedChartData
		});
	};
}
