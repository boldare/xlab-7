import firebase from 'firebase';
import firebaseConfig from '../config/firebase-config';

function init() {
    firebase.initializeApp(firebaseConfig);
}

function setOnUpdateCallback(callback) {
    firebase.database().ref().on('value', (data) => {
    	callback(data.val());
    });
}

export default {
    init,
    setOnUpdateCallback
};
