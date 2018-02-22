import firebase from 'firebase';
require('dotenv').config();
const config = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: 'https://friendly-af05e.firebaseio.com',
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId
};
firebase.initializeApp(config);
export const rootRef = firebase.database().ref();
export const roomsRef = firebase.database().ref('/rooms');
export const timestamp = firebase.database.ServerValue.TIMESTAMP;
