import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/analytics';

export const initFirebase = (config: Object) => {
    try {
        firebase.initializeApp(config);
        firebase.analytics();
    } catch (e) {
    }
};



