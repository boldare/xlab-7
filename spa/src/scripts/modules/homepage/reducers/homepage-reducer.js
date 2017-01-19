const init = {
  selectedCity: 'gliwice',
  selectedCities: []
}

function homepageReducer(state = init, action = {}) {
  switch (action.type) {
    case 'CITIES_SELECT': {
        return {
            firebaseData: state.firebaseData,
            selectedCities: action.selectedCities,
            selectedCity: state.selectedCity
        };
    }
    case 'CITY_SELECT': {
        return {
            selectedCities: [],
            selectedCity: action.selectedCity,
            firebaseData: state.firebaseData
        };
    }
    case 'FIREBASE_DATA_RECEIVED':
        return {
            firebaseData: action.firebaseData,
            selectedCity: state.selectedCity,
            selectedCities: state.selectedCities
        };
    default:
      return state;
  }
}

export default homepageReducer;
