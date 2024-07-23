// Import the functions you need from the SDKs you need
// firebaseConfig.js

import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDVHAmiAffFK6Ls-noR24JO4gRX2bPnV0U",
  authDomain: "test-85338.firebaseapp.com",
  databaseURL: "https://test-85338-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "test-85338",
  storageBucket: "test-85338.appspot.com",
  messagingSenderId: "442138018620",
  appId: "1:442138018620:web:8c1e0e3a1dc2a98c821439",
  measurementId: "G-5XN2BLCGZR"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };
