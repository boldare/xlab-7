import { combineReducers } from 'redux';
import homepageReducer from '../modules/homepage/reducers/homepage-reducer';

const rootReducer = combineReducers({
	homepage: homepageReducer
});

export default rootReducer;
