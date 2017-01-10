import 'whatwg-fetch';

export function getHelloWorld() {
	return (dispatch) => {
		fetch('http://localhost:3000/api/index')
			.then(function(response) {
				return response.json();
			}).then(function(json) {
				dispatch({
					type: 'MESSAGE_FETCHED',
					message: json.message
				});
			}).catch(function(error) {
				console.log('Error:', error)
			});
	}
}
