import React from 'react'
import { Route, IndexRoute, RouteHandler } from 'react-router'

import HomepageContainer from '../modules/homepage/components/homepage-container'
import NotFoundContainer from '../modules/404/components/not-found-container'

export default (
	<Route>
		<Route path="/" component={HomepageContainer} />
		<Route path="*" component={NotFoundContainer} status={404}/>
	</Route>
);
