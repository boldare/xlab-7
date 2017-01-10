import style from '../styles/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import { combineReducers, createStore } from 'redux';
import { Router, hashHistory } from 'react-router';
import { Provider } from 'react-redux';

import appHistory from './utils/app-history';
import routes from './utils/routes';
import configureStore from './utils/configure-store';

const store = configureStore();

ReactDOM.render(
	<div>
		<Provider store={store}>
			<Router history={appHistory}>
				{routes}
			</Router>
		</Provider>
	</div>,
	document.getElementById('app')
);
