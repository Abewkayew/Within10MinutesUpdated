import firebase from 'firebase';
const config = {
    apiKey: "AIzaSyAylVc1-k-1b1A2JSujfmJ0hNeXWgFzylg",
    authDomain: "within1hour-1483711039788.firebaseapp.com",
    databaseURL: "https://within1hour-1483711039788.firebaseio.com",
    projectId: "within1hour-1483711039788",
    storageBucket: "within1hour-1483711039788.appspot.com",
    messagingSenderId: "927388276112"
  };
const Firebase = firebase.initializeApp(config);
export default Firebase;