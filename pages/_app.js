import '../styles/globals.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import Login from './login';
import Loading from '../components/Loading';
import { useEffect } from 'react';
// import { collection, getDocs } from 'firebase/firestore/lite';
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";


function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      const docRef = doc(db, "users", user.uid);
      const payload = {
        email: user.email,
        lastSeen: serverTimestamp(),
        photoURL: user.photoURL,
      }
      console.log(payload);
      setDoc(docRef, payload, { merge: true });
      // collection("users").doc(String(user.uid) ).set({
      //   email: user.email,
      //   lastSeen: firebase.firestore.FieldValue.serverTimastamp(),
      //   photoURL: user.photoURL,
      // },
      //   { merge: true }
      // );
    }
  }, [user])

  if (loading) return <Loading />
  if (!user) return <Login />;
  return <Component {...pageProps} />
}

export default MyApp