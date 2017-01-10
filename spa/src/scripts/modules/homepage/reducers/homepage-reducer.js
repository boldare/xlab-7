function homepageReducer(state = {}, action = {}) {
	switch (action.type) {
		case 'MESSAGE_FETCHED':
			return {
				message: action.message
			};
			break;
		default:
			return state;
	}
}

export default homepageReducer;
