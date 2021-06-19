import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: 'AIzaSyD5VDCNsHvp2K0pBvpkAlKdW6tCewP3NWI',
  authDomain: 'apb-trader.firebaseapp.com',
  databaseURL: 'https://apb-trader.firebaseio.com',
  projectId: 'apb-trader',
  storageBucket: 'apb-trader.appspot.com',
  messagingSenderId: '428964621973',
  appId: '1:428964621973:web:f99d23893956d533',
};

firebase.initializeApp(firebaseConfig);

export const FIREBASE_TRADE_URL =
  'https://apb-trader.firebaseio.com/trades.json';
export const FIREBASE_TRADE_URL_DELETE =
  'https://apb-trader.firebaseio.com/trades/';
export const firebaseAuth = firebase.auth();
export const firestore = firebase.firestore();
