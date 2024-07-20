// Import the functions you need from the SDKs you need
// firebaseConfig.js
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBIvgCYNGCeWbG4917_ThPjOSGAiwc_d1U",
  authDomain: "petshop-1a492.firebaseapp.com",
  databaseURL: "https://petshop-1a492-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "petshop-1a492",
  storageBucket: "petshop-1a492.appspot.com",
  messagingSenderId: "860895950158",
  appId: "1:860895950158:web:983148c45e2a9d45ab5a1f",
  measurementId: "G-6XN181YJJD"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
