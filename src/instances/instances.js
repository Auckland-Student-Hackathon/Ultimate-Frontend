import firebase from 'firebase/app'
import 'firebase/auth'
import { io } from 'socket.io-client'

const firebaseConfig = {
  apiKey: 'AIzaSyCzmF_bXwqrje7L3c2TB_DfXaZDcYBIsV0',
  authDomain: 'ultimate-game-center.firebaseapp.com',
  projectId: 'ultimate-game-center',
  storageBucket: 'ultimate-game-center.appspot.com',
  messagingSenderId: '633290760292',
  appId: '1:633290760292:web:38f498a3a53bb9449dff71',
  measurementId: 'G-22M62X8PV8',
}

if (firebase.apps.length === 0) {
  // Prevent initialising firebase again
  firebase.initializeApp(firebaseConfig)
}

const socket = io(
  process.env.REACT_APP_API_URL || 'https://ultimate-game-center-backend.herokuapp.com/' || 'http://localhost:5000',
  {
    query: {
      // Unable to get the uid from the firebase package on initial render :(
      uid: localStorage.getItem('uid') || firebase.auth().currentUser?.uid || '',
    },
  }
)

export { socket, firebase }
