import Rebase from "re-base";
import firebase from "firebase/app";
import "firebase/database";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAlQ8b2dGyGNtkR4evQmd9Jr_H-XmSWDS4",
    authDomain: "catch-of-the-day-pirini.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-pirini.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
