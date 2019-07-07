import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyBplnVQ5MaU8OrxD8jU3WexI7qrwwlhWpU',
  authDomain: 'mastermind-111c7.firebaseapp.com',
  databaseURL: 'https://mastermind-111c7.firebaseio.com',
  projectId: 'mastermind-111c7',
  storageBucket: 'mastermind-111c7.appspot.com',
  messagingSenderId: '891506862040',
  appId: '1:891506862040:web:678221245ce9ae1e',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.database();

export default db;
