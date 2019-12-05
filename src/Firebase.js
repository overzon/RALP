import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

const config = {
    apiKey: "AIzaSyBilOK_yfWy4CgcYhJrRUhg93WyEx-9RNs",
    authDomain: "ralp-d30ee.firebaseapp.com",
    databaseURL: "https://ralp-d30ee.firebaseio.com",
    projectId: "ralp-d30ee",
    storageBucket: "ralp-d30ee.appspot.com",
    messagingSenderId: "352425814848"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;