import * as firebase from 'firebase';

const config = {
	apiKey: 'AIzaSyDx900bEhFzPhnKIUnHUyy-TaWRQnNPu04',
	authDomain: 'hottake-85bb4.firebaseapp.com',
	databaseURL: 'https://hottake-85bb4.firebaseio.com',
	projectId: 'hottake-85bb4',
	storageBucket: 'hottake-85bb4.appspot.com',
	messagingSenderId: '515581184089',
	appId: '1:515581184089:web:060c709ceab01b4577c948',
	measurementId: 'G-7SXTTFVT1Z'
};

export const fire = firebase.initializeApp(config);

export const db = fire.database();
