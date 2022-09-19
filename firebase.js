// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCHKQw7BcRM5lrHoly4ViseReHBUx_ZHy4',
  authDomain: 'food-ordering-app-storage.firebaseapp.com',
  projectId: 'food-ordering-app-storage',
  storageBucket: 'food-ordering-app-storage.appspot.com',
  messagingSenderId: '845069932082',
  appId: '1:845069932082:web:8b265c23c17b31b7d98e2b'
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
