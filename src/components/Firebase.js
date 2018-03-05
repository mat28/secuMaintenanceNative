// @flow
import * as firebase from "firebase";

import {User} from "../Model";
import {DEFAULT_USER} from "../Constants";

const config = {
  apiKey: "AIzaSyBUSRe336NbKS5n05dqULrx2HMVrL1XXuY",
  authDomain: "crmat-dceea.firebaseapp.com",
  databaseURL: "https://crmat-dceea.firebaseio.com",
  projectId: "crmat-dceea",
  storageBucket: "crmat-dceea.appspot.com",
  messagingSenderId: "1065400505089"
};

export default class Firebase {

    static database: firebase.database.Database;
    static auth: firebase.auth.Auth;
    static storage: firebase.storage.Storage;
    static messaging : firebase.messaging.Messaging;

    static init() {
        firebase.initializeApp(config);
        Firebase.auth = firebase.auth();
        Firebase.database = firebase.database();
        Firebase.storage = firebase.storage();
        Firebase.messaging = firebase.messaging();
    }

    static get userRef(): firebase.database.Reference {
        return Firebase.database.ref(`users/${Firebase.auth.currentUser.uid}`);
    }

    static async getUser(): Promise<User> {
        const snapshot = await Firebase.database.ref(`users/${Firebase.auth.currentUser.uid}`).once("value");
        return snapshot.val();
    }

    static async setDefaultUserIfEmpty(user: firebase.User): Promise<void> {
        const {uid, displayName} = user;
        const snapshot = await Firebase.database.ref(`users/${uid}`).once("value");
        if (snapshot.val() === null) {
            await Firebase.database.ref(`users/${uid}`).set(DEFAULT_USER(displayName));
        }
    }
}
