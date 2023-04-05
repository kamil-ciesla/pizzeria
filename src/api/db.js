import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: '',
  authDomain: 'pizzeria-c5c33.firebaseapp.com',
  projectId: 'pizzeria-c5c33',
  storageBucket: 'pizzeria-c5c33.appspot.com',
  messagingSenderId: '723757752313',
  appId: '1:723757752313:web:1af90448c5f251d6f86728',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app)

export default db
