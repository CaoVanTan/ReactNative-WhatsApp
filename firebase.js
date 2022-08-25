// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { initializeFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyBRJPFZEorLEhnwi6B-yhsnkpQyGg55tBM',
    authDomain: 'whatsapp-3b7d8.firebaseapp.com',
    projectId: 'whatsapp-3b7d8',
    storageBucket: 'whatsapp-3b7d8.appspot.com',
    messagingSenderId: '560745491163',
    appId: '1:560745491163:web:e3345cc8b27b8afa43bafe',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = initializeFirestore(app, { experimentalForceLongPolling: true });

export function signIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

export function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
}
