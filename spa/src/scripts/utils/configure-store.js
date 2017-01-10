import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './root-reducer';

export default function configureStore(initialState) {
	const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
	const store = createStoreWithMiddleware(rootReducer, initialState);

	return store;
}
