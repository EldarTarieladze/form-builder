import Firebase from "firebase"
const firebaseConfig = {
  apiKey: "AIzaSyC7xJp3NWuiwd3teqHreJwcrIqt5XZQMDo",
  authDomain: "dynamic-form-8605b.firebaseapp.com",
  projectId: "dynamic-form-8605b",
  storageBucket: "dynamic-form-8605b.appspot.com",
  messagingSenderId: "689354280970",
  appId: "1:689354280970:web:52dac19271d3f3800e0ff3"
};
  const firebase = Firebase.initializeApp(firebaseConfig)

let db = firebase.firestore()
export { db }
