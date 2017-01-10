import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as HomepageActions from '../actions/homepage-actions';

class HomepageContainer extends React.Component {
	componentDidMount() {
		this.props.actions.getHelloWorld();
	}

	render() {
		console.log(this.props);
		return (
			<div>
				<h1>XSLAB</h1>
				<b>{this.props.message}</b>
			</div>
		)
	}
};

HomepageContainer.propTypes = {
	actions: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		message: state.homepage.message
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(HomepageActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(HomepageContainer);
