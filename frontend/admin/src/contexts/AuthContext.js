import React from "react";
import firebase from "firebase";

export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const db = firebase.firestore();
  const auth = firebase.auth();
  auth.useDeviceLanguage();

  const [admin, setAdmin] = React.useState(null);

  React.useEffect(() => {
    // function addListener(uid, collection, setter) {
    //   return db
    //     .collection("users")
    //     .doc(uid)
    //     .collection(collection)
    //     .onSnapshot((collection) => {
    //       const docs = [];

    //       collection.forEach((doc) => {
    //         const data = doc.data();
    //         data.id = doc.id;
    //         docs.push(data);
    //       });

    //       setter(docs);
    //     });
    // }

    const unsubscribe = auth.onAuthStateChanged(function (user) {
      if (user) {
        console.log("USER", user);
        user.getIdTokenResult().then((idTokenResult) => {
          console.log("idTokenResult", idTokenResult);

          if (!!idTokenResult.claims.admin) {
            setAdmin(user);
          }
        });
      } else {
        setAdmin(null);
      }
    });

    return () => unsubscribe();
  }, [auth, db]);

  async function signIn(email, password) {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log("ERROR ON ADMIN SIGNIN", error);
    }
  }

  function signOut() {
    setAdmin(null);
    auth.signOut();
  }

  return (
    <AuthContext.Provider
      value={{
        admin,

        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
