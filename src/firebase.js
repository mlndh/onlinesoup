import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

// firebase init - add your own config here
const firebaseConfig = {
    apiKey: "AIzaSyC7q_-y3Eot3uxLosc7E2BMPrtiO-7Xb1c",
    authDomain: "onlinesoup.firebaseapp.com",
    databaseURL: "https://onlinesoup.firebaseio.com",
    projectId: "onlinesoup",
    storageBucket: "onlinesoup.appspot.com",
    messagingSenderId: "749242048748",
    appId: "1:749242048748:web:b882f9a6d4404f65f185c9",
    measurementId: "G-PXH2XQJ4V9"
}
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.database()
const auth = firebase.auth()

// collection references
// const usersCollection = db.collection('users')
// const postsCollection = db.collection('posts')
// const commentsCollection = db.collection('comments')
// const likesCollection = db.collection('likes')

// export utils/refs
export {
  db,
  auth,
//   usersCollection,
//   postsCollection,
//   commentsCollection,
//   likesCollection
}